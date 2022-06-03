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
                    <v-list-item v-for="item in items" :key="item.title" link style='color:white !important;margin-bottom:1.2rem !important'>
                        <v-list-item-icon>
                            <v-icon style='color:white'>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
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
}
</script>