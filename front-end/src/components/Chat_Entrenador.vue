<template>
    <div fluid>
        <v-app-bar style='background: linear-gradient(180deg, #E42256 0%, #FF8370 100%);' dense dark height='70px'>
            <v-btn  to='/perfil' plain style='margin: 0 !important;'>
                <v-icon>
                    mdi-arrow-left-thin
                </v-icon>
            </v-btn>
            <v-toolbar-title style='margin-left:1rem !important'>
                <main style='display:flex'>
                    <section class='mt-2'>
                        <img src="@/assets/asuka.jpg" alt="" style='width:60px;height:60px;border-radius:50%'>
                    </section>
                    <section class='mt-2' style='margin-left:1rem;'>
                        <small>
                            Nombre Generico
                        </small>
                    </section>
                </main>
            </v-toolbar-title>
        </v-app-bar>
        <v-container style='#border:5px solid purple;height:79vh;overflow: auto;'>
            <div style='position: relative;display:flex;flex-direction: column;height: 87vh;overflow: auto;'>
                <main class='main_chat' style='position: relative;' v-for='i in 5' :key='6'>
                    <section style='#border: 4px solid purple;display: flex;justify-content: flex-end;border-radius: 1rem !important;'>
                        <section style='#border: 4px solid blue;width: 70%;padding: 1rem;color:white;background-color:#FF8370 ;border-radius: 1rem !important;'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus, voluptate #1
                        </section>
                    </section> <br><br>
                    <section style='#border: 4px solid purple;display: flex;justify-content: flex-start;border-radius: 1rem !important;'>
                        <section style='#border: 4px solid blue;width: 70%;padding: 1rem;background: #505050;color: white;border-radius: 1rem !important;'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus, voluptate #1
                        </section>
                    </section>
                </main>
            </div>
        </v-container>
        <form action="" style='display: flex;align-items: center;#border: 5px solid black;gap:16px;justify-content:center;position: absolute;bottom: 0;width: 100%;padding: 1rem;'>
            <v-text-field class='mt-5' placeholder="Envia tu mensaje" style='margin-top:2rem !important;' filled rounded dense></v-text-field>
            &nbsp;&nbsp;&nbsp;
            <v-btn fab style='background: #E42256;box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);'>
                <v-icon color='white'>
                    mdi-send
                </v-icon>
            </v-btn>
        </form>
    </div>
</template>
<script>

// import io from 'socket.io-client';
export default {
    data() {
        return {
            socket: io(),
            step: 'nick',
            nick: null,
            message: null,
            messages: []
        }
    },
    methods: {
        send() {
            this.socket.emit('chat-message', {
                nick: this.nick,
                usuarioQueEnvia:1,
                usuarioQueRecibe:2,
                message: this.message,
                date: new Date().getTime()
            });

            this.message = null;
        },
        signIn() {
            if (!this.nick) {
                return;
            }

            this.step = 'chat';
        }
    },
    mounted() {
        this.socket.on('chat-message', (msg) => {
            this.messages.push(msg);

            setTimeout(() => {
                // scroll to bottom
                const chatContainer = document.querySelector(".chat-container");
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 10);
        });
    }
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
