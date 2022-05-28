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
                                    <input type="text" style='background-color: rgb(255, 255, 255);width: 80%;'>
                                    <v-btn fab x-small light>
                                        <v-icon style='color:#E42256 !important'>
                                            mdi-plus
                                        </v-icon>
                                    </v-btn>
                                </main>
                                <br><br><br>
                                <main>
                                    <v-card class='tarjeta' id='card_ejercisio_1'>
                                        <section style="padding:0;heigh:25px !important">
                                            <v-select :items="items" placeholder="Dominadas" style='width:70%;height:55px !important' outlined></v-select>
                                            <p style='padding-left:1.7rem'>
                                                Sets
                                            </p>
                                        </section>
                                        <section style='width:70%;margin:0 !important'>
                                            <label>
                                                <input type="radio" name="title" checked="checked">
                                                Repeticiones
                                            </label>
                                            <label>
                                                <input type="radio" name="title">
                                                Tiempo
                                            </label>
                                        </section>
                                        <section style='#border:4px solid red !important;padding:0 !important'>
                                            <v-text-field placeholder="Repeticiones" outlined style='#border:5px solid black !important;height:55px !important'></v-text-field>
                                            <p style='padding-left:1.7rem'>
                                                Reps
                                            </p>
                                        </section>
                                        <br>
                                        <section style='padding:0 !important;height:55px !important'>
                                            <v-text-field placeholder="Descanso" outlined class='text_field' style='width:40% !important'></v-text-field>
                                            <v-spacer></v-spacer>
                                            <v-select :items="repeticion_m" placeholder="Segundos" outlined class='text_field' style='width:30% !important'></v-select>
                                        </section>
                                        <br>
                                        <section style='width:100%;padding:0 !important'>
                                            <v-textarea name="input-7-4" placeholder="" height='80px' outlined></v-textarea>
                                        </section>
                                    </v-card>
                                    <v-card class='tarjeta' id='card_ejercisio_2'>
                                        <section style="padding:0;heigh:25px !important">
                                            <v-select :items="items" placeholder="Jalones de Pecho" style='width:70%;height:55px !important' outlined></v-select>
                                            <p style='padding-left:1.7rem'>
                                                Sets
                                            </p>
                                        </section>
                                        <section style='width:70%;margin:0 !important'>
                                            <label>
                                                <input type="radio" name="title" value="repeticiones">
                                                Repeticiones
                                            </label>
                                            <label>
                                                <input type="radio" name="title" value="tiempo" checked="checked">
                                                Tiempo
                                            </label>
                                        </section>
                                        <section style='#border:4px solid red !important;padding:0 !important'>
                                            <v-text-field placeholder="Tiempo" outlined style='height:55px !important;width:40%'></v-text-field>
                                            <v-spacer></v-spacer>
                                            <v-select :items="tiempo_m" placeholder="Segundos" style='width:40%;height:55px !important' outlined></v-select>
                                        </section>
                                        <br>
                                        <section style='#border:4px solid red !important;padding:0 !important;'>
                                            <v-text-field placeholder="Descanso" outlined style='height:55px !important;width:40%'></v-text-field>
                                            <v-spacer></v-spacer>
                                            <v-select :items="tiempo_m" placeholder="Segundos" style='width:40%;height:55px !important' outlined></v-select>
                                        </section>
                                        <br><br>
                                        <section style='width:100%;padding:0 !important'>
                                            <v-textarea name="input-7-4" placeholder="" height='80px' outlined></v-textarea>
                                        </section>
                                    </v-card>
                                    <section class='text-center' >
                                        <v-btn style='background: #FFFFFF;border: 3px solid #E42256;box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);border-radius: 50px;width:50%;' plain>
                                            Guardar
                                        </v-btn>
                                    </section>
                                </main>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>
<style scoped>
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
</style>
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
            repeticion_m: ['Minutos', 'Segundos'],
        }

    },
}
</script>