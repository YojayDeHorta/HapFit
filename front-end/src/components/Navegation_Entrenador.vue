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
                            <v-list-item-title> <img src="@/assets/entrenador_baki.jpg" alt="" style='width: 150px;height: 150px;border-radius: 50%;object-fit: cover;'></v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title class='text' style='text-align: center;font-size:1.1rem'>Entrenador Generico</v-list-item-title>
                        </v-list-item>
                        <hr><br>
                        <v-list-item class='item_sub_text'>
                            <v-list-item-title class='text sub_txt'>
                                <v-btn to='/rutinas_entrenador'>
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
                        <v-list-item class='item_sub_text' to='/planes_entrenador'>
                            <v-list-item-title class='text sub_txt'>
                                <v-icon>
                                    mdi-bookmark-box-multiple
                                </v-icon>&nbsp;
                                <strong>Planes</strong>
                            </v-list-item-title>
                        </v-list-item><br>
                        <v-container class='salir_item mt-5' fluid>
                            <v-list-item class='item_sub_text'>
                                <v-list-item-title class='text' style='font-size: 1.4rem;'>
                                    <v-btn to='/' style='background-color: transparent;'>
                                        <v-icon>
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
            <v-card-text style='height:100vh;overflow: auto;padding: 4rem 1rem 5em 1rem;'>
                <main class='mb-5 mt-5' v-for='i in 5' :key='i'>
                    <section class='title_post'>
                        <img class='img_post' src="@/assets/asuka.jpg" alt="" style=''>
                        <p style='padding-left: 1rem;'>
                            Nombre Generico <br>
                            <small>2 m</small>
                        </p>
                    </section>
                    <section class='text-center mt-5'>
                        <img src="https://www.cambiatufisico.com/wp-content/uploads/pesas-para-mujeres-696x464.jpg" alt="" style='width:100% !important;'>
                    </section>
                    <section class='icon_post mt-2'>
                        <v-checkbox style='margin: 0;padding: 0;' :on-icon="'mdi-heart'" :off-icon="'mdi-heart'">
                        </v-checkbox>
                        <p>
                            <modal_comments>5</modal_comments>
                        </p>
                    </section>
                </main>
            </v-card-text>
        </v-card>
    </v-container>
</template>
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
<script>
import modal_comments from '../components/Modal_comments.vue'


export default {
    data: () => ({
        drawer: false,
        group: null,
    }),

    watch: {
        group() {
            this.drawer = false
        },
    },
    components: {
        modal_comments
    }
}
</script>