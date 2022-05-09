<template>
    <v-container>
        <v-row justify="center">
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class='btn_add' v-bind="attrs" v-on="on" fab dark>
                        <v-icon>
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
                                    <v-btn fab x-small>
                                        <v-icon>
                                            mdi-plus
                                        </v-icon>
                                    </v-btn>
                                </main>
                                <br><br><br>
                                <main>
                                    <v-card class='tarjeta' id='card_ejercisio_1'>
                                        <section style="padding:0;heigh:25px !important">
                                            <v-select :items="items" placeholder="Standard" style='width:70%;height:55px !important' outlined></v-select>
                                            <p style='padding-left:1.7rem'>
                                                Sets
                                            </p>
                                        </section>
                                        <section style='width:70%;margin:0 !important'>
                                            <label>
                                                <input type="radio" name="title" value="mr" checked="checked">
                                                Repeticiones
                                            </label>
                                            <label>
                                                <input type="radio" name="title" value="mr">
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
                                        <section style='#border:4px solid red !important;padding:0 !important;display:flex;justify-content:space-between'>
                                            <v-text-field placeholder="Descanso" outlined style='#border:5px solid black !important;height:55px !important;width:40% !important'></v-text-field>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <v-select :items="items" placeholder="Standard" style='width:70%;height:55px !important' outlined></v-select>
                                        </section>
                                        <br><br>
                                        <section style='width:100%;padding:0 !important'>
                                            <v-textarea name="input-7-4" placeholder="" height='80px' outlined></v-textarea>
                                        </section>
                                    </v-card>
                                </main>
                                <!--
                                <main style='border:5px solid black !important;background-color: #FFFFFF;;'>
                                    <section style='padding: 1rem;border: 5px solid purple;'>
                                        <v-container fluid>





                                            <!--
                                            <v-row>
                                                <v-col cols="8">
                                                    <v-select class='select_vue' :items="items" filled placeholder="Dominadas" solo></v-select>
                                                </v-col>
                                                <v-col cols="4" style='display: flex;align-items: center;'>
                                                    <label for="">Sec</label>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols='6'>
                                                    <label>
                                                        <input type="radio" name="title" value="mr">
                                                        Repeticiones
                                                    </label>
                                                </v-col>
                                                <v-col cols='6'>
                                                    <label>
                                                        <input type="radio" name="title" value="mr">
                                                        Tiempo
                                                    </label>
                                                </v-col>
                                            </v-row>
                                            <br>
                                            <v-row class='mt-5' style='border:4px solid red'>
                                                <v-col cols='8'>
                                                    <v-text-field placeholder="Descanso" solo style='height: 35px !important;'></v-text-field>
                                                </v-col>
                                                <v-col cols='4'>
                                                    <label>Reps</label>
                                                </v-col>
                                            </v-row>
                                            <br>
                                            <v-row class=

                                                <v-col>
                                                    <v-textarea height='60' filled>
                                                    </v-textarea>
                                                </v-col>
                                            </v-row>
                                               
                                        </v-container>
                                        <input type="text">
                                    </section>
                                    <section>
                                        1
                                    </section>
                                    <section>
                                        2
                                    </section>
                                    <section>
                                        3
                                    </section>
                                </main>
                            -->
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>
<style scoped>
.btn_add {
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
    padding: 1rem;
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
        }

    },
}
</script>