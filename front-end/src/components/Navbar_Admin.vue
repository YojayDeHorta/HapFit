<template>
    <div>
        <v-card height="100vh" width="256" class="mr-auto">
            <v-navigation-drawer permanent style='background: linear-gradient(180deg, #E42256 0%, #FF8370 100%);color:white !important'>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="text-h6 mb-2" style='display:flex;align-items:center'>
                            <img src="@/assets/asuka.jpg" style='width:80px;height:80px;border-radius:50%;border:1px solid black' alt="">
                            &nbsp;&nbsp;&nbsp;
                            <small style='position:relative;#top:1rem;color:white'>
                                Administrador
                            </small>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <br>
                <v-list dense nav>
                    <v-list-item  link style='color:white !important;margin-bottom:1.2rem !important'>
                        <v-list-item-icon>
                            <v-icon style='color:white'>mdi-account-circle-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Perfil</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item  link style='color:white !important;margin-bottom:1.2rem !important'>
                        <v-list-item-icon>
                            <v-icon style='color:white'>mdi-book-information-variant</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Solicitudes</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item  link style='color:white !important;margin-bottom:1.2rem !important'>
                        <v-list-item-icon>
                            <v-icon style='color:white'>mdi-microsoft-xbox-controller-menu</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Opciones</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="cerrarSesion()" link style='color:white !important;margin-bottom:1.2rem !important'>
                        <v-list-item-icon>
                            <v-icon style='color:white'>mdi-exit-to-app</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Salir</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-card>
    </div>
</template>
<style type="text/css" scoped>
</style>
<script>
export default {
    data() {
        return {
            items: [
                { title: 'Perfil', icon: 'mdi-account-circle-outline' },
                { title: 'Solicitudes', icon: 'mdi-book-information-variant' },
                { title: 'Opciones', icon: 'mdi-microsoft-xbox-controller-menu' },
                { title: 'Salir', icon: 'mdi-exit-to-app' },
            ],
            right: null,
        }
    },
    methods: {
        cerrarSesion() {
            localStorage.clear()
            this.$router.push("/login_admin")
            // this.$router.push({ name: "inicio"})
        },
    },
}
</script>