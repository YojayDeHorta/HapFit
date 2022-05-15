<template>
    <v-card-text style='height:100vh;overflow: auto;padding: 4rem 1rem 5em 1rem;'>
        <main class='mb-5 mt-5' v-for='(publicacion,index) in post' :key="publicacion.idPublicacion" >
            <section class='title_post'>
                <img class='img_post' :src="publicacion.linkPerfil" alt="" style=''>
                <p style='padding-left: 1rem;'>
                    {{publicacion.nombre}}  <br>
                    <small>2 m</small>
                </p>
            </section>
            <section class='text-left mt-5'>
                <p>{{publicacion.descripcion}} </p>
            </section>
            <!-- <section class='text-center mt-5'>
                <img src="https://www.cambiatufisico.com/wp-content/uploads/pesas-para-mujeres-696x464.jpg" alt="" style='width:100% !important;'>
            </section> -->
            <section class='icon_post mt-2'>
                {{publicacion.likes}} 
                <v-checkbox  @click="cambiarCorazon(publicacion.idPublicacion,index)" v-model="publicacion.liked" style='margin: 0;padding: 0;' :on-icon="'mdi-heart'" :off-icon="'mdi-heart'">
                </v-checkbox>
                <p>
                    <modal_comments :idPublicacion="publicacion.idPublicacion"></modal_comments>
                </p>
            </section>
        </main>
    </v-card-text>
</template>
<script>
import modal_comments from './Modal_comments.vue'
import Post_Creado from './Post_Creado.vue'

export default {
    data() {
        return {
            drawer: false,
            group: null,
            post:[],
            usuario:{
                    nombre:'',
                    linkPerfil:'',
                    rol:''
            },
        }
    },

    watch: {
        group() {
            this.drawer = false
        },
    },
    created() {
        this.usuario.nombre=localStorage.getItem('nombre')
        this.usuario.linkPerfil=localStorage.getItem('linkPerfil')
        this.usuario.rol=localStorage.getItem('rol')
        this.getPost()
    },
    components: {
        modal_comments,
        Post_Creado
    },
    methods: {
        async getPost(){

            const res = await fetch('http://localhost:3500/api/post/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
                }
            })
            const {data, error} = await res.json()
            if(error) {
                console.log(error);
                return 
            }
            this.post=data
            console.log(data);    

            
        },
        async cambiarCorazon(idPublicacion,index){
            this.post[index].liked=!this.post[index].liked 
            const res = await fetch('http://localhost:3500/api/post/setlikes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
                },
            body: JSON.stringify({idPublicacion})
            })
            const {data, error} = await res.json()
            if(error) {
                console.log(error);
                return 
            }         
            
            this.getPost()
            
        },
        cerrarSesion(){

            localStorage.clear()
            // this.$router.push({ name: "inicio"})
            console.log("llego aca");
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
