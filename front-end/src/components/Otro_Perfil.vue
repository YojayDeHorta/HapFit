<template>
    <v-container>
        <v-row justify="center">
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                        Open Dialog
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
                            <v-btn dark text @click="dialog = false">
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
                                    <v-tabs v-model="tabs" centered>
                                        <v-tab v-for="n in title_tabs" :key="n">
                                            {{ n.name }}
                                        </v-tab>
                                    </v-tabs>
                                </template>
                            </v-toolbar>
                            <v-tabs-items v-model="tabs">
                                <v-tab-item>
                                    <main class='tabs_post'>
                                        <section style='display:flex'>
                                            <img src="@/assets/asuka.jpg" alt="" style='#border:5px solid red;border-radius:50%;width:80px;border:1px solid grey'>
                                            <small style='margin-left:1rem'> Entrenador Generico <br> 2 m</small>
                                        </section>
                                        <section>
                                            Lorem ipsum dolor, sit amet consectetur adipisicing, elit
                                        </section>
                                        <section>
                                            <br>
                                                <main style='border:1px solid black !important;display:flex;width:90%;margin:auto'>
                                                    <v-icon>
                                                        mdi-weight-lifter
                                                    </v-icon>
                                                    <p>
                                                        FULL BODY EASY
                                                    </p>
                                                </main>
                                        </section>
                                        <section>
                                            <main>
                                                <p>
                                                    
                                                </p>
                                                <p>
                                                    
                                                </p>
                                            </main>
                                        </section>
                                    </main>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-card flat>
                                        2
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
                            </v-tabs-items>
                        </v-card>
                    </v-list>
                    <v-divider></v-divider>
                    <!--
                    <v-list three-line subheader>
                        <v-subheader>General</v-subheader>
                        <v-list-item>
                            <v-list-item-action>
                                <v-checkbox v-model="notifications"></v-checkbox>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Notifications</v-list-item-title>
                                <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-action>
                                <v-checkbox v-model="sound"></v-checkbox>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Sound</v-list-item-title>
                                <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-action>
                                <v-checkbox v-model="widgets"></v-checkbox>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Auto-add widgets</v-list-item-title>
                                <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                -->
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>
<style scoped>
.toolbar_perfil {
    height: 100px !important;
}
.tabs_post{
    padding: 1rem;
    #border: 5px solid red;
}

.tabs_post section{
    #border: 5px solid red;
}
</style>
<script>
export default {
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