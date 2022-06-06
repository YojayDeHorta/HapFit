<template>
    <div fluid>
        <v-app-bar style='background: linear-gradient(180deg, #E42256 0%, #FF8370 100%);' dense dark height='70px'>
            <v-btn to='/perfil' plain style='margin: 0 !important;'>
                <v-icon>
                    mdi-arrow-left-thin
                </v-icon>
            </v-btn>
            <v-toolbar-title style='margin-left:1rem !important'>
                <main style='display:flex'>
                    <section class='mt-2'>
                        <img :src="linkPerfil" alt="" style='width:60px;height:60px;border-radius:50%'>
                    </section>
                    <section class='mt-2' style='margin-left:1rem;'>
                        <small>
                            {{nombreRecibe}}
                        </small>
                    </section>
                </main>
            </v-toolbar-title>
        </v-app-bar>
        <v-container style='#border:5px solid purple;height:79vh;overflow: auto;'>
            <div style='position: relative;display:flex;flex-direction: column;height: 87vh;overflow: auto;'>
                <main class='main_chat' style='position: relative;' v-for='mensaje in mensajes' :key='mensaje.date'>
                    <section style='#border: 4px solid purple;display: flex;justify-content: flex-end;border-radius: 1rem !important;' v-if="mensaje.derecha">
                        <section style='#border: 4px solid blue;width: 70%;padding: 1rem;color:white;background-color:#FF8370 ;border-radius: 1rem !important;'>
                            {{mensaje.mensaje}}
                        </section>
                    </section>
                    <section style='#border: 4px solid purple;display: flex;justify-content: flex-start;border-radius: 1rem !important;' v-else>
                        <section style='#border: 4px solid blue;width: 70%;padding: 1rem;background: #505050;color: white;border-radius: 1rem !important;'>
                            {{mensaje.mensaje}}
                        </section>
                    </section>
                </main>
            </div>
        </v-container>
        <form action="" style='display: flex;align-items: center;#border: 5px solid black;gap:16px;justify-content:center;position: absolute;bottom: 0;width: 100%;padding: 1rem;'>
            <v-btn elevation="2" fab x-smal @click.stop="dialog = true">
                <v-icon>
                    mdi-plus
                </v-icon>
            </v-btn>
            &nbsp; &nbsp;
            <v-text-field class='mt-5' v-model="mensaje" placeholder="Envia tu mensaje" style='margin-top:2rem !important;' filled rounded dense></v-text-field>
            &nbsp;&nbsp;&nbsp;
            <v-btn @click="send()" fab style='background: #E42256;box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);'>
                <v-icon color='white'>
                    mdi-send
                </v-icon>
            </v-btn>
        </form>
        <!---->
        <v-dialog v-model="dialog" max-width="290">
            <v-card style='padding:1.5rem'>
                <h4 style="text-transform:capitalize;text-align:center;#border:4px solid red">Escoge la rutina que vas enviar</h4>
                <br>
                <v-select :items="items" placeholder='Selecione la rutina' outlined></v-select>
                <main style='display: flex;justify-content: space-around;'>
                    <v-btn   color="error">
                        Cancelar
                    </v-btn>
                    <v-btn color='primary'>
                        Enviar
                    </v-btn>
                </main>
                <!--
                <v-card-title class="text-h5">
                    Use Google's location service?
                </v-card-title>
                <v-card-text>
                    Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                        Disagree
                    </v-btn>
                    <v-btn color="green darken-1" text @click="dialog = false">
                        Agree
                    </v-btn>
                </v-card-actions>
            -->
            </v-card>
        </v-dialog>
        <!---->
    </div>
</template>
<script src="http://127.0.0.1:3500/socket.io/socket.io.js"></script>
<script>
// var socket = io('http://localhost:3500',{ transports : ['websocket'] });
// import io from 'socket.io-client';
export default {
    data() {

        return {
            // socket: io(),
            step: 'nick',
            nombre: null,
            mensaje: null,
            dialog: false,
            mensajes: [],
            nombreRecibe: localStorage.getItem("chatNombre"),
            linkPerfil: localStorage.getItem("chatLinkPerfil"),
            usuarioQueRecibe: this.$route.params.usuarioQueRecibe,
              items: ['Foo', 'Bar', 'Fizz', 'Buzz']
        }
    },
    methods: {
        send() {
            let datos = {
                nombre: localStorage.getItem("nombre"),
                usuarioQueEnvia: localStorage.getItem("idUsuario"),
                usuarioQueRecibe: this.usuarioQueRecibe,
                mensaje: this.mensaje,
                date: new Date().toISOString()
            }
            this.$socket.emit('send_message', datos);
            datos.derecha = true
            this.mensajes.push(datos)
            this.mensaje = null;
        },
        async getMensajes() {
            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/chat/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    idOtroUsuario: this.usuarioQueRecibe,

                })
            })
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }
            this.mensajes = data
        },

    },
    // props: {
    //     nombreRecibe: '',
    //     linkPerfil:null,
    // },

    mounted() {
        // console.log(this.nombreRecibe,this.linkPerfil,this.$route.params);
        this.$socket.emit('user_connected', {
            nombre: localStorage.getItem("nombre"),
            usuarioSesion: localStorage.getItem("idUsuario"),
            date: new Date().toISOString()
        });
        this.getMensajes()
        // this.$socket.on('new_message', (data) => {
        //     this.mensajes.push(data);
        //     console.log(data);
        //     console.log("a");
        // });
    },
    sockets: {
        new_message: function(data) {
            data.derecha = false
            this.mensajes.push(data);

        }
    },
}
</script>
<style scoped>
.main_chat section {
    margin-top: 0.5rem;
}


/*
.main_chat section {
    width: 70%;
    height: 90px;
    padding: 0.5rem !important;
    #border: 5px solid black;
    margin-top: 1rem;
}*/


.main_chat small {
    #border: 1px solid purple;
    margin-top: 2rem;
    padding: 1.5rem;
    padding: 0rem;
    width: 70%;
    #height: 100px;
}

.input {
    width: 20px !important;
    border: 5px solid red !important;
}
</style>