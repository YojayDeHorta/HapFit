<template>
<div>
    <v-card v-for='(publicacion,index) in post' :key="publicacion.idPublicacion"  class='card_post mb-5' elevation='3'>
        <main elevation='4'>
            <section class='title_post'>
                <img class='img_post' :src="publicacion.linkPerfil" alt="" style=''>&nbsp;&nbsp;&nbsp; &nbsp; 
                <section style='#border:5px solid red;width:100%;display:flex;justify-content:space-between;position:relative;left:1rem !important'>
                    <p style='margin-right: 2rem'>
                        {{publicacion.nombre}}
                    </p>
                    
                
                    <v-btn class='btn_close' @click="borrarPost(publicacion.idPublicacion)" plain>
                        <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                </section>
            </section>
            <section class='text-left mt-5'>
                <p>{{publicacion.descripcion}} </p>
                 <v-card @click="goRutinasEntrenador(publicacion.Rutinas_idtable1)" v-if="publicacion.Rutinas_idtable1" style='padding: 1rem;display: flex;justify-content: flex-start;background-color: #FEC84D20;' elevation='1'>
                        <v-icon>
                            mdi-weight-lifter
                        </v-icon>
                        &nbsp;&nbsp;&nbsp;
                        <h4   style='text-transform: capitalize;'>{{publicacion.nombreRutina}}</h4>
                    </v-card>
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
    <div v-if="loading" class="d-flex  justify-center mb-10 ">
        <v-progress-circular :size="70" :width="7" color="red"  indeterminate ></v-progress-circular>
        <h3 class="mt-5 ml-5">cargando publicaciones...</h3> 
    </div>
    <v-card class="d-flex  justify-center mb-10 " v-if="post.length==0 && loading==false">
        <h3 >este usuario no tiene publicaciones</h3>
    </v-card>
    </div>
</template>
<script>
import modal_comments from './Modal_comments.vue'

export default {
    components:{
        modal_comments
    },
    data() {
        return {
            post: [],
            descripcion: '',
            loading:false,
        }
    },
    props: {
        idUsuario: null
    },
    watch: {
        // cada vez que la pregunta cambie, esta función será ejecutada
         idUsuario:function(val)  {
            this.post=[]
            this.getPost()
        }
    },
    created() {
        this.getPost()
    },
    methods: {
        async getPost() {
            this.loading=true
            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/post/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')

                },
                body: JSON.stringify({ idUsuario: this.idUsuario })

            })
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }
            this.post = data
            this.loading=false


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
        goRutinasEntrenador(idRutina) {
            this.$router.push("/rutinas_entrenador/" + idRutina)
        }
    },
}
</script>
<style scoped>

.card_post{
    padding:1rem;
    width:90%;
    margin:auto;
    background-color:rgb(249, 249, 249);
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
}
</style>