<template>
    <div class='div_contenedor'>
        <v-card class='tarjeta_tabs'>
            <v-toolbar class='tolbar_tabs' height='17'>
                <template v-slot:extension style='background-color:white !important;'>
                    <v-tabs class='tab_icon' v-model="tabs" style='#border:4px solid red !important;'>
                        <v-tab v-for="n in icon"  style='#border:5px solid red !important;margin-right:1rem;position:relative;left:0.7rem'>
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
                
                    <v-card class="mx-auto overflow-hidden" width="" height='800'>
                        <v-app-bar height='50px' style='background: linear-gradient(180deg, #E42256 0%, #FF8370 100%);' dark prominent>
                            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                        </v-app-bar>
                        <v-navigation-drawer class='navigation' v-model="drawer" width='220px' absolute left temporary>
                            <v-list nav dense>
                                <v-list-item-group v-model="group">
                                    <v-list-item>
                                        <v-list-item-title>
                                            <img src="@/assets/asuka.jpg" alt="">
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-title>Nombre Generico</v-list-item-title>
                                    </v-list-item>
                                    <hr> <br>
                                    <v-list-item>
                                        <v-list-item-title>
                                            <v-icon>
                                                mdi-weight-lifter
                                            </v-icon>&nbsp;
                                            <strong>Rutinas</strong>
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-title>
                                            <v-icon>
                                                mdi-cog
                                            </v-icon>&nbsp;
                                            <strong>Opciones</strong>
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-title>
                                            <v-icon>
                                                mdi-license
                                            </v-icon>&nbsp;
                                            <strong>Ser Entrenador</strong>
                                        </v-list-item-title>
                                    </v-list-item>
                                    <div style='height: 50vh;display: flex;align-items: flex-end;'>
                                        <v-list-item>
                                            <v-list-item-title style='#border: 5px solid red !important;font-size: 1.2rem;'>
                                                <v-icon>
                                                    mdi-arrow-left-thick
                                                </v-icon>&nbsp;
                                                Salir
                                            </v-list-item-title>
                                        </v-list-item>
                                    </div>
                                </v-list-item-group>
                            </v-list>
                        </v-navigation-drawer>
                        <v-card-text>
                            <post_home />
                        </v-card-text>
                    </v-card>
            
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
                                                <v-tab v-for="n in  pestaña_usuario" :key="n">
                                                    {{ n.name }}
                                                </v-tab>
                                            </v-tabs>
                                        </template>
                                    </v-toolbar>
                                    <v-tabs-items class='' v-model="tabs_perfil">
                                        <v-tab-item elevation='0' style='padding:1rem !important'>
                                            <post_disponible />
                                        </v-tab-item>
                                        <v-tab-item style='' elevation='1'>
                                            <entrenadores />
                                        </v-tab-item>
                                        <v-tab-item style=''>
                                            <rutinas />
                                        </v-tab-item>
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
<style scoped>
.div_contenedor {
    #border: 5px solid red;
    width: 100vw;
    height: 100vh;
}

* {
    margin: 0;
    padding: 0;
}

.navigation {
    #border: 5px solid red !important;
    background: linear-gradient(180deg, #FF8370 0%, rgba(254, 198, 78, 0) 100%);
}

.tarjeta_tabs {
    #border: 5px solid black !important;
    display: flex;
    flex-direction: column-reverse;
    height: 100% !important;
}

.tab_icon {
    #border: 5px solid red !important;
    display: flex;
    justify-content: space-around !important;
}

.tabs_container {
    #position: relative;
    #top: -5rem !important;
    height: 100%;
}

img {
    width: 100px;
    height: 100px;
    border: 1px solid white !important;
    border-radius: 50%;
    object-fit: cover !important;
}
</style>
<script>
import perfil from '../components/Perfil_Post'
import post_disponible from '../components/Post_Creado'
import entrenadores from '../components/Entrenadores_Disponibles'
import rutinas from '../components/Rutinas'
import post_home from '../components/Post_home'
import busqueda from '../components/Busqueda_Entrenador'



import navegacion_usuario from '../components/Navegation_Usuario.vue'








export default {
    data() {
        return {
            drawer: false,
            group: null,
            tabs: null,
            tabs_perfil: null,
            icon: [
                { name: 'mdi-home' }, { name: 'mdi-account-circle' }, { name: "mdi-magnify" }
            ],
            pestaña_usuario: [
                { name: 'Post' }, { name: 'Entrenadores' }, { name: "Rutinas" }
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }


    },
    watch: {
        group() {
            this.drawer = false
        },
    },
    components: {
        perfil,
        post_disponible,
        entrenadores,
        rutinas,
        post_home,
        busqueda,navegacion_usuario
    },

}
</script>