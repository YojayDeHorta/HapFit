<template>
    <v-container class='container_post mb-5' style=''>
        <v-row style='padding:15px !important; height: 605px !important;overflow: auto;'>
            <v-col cols='12'>
                <h3 class='mt-5 mb-5'>Clientes:</h3>
                <main style='#border:5px solid black;width:100% !important;'>
                    
                    <v-card v-if="!clientes[0]&&!loading" class='Tarjeta' style='padding:1rem' fluid>
                        <p style="#border:5px solid red !important;">
                            No tienes Clientes :C<br>
                        </p>
                    </v-card>
                    <v-card v-else class='Tarjeta'  v-for='cliente in clientes' style='padding:1rem' :key="cliente.idUsuario" fluid @click="redirectPerfil(cliente)">
                         <p> <img class='mt-2' :src="cliente.linkPerfil" alt="" style='border-radius: 50%;width:90px;height:90px;'></p>
                        <p style="#border:5px solid red !important;">
                            {{cliente.nombre}}<br>
                             <small>cliente</small> 
                        </p>
                        <p>
                             <v-icon class='check_icon' style='color:green !important;font-size:2rem !important'>mdi-license</v-icon> 
                        </p>
                    </v-card>
                    <div v-if="loading" class="d-flex  justify-center mb-10 ">
                        <v-progress-circular :size="70" :width="7" color="red"  indeterminate ></v-progress-circular>
                        <h3 class="mt-5 ml-5">cargando clientes...</h3> 
                    </div>
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
            clientes:[],
            filtro:'',
            soloEntrenadores:false,
            loading:false,
        }
    },
    created() {
        this.getClientesContratados()
    },
    methods: {
        async getClientesContratados() {
            this.loading=true
            const res = await fetch(process.env.VUE_APP_BASE_URL+'/api/suscripcion/clientes', {
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
            this.clientes = data
            this.loading=false

        },
        redirectPerfil(cliente){
            this.datosActuales=cliente;
            this.datosActuales.esEntrenador=false;
            this.dialogPerfil=true
			console.log(this.datosActuales);
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

