<template>
    <v-container style='#padding:2rem' fluid>
        <div style='height:50px;background: linear-gradient(180deg, #E42256 0%, #FF8370 100%);'></div>
        <v-row style='padding:1rem'>
            <v-col cols='12'>
            	<main class='main_search'>
            		<section style='width:80%'>
            			<v-text-field v-model="filtro" outlined label="Buscar Usuario" height='50px'></v-text-field>
            		</section>
            		<section style='background-color:#eee;height:55px;border-radius:0rem 3rem 3rem 0rem;padding:0rem; 1rem 0rem 1rem;width:60px'>
            			  
                          <v-checkbox v-model="soloEntrenadores" append-icon="mdi-license"></v-checkbox>
            		</section>
            	</main>
            </v-col>
            <v-col class='scroll_pantalla' cols='12'>
                <main>
                    <v-card to='/perfil_entrenador'  v-for='usuario in filtroUsuario' :key='usuario.idUsuario' class='Tarjeta' style='padding:1rem' fluid>
                        <p> <img class='mt-2' :src="usuario.linkPerfil" alt="" style='border-radius: 50%;width:90px;height:90px;'></p>
                        <p style="#border:5px solid red !important;">
                            {{usuario.nombre}}<br>
                            <small v-if="usuario.esEntrenador">Entrenador</small>
                            <small v-else>Usuario</small>
                        </p>
                        <p style="#width:25% !important">
                            <v-icon v-if="usuario.esEntrenador" class='check_icon' style='color:black !important;font-size:2rem !important'>
                                mdi-license
                            </v-icon>
                        </p>
                    </v-card>
                </main>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            usuarios:[],
            filtro:'',
            soloEntrenadores:false
        }
    },
    created() {
        this.getUsuarios()
    },
    computed:{
        filtroUsuario(){
            let aux=this.usuarios
            if (this.soloEntrenadores) {
                aux=this.usuarios.filter(usuario => 
                    usuario.esEntrenador==true
                )
            }
            if (this.filtro) {
                aux=this.usuarios.filter(usuario => 

                    usuario.nombre.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0
                )
            }
            return aux
        }
    },
    methods: {
         async getUsuarios() {
            const res = await fetch(process.env.VUE_APP_BASE_URL+'/api/user/', {
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
            this.usuarios = data


        },
    },
}
</script>
<style scoped>
.main_search{
	#border: 5px solid purple !important;
	text-align: center;
	display: flex;
	justify-content: center;
	#align-items: center;
}

.scroll_pantalla{
    height: 600px;
    #border: 4px solid black;
    overflow: auto;
}

.main_search section{
    height: 100px;
	#width: 70%;
	#border: 5px solid black !important;
}

.Tarjeta{
    display: flex;
   justify-content: space-between;
    align-items: center;
    gap: 1;
    margin-top: 1rem;
}

.Tarjeta p{
    text-align: center;
    #margin-left: 2rem;
}

</style>
