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
                            <v-list-item-title> <img :src="usuario.linkPerfil" alt="" style='width: 150px;height: 150px;border-radius: 50%;object-fit: cover;'></v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title class='text' style='text-align: center;font-size:1.1rem'>{{usuario.nombre}}</v-list-item-title>
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
                        <v-list-item v-if="usuario.rol=='cliente'">
                            <v-list-item-title>
                                <v-icon>
                                    mdi-license
                                </v-icon>&nbsp;
                                <strong>Ser Entrenador</strong>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item class='item_sub_text' v-if="usuario.rol=='entrenador'">
                            <v-list-item-title class='text sub_txt'>
                                <v-icon>
                                    mdi-bookmark-box-multiple
                                </v-icon>&nbsp;
                                <strong>Planes</strong>
                            </v-list-item-title>
                        </v-list-item><br>
                        
                        <v-container class='salir_item mt-5'  @click="cerrarSesion()" fluid>
                            <v-list-item class='item_sub_text' >
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
            <!-- este es el pedazo de las publicaciones en la pagina de inicio -->
           <Post_inicio/>
        </v-card>
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
    },
    components: {
        modal_comments,
        Post_Creado,
        Post_inicio
    },
    methods: {
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
