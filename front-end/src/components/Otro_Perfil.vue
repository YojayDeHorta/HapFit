<template>
    <v-container>
        <v-row justify="center">
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    </v-btn>
                </template>
                <v-card>
                    <v-toolbar dark height='100px' style='background: linear-gradient(180deg, #E42256 0%, #FF8370 100%);'>
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-arrow-left-thin</v-icon>
                        </v-btn>
                        <v-toolbar-title>
                            <main style='#border:5px solid red !important;display:flex;width:120%'>
                                <img src="@/assets/asuka.jpg" alt="" style='#border:5px solid red;border-radius:50%;width:80px'>
                                <small> Entrenador Generico</small>
                            </main>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn dark text @click="dialog = false" to='/chat_usuario'>
                                <v-icon>
                                    mdi-message-processing-outline
                                </v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-list three-line subheader>
                        <v-card>
                            <v-toolbar elevation='1'>
                                <template>
                                    <v-tabs v-model="tabs">
                                        <v-tab v-for="n in title_tabs" :key="n" style='width:100% !important'>
                                            {{ n.name }}
                                        </v-tab>
                                    </v-tabs>
                                </template>
                            </v-toolbar>
                            <v-tabs-items v-model="tabs">
                                <v-tab-item>
                                    <br>
                                    <main class='tabs_post' style='background-color:rgb(229, 229, 229,0.9);box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;'>
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
                                    </main>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-card flat>
                                        <rutinas/>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-card>
                    </v-list>
                    <v-divider></v-divider>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>
<style scoped>
.toolbar_perfil {
    height: 100px !important;
}

.tabs_post {
    padding: 1rem;
    #border: 5px solid red;
}

.tabs_post section {
    #border: 5px solid red;
}
</style>
<script>
import rutinas from '../components/Rutinas'


export default {
    components: {
        rutinas
    },
    data() {
        return {
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            tabs: null,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            title_tabs: [
                { 'name': 'Post' }, { 'name': 'Rutinas' }
            ]
        }
    },
}
</script>