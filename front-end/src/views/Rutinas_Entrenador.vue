<template>
    <v-container class='container' style='padding: 0;background: linear-gradient(180deg, #E42256 0%, rgba(228, 34, 86, 0) 100%) !important;'>
        <div style='padding: 0;'>
            <v-app-bar class='app' elevation='0'>
                <v-app-bar-nav-icon>
                    <v-btn class='btn_flecha' to='/perfil' elevation='0' dark>
                        <v-icon>
                            mdi-arrow-left-thick
                        </v-icon>
                    </v-btn>
                </v-app-bar-nav-icon>
                <v-toolbar-title style='#border: 5px solid blue;width: 75vw;' class='mt-2'>
                    <h4 style='text-transform:capitalize;text-align:center !important;padding: 0.5rem;color: white;'>{{nombreRutina}}</h4>
                </v-toolbar-title>
            </v-app-bar>
            <div class='container_Rutinas' style='padding: 0rem;'>
                <div style='height: 760px;overflow: auto;'>
                    <v-card class='card_rutinas' v-for="ejercicio in ejercicios" :key="ejercicio.idEjercicio" elevation='1' style='border-radius: 0;padding: 0 !important;'>
                        <main>
                            <section>
                                <img :src="ejercicio.linkEjercicio" alt="" width="100%">
                            </section>
                            <section>
                                <h3 class='text-center mt-2 mb-5' style='text-transform:capitalize'> {{ejercicio.nombre}}</h3>
                                <p class='text-center mt-2 mb-5' style='text-transform:capitalize'>musculo a entrenar {{ejercicio.nombreMusculo}}</p>
                            </section>
                            <section>
                                <p class='mt-5 mb-2' style='display:flex;justify-content:space-around;'>
                                    <small class='small_txt' style='color:#E42256' v-if="ejercicio.repeticiones">{{ejercicio.repeticiones}} Reps</small>
                                    <small class='small_txt' style='color:#E42256;text-transform:capitalize' v-if="ejercicio.tiempo">{{ejercicio.tiempo}} Reps</small>
                                    <small class='small_txt' style='color:#FEC84D;text-transform:capitalize'>{{ejercicio.sets}} Sets</small>
                                    <small class='small_txt' style='color:#00B1B0;text-transform:capitalize'>descanso {{ejercicio.tiempo}} segs</small>
                                </p>
                            </section>
                            <section>
                                <p class='text-center p-0' style='margin:0 !important;padding:1rem;text-transform:capitalize'>
                                    {{ejercicio.descripcion}}
                                </p>
                            </section>
                        </main>
                    </v-card>
                    <div v-if="!loading&&!ejercicios[0]">
                        <v-card>
                            No Hay Ejercicios Disponibles
                        </v-card>
                    </div>
                    <div v-if="loading" class="d-flex  justify-center mb-10 ">
                        <v-progress-circular :size="70" :width="7" color="blue" indeterminate></v-progress-circular>
                        <h3 class="mt-5 ml-5">Cargando Ejercicios...</h3>
                    </div>
                </div>
            </div>
        </div>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            dialog: false,
            ejercicios: [],
            nombreRutina: '',
            loading: false
        }
    },
    components: {

    },
    created() {
        console.log(this.$route.params.idRutina);
        this.getEjerciciosInRutinas()
    },
    methods: {
        async getEjerciciosInRutinas() {
            this.loading = true
            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/exercise/getEjercicioRutina/' + this.$route.params.idRutina, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            const { data, error } = await res.json()
            this.loading = false
            if (error) {
                console.log(error);
                return
            }
            this.ejercicios = data
            this.nombreRutina = this.ejercicios[0].nombreRutina
            this.loading = false
        },
    },
}
</script>
<style scoped>
.btn_flecha {
    background-color: transparent !important;
}

.app {
    #border: 5px solid red !important;
    background-color: rgb(228, 52, 99) !important;
    margin: 0 !important;
    #padding: 1rem;

}

.container_Rutinas {
    position: relative;
    #top: -1.2rem;
    #border: 5px solid red !important;
    #height: 500px;
    #overflow: auto;
    margin: 0 !important;

}

h1 {
    background-color: rgb(228, 52, 99) !important;
    color: white;
    text-align: center;
    padding: 0.6rem;
}

.card_rutinas {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: rgb(228, 52, 99) !important;
    /* height:400px !important;
    overflow:auto;*/
    border: 2px solid red !important;
}

.card_rutinas main {
    background-color: white !important;
    margin-bottom: 1rem;
    #margin-top: 1rem;
}

small {
    font-size: 1.2rem !important;
}


.btn_modal {
    background-color: rgb(228, 34, 86) !important;
}


.btn_registro {
    border: 2px solid rgb(228, 34, 86) !important;
    color: rgb(228, 34, 86) !important;
    width: 80% !important;
    background-color: white !important;
    font-size: 1.5rem;
    position: relative;
    top: 1rem;
}

form main {
    border: 5px solid red;
}

form section {
    border: 4px solid black;
}
</style>