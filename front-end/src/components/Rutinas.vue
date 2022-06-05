<template>
    <v-container class='container_post mb-5' style='#border:5px solid black'>
        <v-row style='padding:15px !important; height: 605px !important;overflow: auto;'>
            <v-col cols='12'>
                <h3 class='mt-5 mb-5'>Tus Rutinas</h3>
                <main v-for='rutina in rutinas' :key="rutina.idRutina"  style='#border:5px solid black;width:100% !important;'>
                    <v-card class='Tarjeta' style='padding:1rem' @click="goRutinasEntrenador(rutina.idRutina)" fluid>
                        <p>
                            <v-icon class='check_icon' style='color:green !important;font-size:2rem !important'>
                                mdi-weight-lifter
                            </v-icon>
                        </p>
                        <p>
                            <strong>{{rutina.nombre}}</strong>
                        </p>
                    </v-card>
                </main>
                <main style='#border:5px solid black;width:100% !important;' v-if="!rutinas[0]&&!loading">
                    <v-card class='Tarjeta' style='padding:1rem' fluid>
                        <p>
                            <strong>no tienes rutinas</strong>
                        </p>
                    </v-card>
                </main>
                <main>
                     <div v-if="loading" class="d-flex  justify-center mb-10 ">
                        <v-progress-circular :size="70" :width="7" color="red"  indeterminate ></v-progress-circular>
                        <h3 class="mt-5 ml-5">cargando rutinas...</h3> 
                    </div>
                </main>
            </v-col>
            <v-col cols='12' v-if="rutinasEntrenador[0]">
                <h3 class='mt-5 mb-5'>Rutinas del Entrenador</h3>
                <main v-for='rutina in rutinasEntrenador'  :key="rutina.idRutina" style='#border:5px solid black;width:100% !important;'>
                    <v-card class='Tarjeta'  @click="goRutinasEntrenador(rutina.idRutina)" style='padding:1rem' fluid>
                        <p>
                            <v-icon class='check_icon' style='color:green !important;font-size:2rem !important'>
                                mdi-weight-lifter
                            </v-icon>
                        </p>
                        <p>
                            <strong>{{rutina.nombre}}</strong>
                        </p>
                    </v-card>
                </main>
            </v-col>
        </v-row>
        <plus_rutinas class='add_rutinas' @close="getRutinas()"/>
    </v-container>
</template>
<script>
import plus_rutinas from '../components/Add_Rutina'
export default {

    components: {
        plus_rutinas
    },
    data() {
        return {
            rutinas:[],
            rutinasEntrenador:[],
            loading:false
        }
    },
    created() {
        this.getRutinas()
    },
    methods: {
        async getRutinas() {
            this.loading=true
            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/routine/get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            this.loading=false
            const { data, error } = await res.json()
            if (error) {
                this.rutinas = []
                console.log(error);
                return
            }
            this.rutinas = data
            
        },
        goRutinasEntrenador(idRutina){
            this.$router.push("/rutinas_entrenador/"+idRutina)
            // this.$router.push({ name: 'rutinas_entrenador', params: { idRutina: idRutina} })
        }
    },

}
</script>
<style scoped>
.container_post {
    margin: 0 !important;
    padding: 0 !important;
    #border: 5px solid red !important;
    height: 73vh;
    margin-bottom: 1rem !important;
    background-color: white !important;
    overflow: auto;

}


.Tarjeta {
    #border: 5px solid red !important;
    display: flex;
    align-items: center;
    justify-content: space-around;

}


.Tarjeta img {
    #border: 5px solid red !important;
    #margin: auto;
}

.Tarjeta p {
    text-align: center;
    #border: 5px solid black !important;
    width: 50%;
    padding: 0 !important;
    margin: 0 !important;
}

.card_post {
    margin-bottom: 0.5rem;
    height: 605px !important;
    overflow: auto;
}

main {
    padding: 0rem;
    #border: 5px solid red !important;
    background-color: rgb(255, 255, 255, 0.5);
    margin-bottom: 1rem;
}




.title_post {
    display: flex;
    #border: 5px solid purple !important;
}

.title_post img {
    width: 45px;
    height: 45px;
    #border: 5px solid purple;
    border-radius: 50%;
    object-fit: cover !important;
    border: 2px solid white;
}


.icon_post {
    display: flex;
    justify-content: space-around;
}


.add_rutinas {
    position: absolute;
    top: 33.5rem;
    margin-left: -1.2rem;
}
</style>
