<template>
    <v-container style='#border:5px solid purple !important'>
        <v-row justify="center">
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class='' v-bind="attrs" v-on="on" fab style='background-color:#E42256;position:absolute;right:0 '>
                        <v-icon style='color:white !important'>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-toolbar dark color="primary" style='background-color: #E42256 !important;'>
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-arrow-left-thick</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-list three-line subheader style='background: linear-gradient(180deg, #E42256 0%, rgba(228, 34, 86, 0) 100%);'>
                        <v-list-item>
                            <v-list-item-content>
                                <main class='add_input' style='width: 100%; #border:5px solid red !important'>
                                    <input type="text" placeholder="nombre de la rutina" style='background-color: rgb(255, 255, 255);width: 80%;'>
                                    <v-btn class="ml-1" light>
                                        guardar
                                        <v-icon style='color:#E42256 !important'>
                                            mdi-content-save
                                        </v-icon>
                                    </v-btn>
                                </main>
                                <br><br><br>
                                <v-tabs next-icon="mdi-arrow-right-bold-box-outline" style='background-color:#E42256 !important;#border:5px solid black !important' prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
                                    <v-tab>crear ejercicio</v-tab>
                                    <v-tab>ejercicios guardados</v-tab>
                                    <v-tab>banco publico</v-tab>
                                    <v-tab-item class='contenido_tabs'>
                                        <main>
                                            <v-card class='tarjeta' id='card_ejercisio_1'>
                                                <section class="mb-2" style="padding:0;heigh:25px !important">
                                                    <v-text-field label="Nombre del ejercicio" v-model="ejercicio.nombre" outlined style='#border:5px solid black !important;height:55px !important'></v-text-field>
                                                </section>
                                                <br>
                                                <section style="padding:0;#heigh:25px !important">
                                                    <v-row>
                                                        <v-col cols="6">
                                                            <v-select :items="items" item-text="nombre" label="musculo" v-model="ejercicio.idMusculo" item-value="idMusculo" outlined></v-select>
                                                        </v-col>
                                                        <v-col cols="6">
                                                            <v-file-input truncate-length="50" v-model="ejercicio.gif" label="Gif"></v-file-input>
                                                        </v-col>
                                                    </v-row>
                                                </section>
                                                <section style='width:70%;margin:0 !important'>
                                                    <v-checkbox v-model="checkbox.repeticiones" @click.stop="checkbox.tiempo=false"></v-checkbox>
                                                    Repeticiones
                                                    <v-checkbox v-model="checkbox.tiempo" @click.stop="checkbox.repeticiones=false"></v-checkbox>
                                                    tiempo
                                                </section>
                                                <section style='#border:4px solid red !important;padding:0 !important'>
                                                    <v-row>
                                                        <v-col cols="6">
                                                            <v-text-field label="Sets" v-model="ejercicio.sets" type="number" outlined style='#border:5px solid black !important;height:55px !important'></v-text-field>
                                                        </v-col>
                                                        <v-col cols="6">
                                                            <v-text-field label="Repeticiones" v-if="checkbox.repeticiones" v-model="ejercicio.repeticiones" type="number" outlined style='#border:5px solid black !important;height:55px !important'></v-text-field>
                                                            <v-text-field label="Tiempo en segundos" v-if="checkbox.tiempo" outlined v-model="ejercicio.tiempo" type="number" style='#border:5px solid black !important;height:55px !important'></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </section>
                                                <br><br>
                                                <section style='padding:0 !important;height:55px !important'>
                                                    <v-text-field label="Descanso" outlined class='text_field' type="number" v-model="ejercicio.descanso" style='width:40% !important'></v-text-field>
                                                    <v-spacer></v-spacer>
                                                    <p style='padding-left:0.7rem'>
                                                        segundos
                                                    </p>
                                                    <!-- <v-select :items="repeticion_m" placeholder="Segundos" outlined class='text_field' style='width:30% !important'></v-select> -->
                                                </section>
                                                <br>
                                                <section style='width:100%;padding:0 !important'>
                                                    <v-textarea name="input-7-4" placeholder="Descripcion del ejercicio" v-model="ejercicio.descripcion" height='80px' outlined></v-textarea>
                                                </section>
                                                <section>
                                                    <v-select :items="visibilidad" item-text="texto" label="visibilidad" v-model="ejercicio.publico" item-value="id" outlined></v-select>
                                                </section>
                                                <section class='text-center'>
                                                    <v-btn @click="guardarEjercicio()" style='background: #FFFFFF;border: 3px solid #E42256;box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);border-radius:1rem;position: relative;left: 2rem;height: 3rem;' plain>
                                                        <h3>
                                                            Guardar ejercicio
                                                        </h3>
                                                    </v-btn>
                                                </section>
                                            </v-card>
                                        </main>
                                    </v-tab-item>
                                    <!-- elegir ejercicios-->
                                    <v-tab-item class='contenido_tabs'>
                                        <!-- aca ander -->
                                        <v-card class="mx-auto" v-for="ejercicio in ejercicios" :key="ejercicio.idEjercicio" max-width="344" style='padding: 0 !important;margin-top: 1rem;margin-bottom: 1rem;'>
                                            <v-list-item three-line style='padding: 0 !important;'>
                                                <!--
                                                <v-list-item-content>
                                                    <div class="text-overline" style="width: 100%;"><strong style="font-size: 1.3em;"> {{ejercicio.nombre}}</strong></div>
                                                </v-list-item-content>
                                            -->
                                                <v-list-item-avatar tile size='width:100%' style='padding: 0 !important;margin: 0 !important;display: flex;flex-direction: column;'>
                                                    <v-img :src="ejercicio.linkEjercicio" style='width: 100%;border: 5px solid white;'></v-img>
                                                    <div class="text-overline mt-3" style="width: 100%;"><strong style="font-size: 1.3em;"> {{ejercicio.nombre}}</strong></div>
                                                </v-list-item-avatar>
                                            </v-list-item>
                                            <v-list-item-content class="px-4" style='margin: 0;padding: 0;'>
                                                <main class='mt-1 mb-3' style='display: flex;justify-content: space-between;#border: 2px solid red;'>
                                                    <v-list-item-subtitle class="mt-2" style='text-transform:capitalize;color:#E42256;font-size: 1.2rem;padding: 0;text-align: center;'>rep: {{ejercicio.repeticiones}}</v-list-item-subtitle>
                                                    <v-list-item-subtitle class="mt-2" style='text-transform:capitalize;color:#FEC84D;font-size: 1.2rem;padding: 0;text-align: center;'>sets: {{ejercicio.sets}}</v-list-item-subtitle>
                                                    <v-list-item-subtitle class="mt-2" style='text-transform:capitalize;color:#00B1B0;font-size: 1.2rem;padding: 0;text-align: center;'>seg: {{ejercicio.tiempo}}</v-list-item-subtitle>
                                                    <!--
                                                    <v-list-item-subtitle class="mt-2" style='text-transform:capitalize;'>desc: {{ejercicio.descanso}}</v-list-item-subtitle>
                                                -->
                                                </main>
                                                <v-list-item-subtitle class="mt-2 mb-2 text-center" style='font-size: 1rem;#border: 5px solid black;padding: 0.5rem;height: 5rem;'> <strong>Descripcion</strong>
                                                    <br>
                                                    {{ejercicio.descripcion}}
                                                </v-list-item-subtitle>
                                                <main style='display: flex;#border: 5px solid red;'>
                                                    <v-list-item-subtitle class="mt-2" v-if="!ejercicio.publico" style='display: flex;align-items: center;'>
                                                        <v-icon>mdi-earth</v-icon> &nbsp;<strong>Publico</strong>
                                                    </v-list-item-subtitle>
                                                    <v-list-item-subtitle class="mt-2" v-else style='display: flex;align-items: center;'>
                                                        <v-icon>mdi-lock</v-icon> &nbsp;<strong>Privado</strong>
                                                    </v-list-item-subtitle>
                                                    <v-list-item-subtitle class="mt-2" style='text-transform: capitalize;text-align: center;'> <strong> Musculo a entrenar</strong><br>{{ejercicio.nombreMusculo}}</v-list-item-subtitle>
                                                </main>
                                            </v-list-item-content>
                                            <v-card-actions style="display: flex; justify-content: center;">
                                                <v-checkbox @click="guardarEjercicioEnRutina(ejercicio.idEjercicio)" :on-icon="'mdi-check'" :off-icon="'mdi-checkbox-blank-circle-outline'"></v-checkbox>
                                            </v-card-actions>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            items: ['Ejercisio_1', 'Ejercisio_2', 'Ejercisio_3', 'Ejercisio_4', 'Ejercisio_5', 'Ejercisio_6'],
            tiempo_m: ['Minutos', 'Segundos'],
            descanso_m: ['Minutos', 'Segundos'],
            visibilidad: [{ id: 0, texto: "publico" }, { id: 1, texto: "privado" }],
            checkbox: {
                repeticiones: true,
                tiempo: false,
            },
            ejercicio: {
                nombre: '',
                idMusculo: null,
                gif: null,
                repeticiones: 0,
                sets: 1,
                tiempo: 0,
                descanso: 0,
                descripcion: '',
                publico: 0,
            },
            ejercicios: [],
            ejerciciosGuardados: []
        }

    },
    created() {
        this.getMusculos()
        this.getEjercicios()
    },
    methods: {
        async getMusculos() {

            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/muscle/list', {
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
            this.items = data
        },
        guardarEjercicioEnRutina(idEjercicio) {
            for (let i = 0; i < this.ejerciciosGuardados.length; i++) {
                if (this.ejerciciosGuardados[i] == idEjercicio) {
                    this.ejerciciosGuardados.splice(i, 1)
                    return
                }
            }
            this.ejerciciosGuardados.push(idEjercicio)
        },
        async guardarEjercicio() {
            this.ejercicios = []
            const filesTypes = ['image/jpg', 'image/jpeg', 'image/gif'];
            if (filesTypes.includes(this.ejercicio.gif.type)) {
                const formData = new FormData();
                formData.append("nombre", this.ejercicio.nombre);
                formData.append("idMusculo", this.ejercicio.idMusculo);
                formData.append("gif", this.ejercicio.gif);
                formData.append("repeticiones", this.ejercicio.repeticiones);
                formData.append("sets", this.ejercicio.sets);
                formData.append("tiempo", this.ejercicio.tiempo);
                formData.append("descanso", this.ejercicio.descanso);
                formData.append("descripcion", this.ejercicio.descripcion);
                formData.append("publico", this.ejercicio.publico);
                const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/exercise/add', {
                    method: 'POST',
                    headers: {
                        'auth-token': localStorage.getItem('token')
                    },
                    body: formData
                })
                const { data, error } = await res.json()
                if (error) {
                    this.$root.vtoast.show({ message: error })
                    console.log(error);
                    return
                }
                this.getEjercicios()
                this.$root.vtoast.show({ message: 'ejercicio guardado' })
            } else {
                this.$root.vtoast.show({ message: 'formato no soportado' })
            }
        },
        async getEjercicios() {

            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/exercise/', {
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
            this.ejercicios = data
        },
        async guardarRutina() {

        }


    },
}
</script>
<style scoped>
.contenido_tabs {
    #border: 5px solid blue !important;
    height: 75vh;
    overflow: auto;
    padding: 1rem;
}



.text_field {
    height: 65px !important;
}


.btn_add {
    margin-bottom: 0.5rem !important;
    background-color: rgb(228, 52, 99) !important;
    position: absolute !important;
    bottom: 0 !important;
    right: 0;
}

.input_add {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 5rem;
    padding: 0 !important;
    background-color: #E42256 !important;
}

.add_input {
    display: flex;
    justify-content: space-around;
    #margin: auto;
}

.add_input input {
    padding: 0.2rem;
}

.select_vue {
    margin: 0 !important;
    padding: 0 !important;
    height: 53px !important;
}

.tarjeta {
    #border: 5px solid red !important;
    padding: 1.5rem;
    margin-bottom: 1rem;
}

.tarjeta section {
    padding: 1rem;
    #border: 5px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between !important;
    gap: 14px !important;
}

.tarjeta section .v-select,
.tarjeta section p {
    #border: 5px solid purple;
    #width: 70% !important;
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
}
</style>