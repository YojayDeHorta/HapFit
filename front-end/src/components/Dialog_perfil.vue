<template>
    <v-container>
        <v-dialog v-model="dialogPerfil" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark height='140px' style='background: linear-gradient(180deg, #E42256 0%, #FF8370 100%);'>
                    <v-btn icon dark @click="$emit('close')">
                        <v-icon>mdi-arrow-left-thin</v-icon>
                    </v-btn> &nbsp; &nbsp;&nbsp;
                    <v-toolbar-title style='position:relative;right:2rem'>
                        <main style='#border:5px solid red !important;display:flex;width:30vw;flex-direction: column;padding: 0 !important;justify-content: center;align-items: center;'>
                            <img :src="datos.linkPerfil" alt="" style='border-radius:50%;width:90px;height: 90px;object-fit: cover;'>
                            <small class='text-wrap mt-1' style='#border: 4px solid yellow !important;text-align:center;#width: 50vw'> {{datos.nombre}}</small>
                        </main>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items class='icon_message_contratar'>
                        <v-btn text v-if="datos.esEntrenador&&!datos.entrenadorContratado" @click.stop="dialog = true" elevation='2' style='background-color: white;#padding: 1rem !important;border-radius: 1rem;'>
                            <small style='padding:1rem;color:#E42256 !important' @click="getPlanes();">contratar</small>
                        </v-btn>
                        <v-btn dark text @click="dialog = false;goChat()">
                            <v-icon>
                                mdi-message-processing-outline
                            </v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list three-line subheader>
                    <v-toolbar elevation='1'>
                        <template>
                            <v-tabs v-model="tabs" style='display: flex;justify-content: center;'>
                                <v-tab style='width:100% !important'>
                                    Posts
                                </v-tab>
                                <v-tab style='width:100% !important' v-if="datos.esEntrenador">
                                    Información
                                </v-tab>
                            </v-tabs>
                        </template>
                    </v-toolbar>
                    <v-tabs-items v-model="tabs">
                        <v-tab-item>
                            <br>
                            <post_perfil :idUsuario="datos.idUsuario" />
                        </v-tab-item>
                        <v-tab-item v-if="datos.esEntrenador">
                            <v-card style='padding:1.5rem' flat>
                                <br>
                                <h3>
                                    Entrenador Certificado
                                    <v-icon>
                                        mdi-license
                                    </v-icon>&nbsp;
                                </h3>
                                <main style="padding:0;margin-top:1rem">
                                    <section style='display:flex'>
                                        <label for="">Nombre:</label>
                                        &nbsp;&nbsp;
                                        <p>{{datos.nombre}}</p>
                                    </section>
                                    <section style='display:flex' v-if="datos.lugarExp">
                                        <label for="">Trabajo en</label>
                                        &nbsp;&nbsp;
                                        <p>{{datos.lugarExp}}</p>
                                    </section>
                                    <section style='display:flex' v-else>
                                        <label for="">No tiene experiencia ni certificados</label>
                                    </section>
                                    <section style='display:flex' v-if="datos.mesesExp">
                                        <label for="">{{datos.mesesExp}} Meses de experiencia</label>
                                    </section>
                                </main>
                                <!--
                                <rutinas />
                            -->
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
                        <v-select @click="chargeStripe()" :items="planes" v-model="plan" label="Plan" item-text="nombre" return-object outlined></v-select>
                        <v-select :items="mes_plan" defa v-model="meses" item-text="name" item-value="mes" label="Meses de contratación" outlined></v-select>
                        <div class='mt-5' fluid>
                            <label for="card-number" >Tarjeta de credito</label>
                            <div id="card-number" class="tarjeta"></div>                                                
                        </div>
                        <v-row class='mt-4' style='#border:5px solid red'>
                            <v-col cols="6">
                                <label for="card-expiry">Tiempo de expiracion</label>
                                <div id="card-expiry" class="tarjeta"></div>
                            </v-col>
                            <br>
                            <v-col cols="6">
                                <label for="card-cvc">cvc</label>
                                <div id="card-cvc" class="tarjeta"></div>
                            </v-col>
                        </v-row>
                        
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
                        <section class='text-center mb-5'>
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
import { loadStripe } from "@stripe/stripe-js";


export default {
    data() {
        return {
            notifications: false,
            sound: true,
            widgets: false,
            tabs: null,
            dialog: false,
            loading: false,
            contratar: false,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            title_tabs: [
                { 'name': 'Post', id: 1 }, { 'name': 'Información', id: 2 }
            ],
            plan_entrenador: ['Plan Basico', 'Plan Premiun', 'Plan Extremo', 'Plan Vegano'],
            mes_plan: [
                { 'name': '1 Mes', mes: 1 }, { 'name': '2 Meses', mes: 2 }, { 'name': '3 Meses', mes: 3 }, { 'name': '1 año', mes: 12 },
            ],
            planes: [],
            plan: {
                idPlan: 0,
                nombre: "",
                precio: 0,
                descripcion: "",
            },
            meses: 1,
            hoy: new Date().toISOString().substr(0, 10),
            fechaInicio: new Date().toISOString().substr(0, 10),
            fechaFinal: '',
            billingDetails:{
                email: null,
                name: localStorage.getItem('nombre'),
                phone: null
            },
            elements:null,
            stripe:null,
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
    mounted() {
        
    },

    methods: {
        async getPlanes() {


            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/suscripcion/planes/' + this.datos.idUsuario, {
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
       
        async buscarEntrenador() {
            this.contratar = true
            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/busqueda/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    fechaInicio: this.fechaInicio,
                    fechaFinal: this.fechaFinal,
                    idEntrenador: this.datos.idEntrenador,
                    precio: this.plan.precio * this.meses,
                    idPlan: this.plan.idPlan
                })
            })
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }
            this.dialog = false
            this.$root.vtoast.show({ message: data })
            this.$emit('close')
            this.contratar = false
        },
        addMeses(date, months) {
            var d = date.getDate();
            date.setMonth(date.getMonth() + +months);
            if (date.getDate() != d) {
                date.setDate(0);
            }
            this.fechaFinal = date.toISOString().substr(0, 10)
            let mesActual = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date)
            return `${date.getDate()} de ${mesActual} del ${date.getFullYear()}`;
        },
        goChat() {
            //    console.log(this.datos);
            this.$router.push({ name: 'chat_usuario', params: { usuarioQueRecibe: this.datos.idUsuario }, props: { nombreRecibe: this.datos.nombre, linkPerfil: this.datos.linkPerfil } })
            // this.$router.push({ name: 'chat_usuario', params: { usuarioQueRecibe: this.datos.idUsuario },props: { nombreRecibe: this.datos.nombre,linkPerfil: this.datos.linkPerfil } })
            localStorage.setItem('chatNombre', this.datos.nombre)
            localStorage.setItem('chatLinkPerfil', this.datos.linkPerfil)
        },
        async chargeStripe(){
            this.stripe = await loadStripe(process.env.VUE_APP_STRIPE);
            console.log(process.env.VUE_APP_STRIPE);
            const stylecard = {
                base: {
                    'fontSize': '18px',
                    'color': '#000000',
                    
                }
            };
            this.elements = this.stripe.elements();
            const cardNumber = this.elements.create("cardNumber",{'style':stylecard,showIcon: true,});
            const cardExpiry = this.elements.create("cardExpiry",{'style':stylecard});
            const cardCvc = this.elements.create("cardCvc",{'style':stylecard});
            cardNumber.mount("#card-number");
            cardExpiry.mount("#card-expiry");
            cardCvc.mount("#card-cvc");

        },
        //  async guardarSuscripcion() {
        //     this.contratar = true
        //     const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/suscripcion/', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'auth-token': localStorage.getItem('token')
        //         },
        //         body: JSON.stringify({
        //             fechaInicio: this.fechaInicio,
        //             fechaFinal: this.fechaFinal,
        //             idEntrenador: this.datos.idEntrenador,
        //             precio: this.plan.precio * this.meses,
        //             idPlan: this.plan.idPlan
        //         })
        //     })
        //     const { data, error } = await res.json()
        //     if (error) {
        //         console.log(error);
        //         return
        //     }
        //     this.dialog = false
        //     this.$root.vtoast.show({ message: data })
        //     this.$emit('close')
        //     this.contratar = false
        // },
        async guardarSuscripcion(){
            const cardElement = this.elements.getElement("cardNumber");
             console.log(localStorage.getItem('nombre'));


            const {error,paymentMethod} = await this.stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: this.billingDetails
            });
            if (!error) {
                const res = await fetch(process.env.VUE_APP_BASE_URL+"/api/suscripcion", {
                    method: 'POST',headers: {"Content-Type": "application/json" },
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        id:paymentMethod.id,
                        billing_details:this.billingDetails,
                        fechaInicio: this.fechaInicio,
                        fechaFinal: this.fechaFinal,
                        idEntrenador: this.datos.idEntrenador,
                        precio: (this.plan.precio * this.meses)*100,
                        idPlan: this.plan.idPlan,
                        nombreEntrenador:this.datos.nombre
                    })  
                },);
                const { data, error } = await res.json();
                if (error) {
                    this.$root.vtoast.show({message: error})
                }
                console.log(paymentMethod);
                console.log(data,error);
                this.dialog = false
                this.$root.vtoast.show({ message: data })
                this.$emit('close')
                this.contratar = false
            }else{
            this.$root.vtoast.show({message: "hay un error con sus datos"})
            this.loading=false
            }
      },
    },
}
</script>
<style scoped>
.icon_message_contratar {
    position: relative;
    left: 1rem;
    top: 3rem;
    display: flex;
    flex-direction: row;
    #border: 5px solid yellow !important;
}

.icon_message_contratar .v-btn {
    padding: 0 !important;
    margin: 0 !important;
    width: 100px;
    height: 25px !important;
}
.tarjeta{
    padding: 0.5rem;
    /* #margin: 1rem;
    #border: 5px solid red; */
    border-bottom: 1px solid black;
}
.icon_message_contratar .v-btn small {
    padding: 0 !important;
    margin: 0 !important;
}
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
    /* margin-bottom: 1rem; */
}

.img_post {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover !important;
    border: 2px solid white;
}

.title_post {
    display: flex;
}
</style>