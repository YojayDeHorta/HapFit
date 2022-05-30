<template>
    <v-container>
        <v-dialog v-model="dialogPerfil" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark height='100px' style='background: linear-gradient(180deg, #E42256 0%, #FF8370 100%);'>
                    <v-btn icon dark @click="$emit('close')">
                        <v-icon>mdi-arrow-left-thin</v-icon>
                    </v-btn>
                    <v-toolbar-title>
                        <main style='#border:5px solid red !important;display:flex;width:120%'>
                            <img :src="datos.linkPerfil" alt="" style='#border:5px solid red;border-radius:50%;width:80px;height:80px'>
                            <small> {{datos.nombre}}</small>
                        </main>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text v-if="datos.esEntrenador">
                            contratar
                        </v-btn>
                        <v-btn dark text @click="dialog = false" to='/chat_usuario' v-else>
                            <v-icon>
                                mdi-message-processing-outline
                            </v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list three-line subheader>
                    <v-toolbar elevation='1'>
                        <template>
                            <v-tabs v-model="tabs">
                                <v-tab v-for="n in title_tabs" :key="n.id" style='width:100% !important'>
                                    {{ n.name }}
                                </v-tab>
                            </v-tabs>
                        </template>
                    </v-toolbar>
                    <v-tabs-items v-model="tabs">
                        <v-tab-item>
                            <br>
                            <post_perfil :idUsuario="datos.idUsuario" />
                            <!-- <main class='tabs_post' style='background-color:rgb(229, 229, 229,0.9);box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;'>
                                        <section style='display:flex'>
                                            <img src="@/assets/asuka.jpg" alt="" style='#border:5px solid red;border-radius:50%;width:80px;border:1px solid grey'>
                                            <small style='margin-left:1rem'> Entrenador Generico <br> 2 m</small>
                                        </section>
                                        <section class='mt-5'>
                                            <p>
                                                Lorem ipsum dolor, sit amet consectetur adipisicing, elit
                                            </p>
                                        </section>
                                        <br>
                                        <section style='border:1px solid black;padding: 0.5rem;'>
                                            <main style='#border:1px solid black !important;display:flex;text-align: center;margin:auto'>
                                                <v-icon style='font-size:3rem'>
                                                    mdi-weight-lifter
                                                </v-icon>
                                                &nbsp;&nbsp;
                                                <h3 class='mt-2'>
                                                    FULL BODY EASY
                                                </h3>
                                            </main>
                                        </section>
                                        <br><br>
                                        <section class='d-flex' style='justify-content: space-between;width: 80%;margin: auto;'>
                                            <p>
                                                <v-icon>
                                                    mdi-heart
                                                </v-icon>
                                            </p>
                                            <p>
                                                <v-icon>
                                                    mdi-comment-multiple-outline
                                                </v-icon>
                                            </p>
                                        </section>
                                    </main> -->
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <rutinas />
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-list>
                <v-divider></v-divider>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import rutinas from '../components/Rutinas'
import post_perfil from './Post_perfil.vue'


export default {
    components: {
        rutinas,
        post_perfil
    },
    props: {
        datos: null,
        dialogPerfil: null
    },
    created() {

        console.log(this.publicacion);
    },
    data() {
        return {
            notifications: false,
            sound: true,
            widgets: false,
            tabs: null,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            title_tabs: [
                { 'name': 'Post', id: 1 }, { 'name': 'Rutinas', id: 2 }
            ]
        }
    },
}
</script>
<style scoped>
.toolbar_perfil {
    height: 100px !important;
}

.tabs_post {
    padding: 1rem;
    #border: 5px solid red;
}

main {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
    /* #border: 5px solid red !important; */
    /* margin-bottom: 1rem; */
}

.tabs_post section {
    #border: 5px solid red;
}

.img_post {
    width: 45px;
    height: 45px;
    /* #border: 5px solid purple; */
    border-radius: 50%;
    object-fit: cover !important;
    border: 2px solid white;
}

.title_post {
    display: flex;
    /* #border: 5px solid purple !important; */
}
</style>