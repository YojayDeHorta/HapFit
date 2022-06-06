<template>
    <v-container class='container' fluid>
        
        <v-app-bar class='app' elevation='0' fluid>
            <v-app-bar-nav-icon>
                <v-btn class='btn_flecha' to='/perfil' elevation='0' dark>
                    <v-icon>
                        mdi-arrow-left-thick
                    </v-icon>
                </v-btn>
            </v-app-bar-nav-icon>
        </v-app-bar>
        <div class='Contenido_Card mt-5'>
            <v-card class='card' v-for='plan in planes' :key='plan.idPlan'>
                <main style='text-transform:capitalize'>
                    <section style='display:flex;justify-content:space-between'>
                          <h2>{{plan.nombre}}</h2>
                          <v-icon @click="deletePlan(plan.idPlan)">
                              mdi-delete
                          </v-icon>
                    </section>
                    
                      <h4 class='mt-3'> {{plan.descripcion}}</h4>
                      <p style='text-align: end;'><strong>${{plan.precio}} mensual</strong></p>
                </main>
            </v-card>
            <v-card class='card' v-if="!planes[0]&&!loading">
                <main>
                      <h4 > no hay planes disponibles</h4>

                </main>
            </v-card>
            <v-card>
                <div v-if="loading" class="d-flex  justify-center mb-10 ">
                    <v-progress-circular :size="50" :width="7" color="red"  class="mb-5 mt-5" indeterminate ></v-progress-circular>
                    <h3 class="mt-5 ml-5">Cargando planes...</h3> 
                </div>
            </v-card>
                    
        </div>
        <div class="text-center">
            <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class='btn_modal' dark v-bind="attrs" v-on="on" fab>
                        <v-icon>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                        Nuevo Plan

                        <v-btn color="primary" text @click="dialog = false" style="position:absolute; right:0;" >
                            <v-icon style="font-size:2.2rem; color:#E42256;">
                                mdi-close-circle
                            </v-icon>
                        </v-btn>

                    </v-card-title>
                    <v-card-text>
                        <br><br>
                        <v-text-field label="Nombre" v-model="plan.nombre" outlined filled></v-text-field>
                        <v-text-field type="number" min="0" label="Precio" v-model="plan.precio" outlined filled></v-text-field>
                        <v-textarea filled name="input-7-4" label="Comentarios" v-model="plan.descripcion"></v-textarea>
                        <v-btn class='btn_registro'  @click="setPlan()" :loading="loadingButton" block rounded x-large>
                            Guardar
                        </v-btn>
                        <br>
                    </v-card-text>
                    <v-divider></v-divider>
                    
                </v-card>
            </v-dialog>
        </div>

    </v-container>
</template>
<script>
export default {
    data() {
        return {
            dialog: false,
            planes:[],
            plan:{
                nombre:"",
                precio:0,
                descripcion:"",
            },
            loading:false,
            loadingButton:false
        }
    },
    created() {
        this.getPlanes()
    },
    methods: {
        async getPlanes() {
            this.loading=true
            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/suscripcion/planes/0', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            const { data, error } = await res.json()
            this.loading=false
            if (error) {
                console.log(error);
                return
            }
            this.planes = data
        },
        
        async setPlan() {
            this.loadingButton=true
            const resul = this.validation();
            if ( resul == '' ) {
                const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/suscripcion/planes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    },
                    body: JSON.stringify( this.plan )
                })
                const { data, error } = await res.json()
                if (error) {
                    console.log(error);
                    return
                }
                this.plan.nombre = '';
                this.plan.precio = 0;
                this.plan.descripcion = '';
                this.loadingButton=false
                this.dialog=false
                this.getPlanes()
            }
            else {
                this.$root.vtoast.show({ message: resul });
            }
            
        },
        async deletePlan(id) {
            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/suscripcion/planes', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ idPlan: id })
            })
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }
            this.$root.vtoast.show({ message: 'borrado exitosamente!' })
            this.getPlanes()
            // console.log('a');
        },
        validation() {
            let msg = '';
            if ( this.plan.nombre == '' ) {
                msg = 'Escriba un nombre';
            }
            else if ( this.plan.precio < 0 ) {
                msg = 'El precio no debe ser negativo';
            }
            return msg;
        },
    },
}
</script>
<style scoped>
* {
    padding: 0;
    margin: 0;
}

.container {
    height: 100vh;
    padding-bottom: 5rem;
    background: linear-gradient(180deg, #E42256 0%, rgba(228, 34, 86, 0) 100%) !important;

}

.btn_flecha {
    background-color: transparent !important;
}

.app {
    background-color: rgb(228, 52, 99) !important;
}


.Contenido_Card {
    height: 700px;
    width: 95%;
    margin: auto;
    overflow: auto;
}


.card {
    padding: 1rem;
    margin-bottom: 1rem;
}

.btn_modal {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background-color: #E42256 !important;
}

.btn_registro {
    border: 2px solid rgb(228, 34, 86) !important;
    width: 80% !important;
    background-color: white !important;
    font-size: 1.3rem;
    position: relative;
    color: #E42256 !important;
}
</style>
