<template>
    <v-container class='Contenedor_Principal'>
        <v-card class='Card_Contenedor'>
            <v-toolbar>
                <template>
                    <v-tabs v-model="tabs" centered>
                        <v-tab v-for="n in icon" style='padding: 1rem;'>
                            <v-icon style='font-size:3rem;padding: 1rem;'>
                                {{ n.name }}
                            </v-icon>
                        </v-tab>
                    </v-tabs>
                </template>
            </v-toolbar>
            <v-tabs-items v-model="tabs" style='height: 100vh'>
                <v-tab-item>
                    <v-card flat>
                        <Navbar />
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-row>
                        <v-col cols='12'>
                            <user_entrenador />
                        </v-col>
                        <v-col cols='12'>
                            <v-card elevation='0'>
                                <v-toolbar color="white" elevation='5' height='45'>
                                    <template>
                                        <v-tabs v-model="tabs_perfil" centered>
                                            <v-tab v-for="n in  pestaña_usuario" style='display:flex;justify-content:space-evenly;width: 50%;' elevation='2'>
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
                                        <clientes/>
                                    </v-tab-item>
                                    <v-tab-item class='content_tabs_rutinas'>
                                        <main class='rutinas mt-5'>
                                            <v-card class='rutinas_entrenador'>
                                                <p>
                                                    <v-icon class='icon'>
                                                        mdi-weight-lifter
                                                    </v-icon>
                                                    <strong>Full Body Easy</strong>
                                                </p>
                                            </v-card>
                                            <v-card class='rutinas_entrenador'>
                                                <p>
                                                    <v-icon class='icon'>
                                                        mdi-weight-lifter
                                                    </v-icon>
                                                    <strong>Pecho - Espalda</strong>
                                                </p>
                                            </v-card>
                                            <v-card class='rutinas_entrenador' to='/Rutinas_Entrenador'>
                                                <p>
                                                    <v-icon class='icon'>
                                                        mdi-weight-lifter
                                                    </v-icon>
                                                    <strong>Tren Inferior</strong>
                                                </p>
                                            </v-card>
                                        </main>
                                        <modal_add_rutinas class='add_rutinas' />
                                    </v-tab-item>
                                </v-tabs-items>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-title class="text-h5">
                            An even better title
                        </v-card-title>
                        <v-card-text>
                            <p>
                                Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed hendrerit. Maecenas malesuada. Vestibulum ullamcorper mauris at ligula. Proin faucibus arcu quis ante.
                            </p>
                            <p class="mb-0">
                                Etiam vitae tortor. Curabitur ullamcorper ultricies nisi. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Aliquam lobortis. Suspendisse potenti.
                            </p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-container>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import user_entrenador from '../components/Perfil_User_Entrenador.vue'
import modal_add_rutinas from '../components/Add_Rutina.vue'
import clientes from '../components/Entrenador_Cliente.vue'
import post_disponible from '../components/Post_Creado'

export default {
    data() {
        return {
            icon: [
                { name: 'mdi-home' }, { name: 'mdi-account-circle' }, { name: "mdi-magnify" }
            ],
            pestaña_usuario: [
                { name: 'Post' }, { name: 'Clientes' }, { name: "Rutinas" }
            ],
            tabs: null,
            tabs_perfil: null,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }
        
    },
    components: {
        Navbar,
        user_entrenador,
        modal_add_rutinas,
        clientes,
        post_disponible
    }
}
</script>
<style scoped>
.Contenedor_Principal {
    #border: 5px solid red;
    width: 100vw;
    height: 100vh;
}

* {
    margin: 0;
    padding: 0;
}


.Tabs_Button {
    height: 100%;
    border: 5px solid black !important;
}

.Card_Contenedor {
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
}

.content_tabs_rutinas {
    position: relative;
    #border: 5px solid purple;
    overflow: auto;
    height: 620px;
}

.rutinas_entrenador {
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    padding: 1rem;
    background: rgb(255, 250, 237);
}

.rutinas_entrenador p {
    #border: 5px solid red !important;
    width: 90%;
    font-size: 1.3rem;
    margin: auto;

}


.rutinas_entrenador strong {
    margin-left: 0.5rem;
}

.rutinas_entrenador .icon {
    font-size: 2rem;
}
</style>

<!--
<template>
    <div class='div_contenedor'>
        <v-card class='tarjeta_tabs'>
            <v-toolbar class='tolbar_tabs' height='17'>
                <template v-slot:extension style='background-color:white !important;'>
                    <v-tabs class='tab_icon' v-model="tabs" style='#border:4px solid red !important;'>
                        <v-tab v-for="n in icon" :key="n" style='#border:5px solid red !important;margin-right:1rem;position:relative;left:0.7rem'>
                            <v-icon style='font-size:4rem;'>
                                Item {{ n.name }}
                            </v-icon>
                        </v-tab>
                    </v-tabs>
                </template>
            </v-toolbar>
            <v-tabs-items class='tabs_container' v-model="tabs" style=''>
                <v-tab-item>
                    <v-card class="mx-auto overflow-hidden" width="" height='800'>
                        <v-app-bar height='50px' style='background: linear-gradient(180deg, #E42256 0%, #FF8370 100%);' dark prominent>
                            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                        </v-app-bar>
                        <v-navigation-drawer class='navigation' v-model="drawer" width='220px' absolute left temporary>
                            <v-list nav dense>
                                <v-list-item-group v-model="group">
                                    <v-list-item>
                                        <v-list-item-title>
                                            <img src="@/assets/entrenador_baki.jpg" alt="">
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-title>Entrenador Generico</v-list-item-title>
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
                                                mdi-bookmark-box-multiple
                                            </v-icon>&nbsp;
                                            <strong>Planes</strong>
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-container  style='height: 50vh;display: flex;align-items: flex-end;border: 5px solid red'>
                                        <v-list-item to='/'>
                                            <v-list-item-title  style='font-size: 1.4rem;'>
                                                <v-icon>
                                                    mdi-arrow-left-thick
                                                </v-icon>&nbsp;
                                                Salir
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-container>
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
                                <perfil_entrenador />
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
import perfil_entrenador from '../components/Perfil_Post_Entrenador.vue'
import post_disponible from '../components/Post_Creado'
import entrenadores from '../components/Entrenadores_Disponibles'
import rutinas from '../components/Rutinas'
import post_home from '../components/Post_home'
import busqueda from '../components/Busqueda_Entrenador'

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
                { name: 'Post' }, { name: 'Clientes' }, { name: "Rutinas" }
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
        perfil_entrenador,
        post_disponible,
        entrenadores,
        rutinas,
        post_home,
        busqueda
    },

}
</script>