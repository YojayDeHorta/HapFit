<template>
    <v-container class='container' fluid>
        
        <v-app-bar class='app' elevation='0' fluid>
            <v-app-bar-nav-icon>
                <v-btn class='btn_flecha' to='/perfil' elevation='0' dark>
                    <v-icon>
                        mdi-arrow-left-thick
                    </v-icon>
                </v-btn>
            </v-app-bar-nav-icon>
        </v-app-bar>
        <div class='Contenido_Card mt-5'>
            <v-card class='card' v-for='i in 20' :key='i'>
                <main>
                    <h2>Ayuda Basica</h2>
                    <h4 class='mt-3'>Descripcion Basica</h4>
                    <p style='text-align: end;'><strong>$ 50.000</strong></p>
                </main>
            </v-card>
        </div>
        <div class="text-center">
            <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class='btn_modal' dark v-bind="attrs" v-on="on" fab>
                        <v-icon>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                        Nuevo Plan
                    </v-card-title>
                    <v-card-text>
                        <br><br>
                        <v-text-field label="Nombre" outlined filled></v-text-field>
                        <v-text-field label="Precio" outlined filled></v-text-field>
                        <v-textarea filled name="input-7-4" label="Comentarios"></v-textarea>
                        <v-btn class='btn_registro' block rounded x-large>
                            Guardar
                        </v-btn>
                        <br>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="dialog = false">
                            Close
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>

    </v-container>
</template>
<style scoped>
* {
    padding: 0;
    margin: 0;
}

.container {
    height: 100vh;
    padding-bottom: 5rem;
    background: linear-gradient(180deg, #E42256 0%, rgba(228, 34, 86, 0) 100%) !important;

}

.btn_flecha {
    background-color: transparent !important;
}

.app {
    background-color: rgb(228, 52, 99) !important;

}


.Contenido_Card {
    #border: 5px solid purple;
    #background: linear-gradient(180deg, #E42256 0%, rgba(228, 34, 86, 0) 100%) !important;
    height: 700px;
    width: 95%;
    margin: auto;
    overflow: auto;
}


.card {
    padding: 1rem;
    margin-bottom: 1rem;
}

.btn_modal {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background-color: #E42256 !important;
}

.btn_registro {
    border: 2px solid rgb(228, 34, 86) !important;
    width: 80% !important;
    background-color: white !important;
    font-size: 1.3rem;
    position: relative;
    #left: 1.5rem;
    color: #E42256 !important;
}
</style>
<script>
export default {
    data() {
        return {
            dialog: false,
        }
    },
}
</script>