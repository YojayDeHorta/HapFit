<template>
    <v-container>
        <v-dialog v-model="dialogPerfil" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark height='100px' style='background: linear-gradient(180deg, #E42256 0%, #FF8370 100%);'>
                    <v-btn icon dark @click="$emit('close')">
                        <v-icon>mdi-arrow-left-thin</v-icon>
                    </v-btn>
                    <v-toolbar-title>
                        <main style='#border:5px solid red !important;display:flex;width:120%'>
                            <img :src="datos.linkPerfil" alt="" style='#border:5px solid red;border-radius:50%;width:80px;height:80px'>
                            <small> {{datos.nombre}}</small>
                        </main>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text v-if="datos.esEntrenador&&!datos.entrenadorContratado" @click.stop="dialog = true" elevation='2' style='width:100px;height:50px !important;#padding:0rem;position:relative;top:1.3rem;background-color:white !important;border-radius:1rem;padding:0 !important'>
                            <small style='padding:1rem;color:#E42256 !important' @click="getPlanes()">contratar</small>
                        </v-btn>
                        <v-btn dark text @click="dialog = false;goChat()"  >
                            <v-icon>
                                mdi-message-processing-outline
                            </v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list three-line subheader>
                    <v-toolbar elevation='1'>
                        <template>
                            <v-tabs v-model="tabs">
                                <v-tab v-for="n in title_tabs" :key="n.id" style='width:100% !important'>
                                    {{ n.name }}
                                </v-tab>
                            </v-tabs>
                        </template>
                    </v-toolbar>
                    <v-tabs-items v-model="tabs">
                        <v-tab-item>
                            <br>
                            <post_perfil :idUsuario="datos.idUsuario" />
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <rutinas />
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-list>
                <v-divider></v-divider>
            </v-card>
        </v-dialog>
        <!--MODAL SUSCRIPCION-->
        <v-dialog v-model="dialog" width="100vw">
            <v-card style='#border:5px solid red !important;padding:1rem'>
                <div>
                    <h1 class='text-center mb-5'>Contratación</h1>
                    <main>
                        <v-select :items="planes" v-model="plan" label="Plan" item-text="nombre" return-object  outlined></v-select>
                        <v-select :items="mes_plan" defa v-model="meses" item-text="name" item-value="mes" label="Meses de contratación"  outlined></v-select>
                        <v-text-field label="No Tarjeta" filled></v-text-field>
                        <v-text-field label="CVC" filled></v-text-field>
                    </main>
                    <main>
                        <section class='text-start mt-3 mb-3'>
                            <h4>{{plan.nombre}} <br>
                                {{plan.descripcion}}
                            </h4>
                        </section><br>
                        <section class='text-end mt-3 mb-3' v-if="plan.precio">
                            <h4 style='color: #008180;'>Pagas ${{plan.precio*meses}} </h4>
                            <h4> Servicio durante {{meses}} mes<a style='color: #000000;' v-if="meses!=1">es</a>, termina el {{addMeses(new Date(),meses)}}</h4>

                        </section><br>
                        <section class='text-center mb-5' >
                            <v-btn @click="guardarSuscripcion()" style='background: #FFFFFF;border: 3px solid #E42256;box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);border-radius: 1rem;' :disabled="plan.precio? false :true" :loading="contratar" x-large>
                                Contratar
                            </v-btn>
                        </section>
                    </main>
                </div>
            </v-card>
        </v-dialog>
        <!--MODAL SUSCRIPCION-->
        
    </v-container>
</template>
<script>
import rutinas from '../components/Rutinas'
import post_perfil from './Post_perfil.vue'


export default {
    data() {
        return {
            notifications: false,
            sound: true,
            widgets: false,
            tabs: null,
            dialog: false,
            loading:false,
            contratar:false,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            title_tabs: [
                { 'name': 'Post', id: 1 }, { 'name': 'Rutinas', id: 2 }
            ],
            plan_entrenador: ['Plan Basico', 'Plan Premiun', 'Plan Extremo', 'Plan Vegano'],
            mes_plan: [
                { 'name': '1 Mes', mes: 1 }, { 'name': '2 Meses', mes: 2 },{ 'name': '3 Meses', mes: 3 },{ 'name': '1 año', mes: 12 },
                ],
            planes:[],
            plan:{
                idPlan:0,
                nombre:"",
                precio:0,
                descripcion:"",
            },
            meses:1,
            hoy: new Date().toISOString().substr(0, 10),
            fechaInicio:new Date().toISOString().substr(0, 10),
            fechaFinal: '',
        }
    },
    components: {
        rutinas,
        post_perfil
    },
    props: {
        datos: null,
        dialogPerfil: null
    },
    created() {
        
    },
    
    methods: {
        async getPlanes() {
            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/suscripcion/planes/'+this.datos.idUsuario, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }
            this.planes = data
            

        },
        async guardarSuscripcion() {
            this.contratar=true
            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/suscripcion/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify( {
                     fechaInicio:this.fechaInicio,
                     fechaFinal:this.fechaFinal,
                     idEntrenador:this.datos.idEntrenador,
                     precio:this.plan.precio*this.meses,
                     idPlan:this.plan.idPlan
                })
            })
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }
            this.dialog=false
            this.$root.vtoast.show({ message: data })
            this.$emit('close')
            this.contratar=false
        },
        addMeses(date, months) {
            var d = date.getDate();
            date.setMonth(date.getMonth() + +months);
            if (date.getDate() != d) {
                date.setDate(0);
            }
            this.fechaFinal=date.toISOString().substr(0, 10)
            let mesActual = new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(date)
            return `${date.getDate()} de ${mesActual} del ${date.getFullYear()}`;
        },
        goChat(){
           console.log(this.datos);
            this.$router.push({ name: 'chat_usuario', params: { usuarioQueRecibe: this.datos.idUsuario },props: { nombreRecibe: this.datos.nombre,linkPerfil: this.datos.linkPerfil } })
            // this.$router.push({ name: 'chat_usuario', params: { usuarioQueRecibe: this.datos.idUsuario },props: { nombreRecibe: this.datos.nombre,linkPerfil: this.datos.linkPerfil } })
            localStorage.setItem('chatNombre',this.datos.nombre)
            localStorage.setItem('chatLinkPerfil',this.datos.linkPerfil)
        },
    },
}
</script>
<style scoped>
.toolbar_perfil {
    height: 100px !important;
}

.tabs_post {
    padding: 1rem;
}

main {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
    /* #border: 5px solid red !important; */
    /* margin-bottom: 1rem; */
}

.tabs_post section {
    #border: 5px solid red;
}

.img_post {
    width: 45px;
    height: 45px;
    /* #border: 5px solid purple; */
    border-radius: 50%;
    object-fit: cover !important;
    border: 2px solid white;
}

.title_post {
    display: flex;
    /* #border: 5px solid purple !important; */
}
</style>