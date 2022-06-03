<template>
    <v-container class='container_post mb-5' style=''>
        <v-row style='padding:15px !important; height: 605px !important;overflow: auto;'>
            <v-col cols='12'>
                <h3 class='mt-5 mb-5'>Contratados</h3>
                <main style='#border:5px solid black;width:100% !important;'>
                    
                    <v-card v-if="!contratados[0]&&!loading" class='Tarjeta' style='padding:1rem' fluid>
                        <p style="#border:5px solid red !important;">
                            No tienes entrenadores<br>
                        </p>
                    </v-card>
                    <v-card v-else class='Tarjeta'  v-for='entrenador in contratados' style='padding:1rem' :key="entrenador.idUsuario" fluid @click="redirectPerfil(entrenador)">
                         <p> <img class='mt-2' :src="entrenador.linkPerfil" alt="" style='border-radius: 50%;width:90px;height:90px;'></p>
                        <p style="#border:5px solid red !important;">
                            {{entrenador.nombre}}<br>
                             <small>Entrenador</small> 
                        </p>
                        <p>
                             <v-icon class='check_icon' style='color:green !important;font-size:2rem !important'>mdi-license</v-icon> 
                        </p>
                    </v-card>
                    <div v-if="loading" class="d-flex  justify-center mb-10 ">
                        <v-progress-circular :size="70" :width="7" color="red"  indeterminate ></v-progress-circular>
                        <h3 class="mt-5 ml-5">cargando entrenadores...</h3> 
                    </div>
                </main>
            </v-col>
            <v-col cols='12'>
                <h3 class='mt-5 mb-5'>Te pueden interesar</h3>
                <main v-for='entrenador in entrenadores' :key="entrenador.idUsuario"   style='#border:5px solid black;width:100% !important;'>
                    <v-card class='Tarjeta' fluid @click="redirectPerfil(entrenador)">
                        <p> <img class='mt-2' :src="entrenador.linkPerfil" alt="" style='border-radius: 50%;width:90px;height:90px;'></p>
                        <p class='ml-2' style="#border:5px solid red !important;">
                            {{entrenador.nombre}} <br>
                            <small>Entrenador</small>
                        </p>
                    </v-card>
                </main>
            </v-col>
        </v-row>
       <modal_perfil :dialogPerfil="dialogPerfil" @close="dialogPerfil=false" :datos="datosActuales"/>
    </v-container>
</template>
<script>
import modal_perfil from '../components/Dialog_perfil'

export default {
    components:{
        modal_perfil
    },
    data() {
        return {
            datosActuales:{},
            dialogPerfil:false,
            entrenadores:[],
            contratados:[],
            filtro:'',
            soloEntrenadores:false,
            loading:false,
        }
    },
    created() {
        this.getEntrenadores()
        this.getEntrenadoresContratados()
    },
    methods: {
         async getEntrenadores(nombre) {

            const res = await fetch(process.env.VUE_APP_BASE_URL+'/api/user/trainers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            })
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }
            this.entrenadores = data


        },
        async getEntrenadoresContratados() {
            this.loading=true
            const res = await fetch(process.env.VUE_APP_BASE_URL+'/api/suscripcion/entrenadores', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            })
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }
            this.contratados = data
            this.loading=false

        },
        redirectPerfil(entrenador){
            this.datosActuales=entrenador;
            this.datosActuales.esEntrenador=true;
            this.dialogPerfil=true
        },
    },
}
</script>
<style scoped>
.container_post {
    margin: 0 !important;
    padding: 0 !important;
    #border: 5px solid red !important;
    height: 100vh;
    margin-bottom: 1rem !important;
    background-color: white !important;
}


.Tarjeta {
    #border: 5px solid red !important;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: rgba(254, 200, 77, 0.1);

}


.Tarjeta img {
    #border: 5px solid red !important;
    #margin: auto;
}

.Tarjeta p {
    text-align: center;
    #border: 5px solid black !important;
    #width: 33.3%;
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
</style>

