<template>
    <v-container class='container' style='padding: 0;background: linear-gradient(180deg, #E42256 0%, rgba(228, 34, 86, 0) 100%) !important;'>
        <div style='padding: 0;'>
            <v-app-bar class='app' elevation='0'>
                <v-app-bar-nav-icon>
                    <v-btn class='btn_flecha' to='/perfil_entrenador' elevation='0' dark>
                        <v-icon>
                            mdi-arrow-left-thick
                        </v-icon>
                    </v-btn>
                </v-app-bar-nav-icon>
            </v-app-bar>
            <div class='container_Rutinas' style='padding: 0rem;'>
                <v-card class='card_rutinas' elevation='1' style='border-radius: 0;padding: 0 !important;'>
                    <h1>Tren Inferior</h1>
                    <main>
                        <section>
                            <img src="@/assets/sentadilla_frontal.jpg" alt="" width="100%">
                        </section>
                        <section>
                            <h2 class='text-center mt-2 mb-5'>Sentadilla Frontal</h2>
                        </section>
                        <section>
                            <p class='mt-5 mb-2' style='display:flex;justify-content:space-around;'>
                                <small class='small_txt' style='color:#E42256'>15 Resps</small>
                                <small class='small_txt' style='color:#FEC84D'>10 Sets</small>
                                <small class='small_txt' style='color:#00B1B0'>1 Min</small>
                            </p>
                        </section>
                        <section>
                            <p class='text-center p-0' style='margin:0 !important;padding:1rem'>
                                Lorem, ipsum dolor sit amet consectetur adipisicing, elit. Magni asperiores dolores cum harum nostrum.
                            </p>
                        </section>
                    </main>
                    <main>
                        <section>
                            <img src="@/assets/zancadas.jpg" alt="" width="100%">
                        </section>
                        <section>
                            <h2 class='text-center mt-2 mb-5'>Zancadas</h2>
                        </section>
                        <section>
                            <p class='mt-5 mb-2' style='display:flex;justify-content:space-around;'>
                                <small class='small_txt' style='color:#E42256'>20 Resps</small>
                                <small class='small_txt' style='color:#FEC84D'>10 Sets</small>
                                <small class='small_txt' style='color:#00B1B0'>0 Min</small>
                            </p>
                        </section>
                        <section>
                            <p class='text-center p-0' style='margin:0 !important;padding:1rem'>
                                Lorem, ipsum dolor sit amet consectetur adipisicing, elit. Magni asperiores dolores cum harum nostrum.
                            </p>
                        </section>
                    </main>
                </v-card>
            </div>
        </div>
    </v-container>
</template>
<style scoped>
.btn_flecha {
    background-color: transparent !important;
}

.app {
    #border: 5px solid red !important;
    background-color: rgb(228, 52, 99) !important;
    margin: 0 !important;

}

.container_Rutinas {
    position: relative;
    #top: -1.2rem;
    #border: 5px solid red !important;
    height: 800px;
    overflow: auto;
    margin: 0 !important;
    
}

h1 {
    background-color: rgb(228, 52, 99) !important;
    color: white;
    text-align: center;
    padding: 0.6rem;
}

.card_rutinas {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: rgb(228, 52, 99) !important;
}

.card_rutinas main {
    background-color: white !important;
    margin-bottom: 1rem;
    #margin-top: 1rem;
}

small {
    font-size: 1.2rem !important;
}


.btn_modal {
    background-color: rgb(228, 34, 86) !important;
}


.btn_registro {
    border: 2px solid rgb(228, 34, 86) !important;
    color: rgb(228, 34, 86) !important;
    width: 80% !important;
    background-color: white !important;
    font-size: 1.5rem;
    position: relative;
    top: 1rem;
}

form main {
    border: 5px solid red;
}

form section {
    border: 4px solid black;
}

</style>
<script>

   



export default {
    data() {
        return {
            dialog: false,
        }
    },
    components:{
       
    }
}
</script>