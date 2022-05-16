<template>
    <v-container>
        <v-row justify="center">
            <v-dialog v-model="dialog" width="600px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn style='background-color:transparent;color:black' dark v-bind="attrs" v-on="on" elevation='0'>
                        {{comentarios.length}}&nbsp;
                        <v-icon>mdi-comment-multiple-outline</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class='mb-5'>
                        <span style='margin: auto;' class="text-h5 mt-5">Comentarios</span>
                    </v-card-title>
                    <v-card-text scrollable>
                        <main v-for='comentario in comentarios' :key="comentario.idComentario" class='mb-5' elevation='2'>
                            <section class='title_post'>
                                <img class='img_post' :src="comentario.linkPerfil" alt="" style=''>
                                <p style='padding-left: 1rem;display:flex;justify-content: space-between;width:100%'>
                                    <small>{{comentario.nombre}}</small>
                                    <v-btn class='btn_close' v-if="idUsuario==comentario.Usuario_idUsuario" @click="deleteComentario(comentario.idComentario)" plain ><v-icon>mdi-close-circle</v-icon></v-btn>
                                </p>
                            </section>
                            <section class='icon_post mt-2'>
                                <p class='text-justify'>
                                    {{comentario.descripcion}}
                                </p>
                            </section>
                        </main>
                        <hr> <br>
                        <section style='display:flex;justify-content:space-around'>
                            <v-text-field placeholder="Ingresa Tu Comentario" v-model="textoComentario" class='comments' filled rounded dense></v-text-field>
                            <v-btn @click="setComentarios()" plain>
                                <v-icon>mdi-send</v-icon>
                            </v-btn>
                        </section>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            dialog: false,
            idUsuario: null,
            comentarios: [],
            textoComentario: '',
            descripcion:'',
        }
    },
    props: {
        idPublicacion: null
    },
    created() {
        this.getComentarios()
        this.idUsuario = localStorage.getItem('idUsuario')
    },
    methods: {
        async getComentarios() {
            const res = await fetch(process.env.VUE_APP_BASE_URL+'/api/post/comentarios/' + this.idPublicacion, {
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
            this.comentarios = data

        },
        async setComentarios() {
            const res = await fetch(process.env.VUE_APP_BASE_URL+'/api/post/comentarios/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ idPublicacion: this.idPublicacion, descripcion: this.textoComentario })
            })
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }
            this.textoComentario = ''
            this.getComentarios()

        },
        async deleteComentario(idComentario) {
            const res = await fetch(process.env.VUE_APP_BASE_URL+'/api/post/comentarios/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ idComentario })
            })
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }
            this.getComentarios()

        }
    },
}
</script>
<style scoped>
main {
    padding: 1rem;
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

.title_post img {
    width: 45px;
    height: 45px;
    #border: 5px solid purple;
    border-radius: 50%;
    object-fit: cover !important;
    border: 2px solid white;
}


.icon_post {
    display: flex;
    justify-content: space-around;
}

.btn_close{
    position:relative;
    left:10%;
    margin:0 !important;
    #padding:0 !important;
}

</style>