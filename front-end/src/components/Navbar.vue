<template>
    <v-container fluid style='padding: 0 !important;'>
        <v-card class="overflow-hidden" fluid>
            <v-app-bar style='background: linear-gradient(180deg, #E42256 0%, #FF8370 100%);' dark elevate-on-scroll scroll-target="#scrolling-techniques-7" absolute>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-spacer></v-spacer>
            </v-app-bar>
            <v-navigation-drawer v-model="drawer" absolute left temporary width='200px' style='background: linear-gradient(180deg, #FF8370 0%, rgba(254, 198, 78,1) 100%);'>
                <v-list nav dense>
                    <v-list-item-group v-model="group">
                        <v-list-item>
                            <v-list-item-title plain>
                                <img :src="usuario.linkPerfil" alt="" style='width: 150px;height: 150px;border-radius: 50%;object-fit: cover;border: 3px solid white;'>
                                <v-icon style="position: absolute;bottom: 10px;left: 20px;color: white;font-size: 2.4em;background-color: #484848;padding: 6px;border-radius: 50%;">
                                    mdi-pencil
                                </v-icon>
                            </v-list-item-title>
                            <label style="position: absolute;width: 100%;height: 100%;">
                                <input type="file" @change="cargarArchivo" style="visibility: hidden;" />
                            </label>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title class='text' style='text-align: center;font-size:1.1rem; font-weight: bold !important; font-size: 1.4em; padding: 5px !important;'>{{usuario.nombre}}</v-list-item-title>
                        </v-list-item>
                        <hr><br>
                        <v-list-item class='item_sub_text'>
                            <v-list-item-title class='text sub_txt'>
                                <v-btn to='/rutinas_entrenador' plain>
                                    <v-icon>
                                        mdi-weight-lifter
                                    </v-icon>&nbsp;
                                    <strong>Rutinas</strong>
                                </v-btn>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item class='item_sub_text'>
                            <v-list-item-title class='text sub_txt'>
                                <v-icon>
                                    mdi-cog
                                </v-icon>&nbsp;
                                <strong>Opciones</strong>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item v-if="usuario.rol=='cliente'" @click="dialog_solicitud=true">
                            <v-list-item-title plain>
                                <v-icon>
                                    mdi-license
                                </v-icon>&nbsp;
                                <strong>Ser Entrenador</strong>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item class='item_sub_text' v-if="usuario.rol=='entrenador'">
                            <v-list-item-title class='text sub_txt'>
                                <v-btn to='/planes_entrenador' plain>
                                    <v-icon>
                                        mdi-bookmark-box-multiple
                                    </v-icon>&nbsp;
                                    <strong>Planes</strong>
                                </v-btn>
                            </v-list-item-title>
                        </v-list-item><br>
                        <v-container class='salir_item mt-5' @click="cerrarSesion()" fluid>
                            <v-list-item class='item_sub_text'>
                                <v-list-item-title class='text' style='font-size: 1.4rem;'>
                                    <v-btn to='/' style='background-color: transparent;' plain>
                                        <v-icon plain>
                                            mdi-arrow-left-thick
                                        </v-icon>&nbsp;
                                        <strong>Salir</strong>
                                    </v-btn>
                                </v-list-item-title>
                            </v-list-item>
                        </v-container>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
            <!-- este es el pedazo de las publicaciones en la pagina de inicio -->
            <Post_inicio />
        </v-card>
        <!-- modal de entrenador -->
        <v-dialog v-model="dialog_solicitud" width="500">
            <v-card style='#border:5px solid purple;padding:1rem'>
                <v-card-title class="text-h6 mb-3 grey lighten-2 text-center" style='text-transform:capitalize'> Solicitud para ser entrenador</v-card-title>
                <v-list-item three-line>
                    <v-list-item-content>
                        <!-- <h3 class="ml-1"><strong >usuario: {{usuario.nombre}}</strong></h3> -->
                        <v-text-field v-model="solicitud.lugarExp" label="lugar de estudio o trabajo" outlined></v-text-field>
                        <v-text-field v-model="solicitud.mesesExp" type="number" label="meses de experiencia o estudio" outlined></v-text-field>
                        <v-file-input truncate-length="50" v-model="solicitud.linkTitulos" label="seleccione su certificado" outlined></v-file-input>
                        <v-textarea solo height="70px" v-model="solicitud.descripcion" label="porque quieres ser entrenador?" :no-resize="true" outlined></v-textarea>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-card-actions class='text-center' style='#border:5px solid black !important;display:flex;justify-content:center !important'>
                   
                    <v-btn color="primary" text @click="enviarSolicitud();" style='#border:5px solid purple;'> Enviar Solicitud </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import modal_comments from './Modal_comments.vue'
import Post_Creado from './Post_Creado.vue'
import Post_inicio from './Post_inicio.vue'
export default {
    data() {
        return {
            drawer: false,
            group: null,
            post: [],
            usuario: {
                nombre: '',
                linkPerfil: '',
                rol: ''
            },
            solicitud: {
                linkTitulos: null,
                lugarExp: null,
                mesesExp: null,
                descripcion: ''
            },
            dialog_solicitud: false
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
    },
    components: {
        modal_comments,
        Post_Creado,
        Post_inicio
    },
    methods: {
        cerrarSesion() {
            localStorage.clear()
            // this.$router.push({ name: "inicio"})
            console.log("llego aca");
        },
        async cargarArchivo(event) {
            let file = event.target.files[0];
            const filesTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
            if (filesTypes.includes(file.type)) {
                const formData = new FormData();
                formData.append("img", file);
                const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/img/updateLinkPerfil', {
                    method: 'POST',
                    headers: { 'auth-token': localStorage.getItem('token') },
                    body: formData
                })
                const { data, error } = await res.json()
                console.log("llego aca");
                if (error) {
                    console.log(error);
                    return
                }
                localStorage.setItem("linkPerfil", data)


            }
            window.location.reload()
        },
        async enviarSolicitud() {
            console.log(this.solicitud.linkTitulos);
            const filesTypes = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf'];
            if (filesTypes.includes(this.solicitud.linkTitulos.type)) {
                const formData = new FormData();
                formData.append("archivo", this.solicitud.linkTitulos);
                formData.append("lugarExp", this.solicitud.lugarExp);
                formData.append("mesesExp", this.solicitud.mesesExp);
                formData.append("descripcion", this.solicitud.descripcion);
                const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/solicitud/', {
                    method: 'POST',
                    headers: {
                        'auth-token': localStorage.getItem('token')
                    },
                    body: formData
                })
                const { data, error } = await res.json()
                this.dialog_solicitud = false
                if (error) {
                    console.log(error);
                    return
                }
                if (error == "solicitud en proceso") {
                    this.$root.vtoast.show({ message: 'solicitud en proceso' })
                    return
                }
                this.dialog_solicitud = false
                this.$root.vtoast.show({ message: 'solicitud enviada' })
            } else {
                this.$root.vtoast.show({ message: 'formato no soportado' })
            }
        }
    },
}
</script>
<style scoped>
.text {
    font-weight: bold !important;

}

.item_sub_text {
    #border: 5px solid purple;
    padding: 0.5rem;
    margin-bottom: 1rem !important;
}

.sub_txt {


    #border: 5px solid purple;
    font-size: 1rem !important;
    #margin-bottom: 2rem;
}


.salir_item {
    #border: 5px solid purple;
    position: absolute;
    #bottom: 0 !important;
    height: 34vh;
    display: flex;
    align-items: flex-end;

}

.card_informacion {
    #border: 5px solid red !important;
}

.container_post {
    margin: 0 !important;
    padding: 0 !important;
    #border: 5px solid red !important;
    height: 100vh;
    margin-bottom: 1rem !important;
    background-color: white !important;

}

.card_post {
    margin-bottom: 0.5rem;
    height: 749px !important;
    overflow: auto;
}

main {
    padding: 1rem 1rem 0rem 1rem;
    #border: 5px solid red !important;
    background-color: rgb(243, 243, 243);
    margin-bottom: 1rem;
}

main section {
    #border: 5px solid black !important;
}

.title_post {
    display: flex;
    #border: 5px solid purple !important;
}

.img_post {
    width: 45px;
    height: 45px;
    #border: 5px solid purple !important;
    border-radius: 50%;
    object-fit: cover !important;
    border: 2px solid white;
}

.icon_post {
    display: flex;
    justify-content: space-around;
}
</style>