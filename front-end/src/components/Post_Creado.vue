<template>
    <v-container class='container_post mb-5' style=''>
        <v-card class='card_post mb-5' style='#border:5px solid black !important;#padding-bottom:56rem !important' elevation='0'>
            <main v-for='i in 5' :key="i"  class='mb-5' elevation='2'>
                <section class='title_post'>
                    <img class='img_post' src="@/assets/asuka.jpg" alt="" style=''>
                    <p style='padding-left: 1rem;'>
                        Nombre Generico <br>
                        <small>2 m</small>
                    </p>
                </section>
                <section class='text-center mt-5'>
                    <img src="https://www.cambiatufisico.com/wp-content/uploads/pesas-para-mujeres-696x464.jpg" alt="" style='width: 95% !important;'>
                </section>
                <section class='icon_post mt-2'>
                    <p>
                        <v-icon style='color:red !important'>mdi-cards-heart-outline</v-icon> 
                    </p>
                    <p>
                           <modal_comments>5</modal_comments>
                   
                    </p>
                </section>
            </main>
            <br>
        </v-card>
    </v-container>
</template>
<style scoped>

.container_post{
    margin: 0 !important;
    padding: 0 !important;
    #border: 5px solid red !important;
    height: 100vh;
    margin-bottom: 1rem !important;
    background-color: white !important;

}

.card_post{
    margin-bottom: 0.5rem;
       height: 605px !important;
           overflow: auto;
}

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
</style>
<script>
import modal_comments from '../components/Modal_comments'
export default{
    components:{
        modal_comments
    }
}
</script>