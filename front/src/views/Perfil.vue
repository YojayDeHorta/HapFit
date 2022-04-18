<template>
    <div>
        <v-card class='tarjeta_tabs'>
            <v-toolbar style='border:5px solid red'>
                <template v-slot:extension style='background-color:white !important;'>
                    <v-tabs v-model="tabs" centered>
                        <v-tab v-for="n in icon" :key="n">
                            <v-icon style='font-size:2.5rem'>
                                Item {{ n.name }}
                            </v-icon>
                        </v-tab>
                    </v-tabs>
                </template>
            </v-toolbar>
            <v-tabs-items v-model="tabs" style='height:84vh'>
                <v-tab-item>
                    <v-container>
                        <v-row>
                            <v-col cols='12' style='margin:0 !important;padding:0 !important'>
                                <perfil />
                            </v-col>
                            <v-col cols='12' style='margin:0 !important;padding:0 !important;'>
                                <!--111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111-->
                                <v-card>
                                    <v-toolbar color="white" elevation='1'>
                                        <template>
                                            <v-tabs v-model="tabs_perfil" centered>
                                                <v-tab v-for="n in  pestaña_usuario" :key="n">
                                                    {{ n.name }}
                                                </v-tab>
                                            </v-tabs>
                                        </template>
                                    </v-toolbar>
                                    <v-tabs-items v-model="tabs_perfil">
                                        <v-tab-item>
                                            <v-card flat>
                                                <v-card-text>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                </v-card-text>
                                            </v-card>
                                        </v-tab-item>
                                        <v-tab-item style='border:5px solid yellow !important;overflow: scroll;'>
                                            <v-row style='border:5px solid purple !important;overflow: scroll; !important'>
                                                <div class='contractados'>
                                                    <h2 class='mt-5 mb-5'>Contratados</h2>
                                                    <div>
                                                        <section class='d-flex'>
                                                            <p class='mt-5'> <img src="@/assets/entrenadores.jpg" alt="" style='border-radius: 50%;width:90px;height:90px'></p>
                                                            <p>
                                                                Camilo Sinfuentes
                                                                <small>Entrenador</small>
                                                            </p>
                                                            <p>
                                                                <v-icon class='check_icon'>
                                                                    mdi-check-circle-outline
                                                                </v-icon>
                                                            </p>
                                                        </section>
                                                    </div>
                                                </div>
                                                <hr>
                                                <div>
                                                    <h2>Te pueden interesar</h2>
                                                    <div v-for='i in 5' :key="i">
                                                        <section class='d-flex mt-5 mb-5'>
                                                            <p class='mt-5'> <img src="@/assets/entrenadores.jpg" alt="" style='border-radius: 50%;width:90px;height:90px'></p>
                                                            <p>
                                                                Camilo Sinfuentes
                                                                <small>Entrenador</small>
                                                            </p>
                                                            <p>
                                                                <v-icon class='check_icon'>
                                                                    mdi-check-circle-outline
                                                                </v-icon>
                                                            </p>
                                                        </section>
                                                    </div>
                                                </div>
                                            </v-row>
                                            <!--
                                            <v-card flat>
                                                <v-card-title class="text-h5">
                                                    An awesome title
                                                </v-card-title>
                                                <v-card-text>
                                                    <p>
                                                        Duis lobortis massa imperdiet quam. Donec vitae orci sed dolor rutrum auctor. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Praesent congue erat at massa.
                                                    </p>
                                                    <p>
                                                        Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Etiam sit amet orci eget eros faucibus tincidunt. Donec sodales sagittis magna.
                                                    </p>
                                                    <p class="mb-0">
                                                        Ut leo. Suspendisse potenti. Duis vel nibh at velit scelerisque suscipit. Fusce pharetra convallis urna.
                                                    </p>
                                                </v-card-text>
                                            </v-card>
                                        -->
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
                                <!--111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111-->
                            </v-col>
                        </v-row>
                    </v-container>
                    <!--
                    <v-card flat>
                        <v-card-text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </v-card-text>
                    </v-card>
                -->
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-title class="text-h5">
                            An awesome title
                        </v-card-title>
                        <v-card-text>
                            <p>
                                Duis lobortis massa imperdiet quam. Donec vitae orci sed dolor rutrum auctor. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Praesent congue erat at massa.
                            </p>
                            <p>
                                Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Etiam sit amet orci eget eros faucibus tincidunt. Donec sodales sagittis magna.
                            </p>
                            <p class="mb-0">
                                Ut leo. Suspendisse potenti. Duis vel nibh at velit scelerisque suscipit. Fusce pharetra convallis urna.
                            </p>
                        </v-card-text>
                    </v-card>
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
        </v-card>`
    </div>
</template>
<style scoped>
.tarjeta_tabs {
    border: 5px solid black !important;
    display: flex;
    flex-direction: column-reverse;
    #height: 500px !important;
}

img {
    width: 100%;
}

section {
    align-items: center !important;
    display: flex !important;
    justify-content: center !important;
    background-color: rgb(228, 34, 86, 0.5) !important;
}


.contractados h2 {
    #border: 5px solid red !important;
    padding-left: 1rem !important;
}


section p {
    text-align: center;
    #border: 4px solid red !important;
    width: 33.3%;
}

.check_icon {
    #border: 5px solid black;
    font-size: 2rem !important;
}
</style>
<script>
import perfil from '../components/Perfil_Post'



export default {
    data() {
        return {
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
    components: {
        perfil
    },
}
</script>