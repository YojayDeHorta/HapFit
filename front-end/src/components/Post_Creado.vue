<template>
    <v-container class='container_post mb-5' style=''>
        <v-card class='card_post mb-5' style='#border:5px solid black !important;#padding-bottom:56rem !important' elevation='0'>
            <main v-for='(publicacion,index) in post' :key="publicacion.idPublicacion" class='mb-5' elevation='2'>
                <section class='title_post'>
                    <img class='img_post' :src="publicacion.linkPerfil" alt="" style=''>
                    <p style='padding-left: 1rem;'>
                        {{publicacion.nombre}}
                        <!-- <br><small>2 m</small> -->
                    </p>
                </section>
                <section class='text-left mt-5'>
                    <p>{{publicacion.descripcion}} </p>
                </section>
                <section class='icon_post mt-2'>
                    <p style='display: flex;'>
                        <small> {{publicacion.likes}} </small>
                        &nbsp;
                        <v-checkbox @click="cambiarCorazon(publicacion.idPublicacion,index)" v-model="publicacion.liked" style='margin: 0;padding: 0;' :on-icon="'mdi-heart'" :off-icon="'mdi-heart'" >
                        </v-checkbox>
                    </p>
                    <p>
                        <modal_comments :idPublicacion="publicacion.idPublicacion"></modal_comments>
                    </p>
                </section>
            </main>
            <br>
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
            post: []
        }
    },
    created() {
        this.getPost()
    },
    methods: {
        async getPost() {

            const res = await fetch('http://localhost:3500/api/post/user', {
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
        async cambiarCorazon(idPublicacion, index) {
            this.post[index].liked = !this.post[index].liked

            const res = await fetch('http://localhost:3500/api/post/setlikes', {
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
    height: 100vh;
    margin-bottom: 1rem !important;
    background-color: white !important;

}

.card_post {
    margin-bottom: 0.5rem;
    height: 605px !important;
    overflow: auto;
}

main {
    padding: 1rem;
    /* #border: 5px solid red !important; */
    background-color: rgb(243, 243, 243);
    margin-bottom: 1rem;
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