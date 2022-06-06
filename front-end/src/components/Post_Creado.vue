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
        <v-select class='select_rutina' style='text-transform: capitalize !important;' :items="rutinas" v-model="rutina" item-text="nombre" item-value="idRutina" label="seleccione la rutina" outlined></v-select>
        <!-- <v-btn  @click="publicarPost()">
            compartir rutina
        </v-btn> -->
        <h3 style='text-transform: capitalize;'>tus post</h3>
        <br>
        <v-card class='card_post mb-5' elevation='3'>
            <div v-if="loading" class="d-flex  justify-center mb-10 ">
                <v-progress-circular :size="70" :width="7" color="red" indeterminate></v-progress-circular>
                <h3 class="mt-5 ml-5">Cargando Publicaciones...</h3>
            </div>
        </v-card>
        <v-card v-for='(publicacion,index) in post' :key="publicacion.idPublicacion" class='card_post mb-5' elevation='3'>
            <main elevation='4'>
                <section class='title_post'>
                    <img class='img_post' :src="publicacion.linkPerfil" alt="" style=''>&nbsp;&nbsp;
                    <section style='#border:5px solid red;width:100%;display:flex;justify-content:space-between'>
                        <p style='margin-right: 2rem'>
                            {{publicacion.nombre}}
                        </p>
                        <!--
                        <modal_perfil>
                            <small style='color:white !important'>
                                 sdfsfdsadf
                            </small>
                           
                            <p style='padding-left: 1rem;color:white'>
                                
                            </p>
                        </modal_perfil>
                    -->
                        <v-btn class='btn_close' @click="borrarPost(publicacion.idPublicacion)" plain>
                            <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                    </section>
                </section>
                <section class='text-left mt-5'>
                    <p>{{publicacion.descripcion}} </p>
                    <!-- rutinas -->
                    <v-card style='padding: 1rem;display: flex;justify-content: flex-start;background-color: #FEC84D20;' elevation='1'>
                        <v-icon>
                            mdi-weight-lifter
                        </v-icon>
                        &nbsp;&nbsp;&nbsp;
                        <h4 v-if="publicacion.Rutinas_idtable1" @click="goRutinasEntrenador(publicacion.Rutinas_idtable1)" style='text-transform: capitalize;'>{{publicacion.nombreRutina}}</h4>
                    </v-card>
                    <!-- <h1 v-if="publicacion.Rutinas_idtable1" @click="goRutinasEntrenador(publicacion.Rutinas_idtable1)">{{publicacion.nombreRutina}}</h1> -->
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
        <v-card class='card_post mb-5' elevation='3'>
            <div v-if="!loading&&!post[0]" class="d-flex  justify-center mb-10 ">
                <h4 class="mt-5 ml-5" style='text-transform: capitalize;'>no has creado ninguna publicacion</h4>
            </div>
        </v-card>
    </v-container>
</template>
<script>
import modal_comments from '../components/Modal_comments'



export default {
    components: {
        modal_comments

    },
    data() {
        return {
            post: [],
            descripcion: '',
            loading: false,
            rutinas: [],
            rutina: null
        }
    },
    created() {
        this.getPost()
    },
    methods: {
        async getPost() {
            this.post = []
            this.loading = true
            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/post/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            this.loading = false
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }
            this.post = data
            this.getRutinas()
        },
        async publicarPost() {
            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/post/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ descripcion: this.descripcion, idRutina: this.rutina })
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
            this.$root.vtoast.show({ message: 'borrado exitosamente!' })
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

        },
        async getRutinas() {
            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/routine/get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            const { data, error } = await res.json()
            if (error) {
                this.rutinas = []
                console.log(error);
                return
            }
            this.rutinas.push({
                idRutina: null,
                nombre: "sin rutina"
            })
            data.forEach(element =>
                this.rutinas.push(element)
            );
            // this.rutinas = data

        },
        goRutinasEntrenador(idRutina) {
            this.$router.push("/rutinas_entrenador/" + idRutina)
        }
    },
}
</script>
<style scoped>


    .select_rutina{
        text-transform: capitalize !important;
    }


    .v-select{
        text-transform: capitalize !important;
    }


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