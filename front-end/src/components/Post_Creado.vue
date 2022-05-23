<template>
    <v-container class='container_post mb-5' style='#border:5px solid red'>
        <v-card class="mb-5 ">
            <v-card-text class="d-flex justify-end">
                <v-textarea solo flat height="70px" v-model="descripcion" label="escribe aca tu post..." :no-resize="true">
                </v-textarea>
                <v-btn icon class="mt-15" @click="publicarPost()">
                    <v-icon>mdi-send</v-icon>
                </v-btn>
            </v-card-text>
        </v-card>
        <v-card v-for='(publicacion,index) in post' :key="publicacion.idPublicacion" class='card_post mb-5' elevation='3'>
            <main elevation='4'>
                <section class='title_post'>
                    <img class='img_post' :src="publicacion.linkPerfil" alt="" style=''>
                    <section style='#border:5px solid red;width:100%;display:flex;justify-content:space-between'>
                        <p style='padding-left: 1rem;'>
                            {{publicacion.nombre}}
                            <!-- <br><small>2 m</small> -->
                        </p>
                        <v-row justify="center">
                            <v-btn color="primary" class="ma-2" dark @click="dialog = true">
                                Open Dialog 1
                            </v-btn>
                            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
                                <v-card tile>
                                    <v-toolbar flat dark color="primary">
                                        <v-btn icon dark @click="dialog = false">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                        <v-toolbar-title>Settings</v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-toolbar-items>
                                            <v-btn dark text @click="dialog = false">
                                                Save
                                            </v-btn>
                                            <v-btn color="primary" dark class="ma-2" @click="dialog2 = !dialog2">
                                                Open Dialog 2
                                            </v-btn>
                                        </v-toolbar-items>
                                        <v-menu bottom right offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn dark icon v-bind="attrs" v-on="on">
                                                    <v-icon>mdi-dots-vertical</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item v-for="(item, i) in items" :key="i" @click="() => {}">
                                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </v-toolbar>
                                    <v-card-text>
                                        <v-btn color="primary" dark class="ma-2" @click="dialog2 = !dialog2">
                                            Open Dialog 2
                                        </v-btn>
                                        <v-tooltip right>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn class="ma-2" v-bind="attrs" v-on="on">
                                                    Tool Tip Activator
                                                </v-btn>
                                            </template>
                                            Tool Tip
                                        </v-tooltip>
                                        <v-list three-line subheader>
                                            <v-subheader>User Controls</v-subheader>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title>Content filtering</v-list-item-title>
                                                    <v-list-item-subtitle>Set the content filtering level to restrict apps that can be downloaded</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title>Password</v-list-item-title>
                                                    <v-list-item-subtitle>Require password for purchase or use password to restrict purchase</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                        <v-divider></v-divider>
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
                                    </v-card-text>
                                    <div style="flex: 1 1 auto;"></div>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialog2" max-width="500px">
                                <v-card>
                                    <v-card-title>
                                        Dialog 2
                                    </v-card-title>
                                    <v-card-text>
                                        <v-btn color="primary" dark @click="dialog3 = !dialog3">
                                            Open Dialog 3
                                        </v-btn>
                                        <v-select :items="select" label="A Select List" item-value="text"></v-select>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="primary" text @click="dialog2 = false">
                                            Close
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialog3" max-width="500px">
                                <v-card>
                                    <v-card-title>
                                        <span>Dialog 3</span>
                                        <v-spacer></v-spacer>
                                        <v-menu bottom left>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon v-bind="attrs" v-on="on">
                                                    <v-icon>mdi-dots-vertical</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item v-for="(item, i) in items" :key="i" @click="() => {}">
                                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-btn color="primary" text @click="dialog3 = false">
                                            Close
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-row>
                        <v-btn class='btn_close' @click="borrarPost(publicacion.idPublicacion)" plain>
                            <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                    </section>
                </section>
                <section class='text-left mt-5'>
                    <p>{{publicacion.descripcion}} </p>
                </section>
                <section class='icon_post mt-5'>
                    <p style='display: flex;' class="mt-2">
                        <small> {{publicacion.likes}} </small>
                        &nbsp;
                        <v-checkbox @click="cambiarCorazon(publicacion.idPublicacion,index)" v-model="publicacion.liked" style='margin: 0;padding: 0;' :on-icon="'mdi-heart'" :off-icon="'mdi-heart'">
                        </v-checkbox>
                    </p>
                    <p>
                        <modal_comments :idPublicacion="publicacion.idPublicacion"></modal_comments>
                    </p>
                </section>
            </main>
        </v-card>
    </v-container>
</template>
<script>
import modal_comments from '../components/Modal_comments'
import modal_perfil from '../components/Otro_Perfil'



export default {
    components: {
        modal_comments,
        modal_perfil
    },
    data() {
        return {
            post: [],
            descripcion: '',
            dialog: false,
            dialog2: false,
            dialog3: false,
            notifications: false,
            sound: true,
            widgets: false,
            items: [{
                    title: 'Click Me',
                },
                {
                    title: 'Click Me',
                },
                {
                    title: 'Click Me',
                },
                {
                    title: 'Click Me 2',
                },
            ],
            select: [
                { text: 'State 1' },
                { text: 'State 2' },
                { text: 'State 3' },
                { text: 'State 4' },
                { text: 'State 5' },
                { text: 'State 6' },
                { text: 'State 7' },
            ],
        }
    },
    created() {
        this.getPost()
    },
    methods: {
        async getPost() {

            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/post/user', {
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
            this.post = data



        },
        async publicarPost() {
            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/post/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ descripcion: this.descripcion })
            })
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }
            this.descripcion = ''
            this.getPost()
        },
        async borrarPost(id) {
            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/post/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ idPublicacion: id })
            })
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }
            this.$root.vtoast.show({message: 'borrado exitosamente!'})
            this.getPost()
            // console.log('a');
        },
        async cambiarCorazon(idPublicacion, index) {
            this.post[index].liked = !this.post[index].liked

            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/post/setlikes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ idPublicacion })
            })
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }

            this.getPost()

        }
    },
}
</script>
<style scoped>
.container_post {
    margin: 0 !important;
    padding: 0 !important;
    /* #border: 5px solid red !important; */
    height: 600px;
    overflow: auto;
    margin-bottom: 1rem !important;
    background-color: white !important;

}

.card_post {
    margin-bottom: 0.5rem;
    /* height: 605px !important; */
    overflow: auto;
}

main {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
    /* #border: 5px solid red !important; */
    background-color: rgb(243, 243, 243);
    /* margin-bottom: 1rem; */
}



main section {
    /* #border: 5px solid black !important; */
}

.title_post {
    display: flex;
    /* #border: 5px solid purple !important; */
}

.title_post img {
    width: 45px;
    height: 45px;
    /* #border: 5px solid purple; */
    border-radius: 50%;
    object-fit: cover !important;
    border: 2px solid white;
}


.icon_post {
    display: flex;
    justify-content: space-around;
    #border: 5px solid black !important;
}
</style>