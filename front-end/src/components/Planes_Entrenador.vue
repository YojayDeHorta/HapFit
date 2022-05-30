<template>
    <v-container class='container' style='padding: 0;'>
        <div style='padding: 0;'>
            <v-app-bar class='app' dense scroll-target="#scrolling-techniques-7" absolute elevation='0'>
                <v-app-bar-nav-icon>
                    <v-btn class='btn_flecha' to='/perfil_entrenador' elevation='0' dark>
                        <v-icon>
                            mdi-arrow-left-thick
                        </v-icon>
                    </v-btn>
                </v-app-bar-nav-icon>
            </v-app-bar>
            <v-container style='height: 90vh;background: linear-gradient(180deg, #E42256 0%, rgba(228, 34, 86, 0) 100%);'>
              <br><br>
                <v-container class='container_contenido mt-5'>
                  <main v-for='i in 8' :key='i'>
                    <v-card style='margin-bottom:2rem;padding: 1rem;'>
                      <h2>Ayuda Basica</h2>
                      <h4 class='mt-3'>Descripcion Basica</h4>
                      <p style='text-align: end;'><strong>$ 50.000</strong></p>
                    </v-card>
                  </main>
                    
                </v-container>
              
                <div class="text-center">
                    <v-dialog v-model="dialog" width="500">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class='btn_modal' dark v-bind="attrs" v-on="on" fab dark x-large>
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
}
.btn_modal {
    position: fixed;
    #top: 45rem !important;
    #left: 9rem;
    top: 45rem;
    left: 19rem;
    background-color: rgb(228, 52, 99) !important;
}
.btn_registro {
    border: 2px solid rgb(228, 34, 86) !important;
    color: rgb(228, 34, 86) !important;
    width: 80% !important;
    background-color: white !important;
    font-size: 1.5rem;
    position: relative;
    #left: 1.5rem;
}
.container_contenido {
  position: relative;
    #border: 5px solid blue !important;
    overflow: auto;
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