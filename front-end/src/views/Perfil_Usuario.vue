<template>
    <div class='div_contenedor'>
        <v-card class='tarjeta_tabs'>
            <v-toolbar class='tolbar_tabs' height='17'>
                <template v-slot:extension style='background-color:white !important;'>
                    <v-tabs class='tab_icon' v-model="tabs" elevation="3">
                        <v-tab class='tabs' v-for="n in icon" :key="n.id" style='display: flex;justify-content: space-around;'>
                            <v-icon style='font-size:4rem;'>
                                Item {{ n.name }}
                            </v-icon>
                        </v-tab>
                    </v-tabs>
                </template>
            </v-toolbar>
            <v-tabs-items class='tabs_container' v-model="tabs" style=''>
                <v-tab-item>
                    <!--
                  <navegacion_usuario/>
              -->
                    <!--
                            1
                    -->
                    <navbar />
                </v-tab-item>
                <v-tab-item>
                    <v-container>
                        <v-row>
                            <v-col cols='12' style=''>
                                <perfil />
                            </v-col>
                            <v-col cols='12' style=''>
                                <v-card elevation='0'>
                                    <v-toolbar color="white" elevation='5' height='45'>
                                        <template>
                                            <v-tabs v-model="tabs_perfil" centered>
                                                <v-tab v-for="n in  pestaña_usuario" :key="n.id" style='display: flex;justify-content: space-around;width: 100%;'>
                                                    {{ n.name }}
                                                </v-tab>
                                            </v-tabs>
                                        </template>
                                    </v-toolbar>
                                    <v-tabs-items class='' v-model="tabs_perfil">
                                        <v-tab-item elevation='0' style='padding:1rem !important'>
                                            
                                            <post_disponible />
                                        </v-tab-item>
                                        <v-tab-item style='' elevation='1' v-if="usuario.rol=='cliente'">
                                            <entrenadores />
                                        </v-tab-item>
                                        <v-tab-item style='' elevation='1' v-else>
                                            <!-- si es entrenador -->
                                            <clientes />
                                        </v-tab-item>
                                        <v-tab-item style='' >
                                            <rutinas />
                                        </v-tab-item>
                                        <!-- <v-tab-item style='' v-else>
                                            <main class='rutinas mt-5'>
                                                <v-card class='rutinas_entrenador'>
                                                    <p>
                                                        <v-icon class='icon'>
                                                            mdi-weight-lifter
                                                        </v-icon>&nbsp;
                                                        <strong>Full Body Easy</strong>
                                                    </p>
                                                </v-card>
                                                <v-card class='rutinas_entrenador'>
                                                    <p>
                                                        <v-icon class='icon'>
                                                            mdi-weight-lifter
                                                        </v-icon>&nbsp;
                                                        <strong>Pecho - Espalda</strong>
                                                    </p>
                                                </v-card>
                                                <v-card class='rutinas_entrenador' to='/Rutinas_Entrenador'>
                                                    <p>
                                                        <v-icon class='icon'>
                                                            mdi-weight-lifter
                                                        </v-icon>&nbsp;
                                                        <strong>Tren Inferior</strong>
                                                    </p>
                                                </v-card>
                                            </main>
                                        </v-tab-item> -->
                                    </v-tabs-items>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-tab-item>
                <v-tab-item>
                    <busqueda />
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </div>
</template>
<script>
import perfil from '../components/Perfil'
import post_disponible from '../components/Post_Creado'
import entrenadores from '../components/Entrenadores_Disponibles'
import rutinas from '../components/Rutinas'
import busqueda from '../components/Busqueda_Entrenador'
import navbar from '../components/Navbar.vue'
import clientes from '../components/Entrenador_Cliente.vue'


export default {
    components: {
        perfil,
        post_disponible,
        entrenadores,
        rutinas,
        busqueda,
        navbar,
        clientes
    },
    data() {
        return {
            usuario: {
                nombre: '',
                linkPerfil: '',
                rol: ''
            },
            publicaciones: [],
            drawer: false,
            group: null,
            tabs: null,
            tabs_perfil: null,
            icon: [
                { id: 1, name: 'mdi-home' }, { id: 2, name: 'mdi-account-circle' }, { id: 3, name: "mdi-magnify" }
            ],
            pestaña_usuario: [
                { id: 1, name: 'Post' }, { id: 2, name: 'Entrenadores' }, { id: 3, name: "Rutinas" }
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }


    },
    watch: {
        group() {
            this.drawer = false
        },
    },
    created() {
        this.usuario.nombre = localStorage.getItem('nombre')
        this.usuario.linkPerfil = localStorage.getItem('linkPerfil')
        this.usuario.rol = localStorage.getItem('rol')
        if (this.usuario.rol == "entrenador") {
            this.pestaña_usuario = [{ name: 'Post' }, { name: '       Clientes' }, { name: "Rutinas" }]
        }
    },
    methods: {
        async getUser() {

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


        },
        

    },

}
</script>
<style scoped>
.div_contenedor {
    /* #border: 5px solid red; */
    width: 100vw;
    height: 100vh;
}

* {
    margin: 0;
    padding: 0;
}

.navigation {
    /* #border: 5px solid red !important; */
    background: linear-gradient(180deg, #FF8370 0%, rgba(254, 198, 78, 0) 100%);
}

.tarjeta_tabs {
    /* #border: 5px solid black !important; */
    display: flex;
    flex-direction: column-reverse;
    height: 100% !important;
}

.tab_icon {
    /* #border: 5px solid red !important; */
    #display: flex;
    #justify-content: space-around !important;
    width: 100% !important;
}

.tabs_container {
    /* #position: relative;
    #top: -5rem !important; */
    height: 100%;
}

img {
    width: 100px;
    height: 100px;
    border: 1px solid white !important;
    border-radius: 50%;
    object-fit: cover !important;
}

.tabs {
    width: 180% !important;
}


.rutinas {
    #border: 4px solid purple;
    height: 598px;
    overflow: auto;

}


.rutinas_entrenador {
    text-align: start;
    #border: 5px solid black !important;
    margin-top: 1rem;
    padding: 0.5rem;
    width: 95%;
    margin: auto;
    margin-top: 1rem;
}

.rutinas_entrenador .icon {
    font-size: 3.5rem;
}

.rutinas_entrenador strong {
    font-size: 1.2rem;
}
</style>