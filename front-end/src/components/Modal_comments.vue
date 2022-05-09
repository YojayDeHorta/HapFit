<template>
    <v-container>
        <v-row justify="center">
            <v-dialog v-model="dialog" width="600px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn style='background-color:transparent;color:black' dark v-bind="attrs" v-on="on" elevation='0'>
                        5&nbsp;
                        <v-icon>mdi-comment-multiple-outline</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class='mb-5'>
                        <span style='margin: auto;' class="text-h5 mt-5">Comentarios</span>
                    </v-card-title>
                    <v-card-text scrollable>
                        <main v-for='i in 5' :key="i" class='mb-5' elevation='2'>
                            <section class='title_post'>
                                <img class='img_post' src="@/assets/asuka.jpg" alt="" style=''>
                                <p style='padding-left: 1rem;'>
                                    Nombre Generico <br>
                                    <small>2 m</small>
                                </p>
                            </section>
                            <section class='icon_post mt-2'>
                                <p class='text-justify'>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, doloribus, aspernatur? Consectetur temporibus tempore, optio natus accusamus asperiores consequuntur, possimus ab sint nesciunt quidem officiis, doloremque perferendis delectus tenetur modi.
                                </p>
                            </section>
                        </main>
                        <hr> <br>
                        <v-text-field label="comentarios" filled rounded dense append-icon="mdi-send"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class='mt-2' color="green darken-1" text @click="dialog = false">
                            close
                        </v-btn>
                    </v-card-actions>
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
        }
    },
}
</script>
<style scoped>
main {
    padding: 1rem;
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

.title_post img {
    width: 45px;
    height: 45px;
    #border: 5px solid purple;
    border-radius: 50%;
    object-fit: cover !important;
    border: 2px solid white;
}


.icon_post {
    display: flex;
    justify-content: space-around;
}
</style>