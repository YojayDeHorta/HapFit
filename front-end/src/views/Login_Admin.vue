<template>
    <v-container class="home" style='' fluid fill-height>
        <v-card class='card_login' width='80%' style='#border:5px solid black !important'>
            <div class='cols_card'>
                <form action="" style='#border:5px solid red !important;padding:5rem;#background-color:rgb(106, 143, 212,1) !important;background: linear-gradient(180deg, #E42256 0%, #FF8370 100%);color:white !important'>
                    <div>
                        <h1>Sign in</h1>
                        <main class='main_icon mt-5'>
                            <v-icon dark>
                                mdi-instagram
                            </v-icon>
                            <v-icon dark>
                                mdi-facebook
                            </v-icon>
                            <v-icon dark>
                                mdi-twitter
                            </v-icon>
                        </main>
                        <br>
                        <small>Or use your email account</small>
                    </div><br>
                    <div class='mt-5'>
                        <v-text-field label="Email" prepend-inner-icon="mdi-email" outlined dark ></v-text-field>
                        <v-text-field label="Password" prepend-inner-icon="mdi-lock" outlined  dark></v-text-field>
                        <br>
                        <p><strong>Forgot your password?</strong></p>
                        <v-btn class='mt-5' elevation="2" rounded x-large type="submit">Sign In</v-btn>
                    </div>
                </form>
            </div>
            <div class='img_collage cols_card'>
                <div class='text_efect' style='padding:2rem'>
                    <h1 class='text-center'>Bienvenido administrador <br> <strong>HAPFIT</strong></h1>
                    <p class='text_gallery text-center mt-3'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing, elit. Laudantium doloremque eveniet, eligendi sequi, rem officia? Omnis suscipit asperiores elit. Laudantium doloremque eveniet, eligendi sequi, rem officia? Omnis suscipit asperiores.
                    </p>
                </div>
                <img src="@/assets/login_admin.jpg" alt="">
            </div>
        </v-card>
        <!--
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <form @submit.prevent="login(usuario)">
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Login form</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field prepend-icon="mdi-account" name="login" label="Ingrese el usuario" type="text" v-model="usuario.user"></v-text-field>
                                <v-text-field id="password" prepend-icon="mdi-lock" name="password" label="Password" type="password" v-model="usuario.password"></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" type="submit">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </form>
            </v-flex>
        </v-layout>
      -->
    </v-container>
</template>
<style scoped>




.home {
    #border: 5px solid red !important;
    display: flex;
    justify-content: center;
}

.card_login {
    #border: 5px solid purple !important;
    display: flex !important;
    justify-content: center !important;
}

.card_login form {
    text-align: center;
    color: white !important;
}

.card_login .cols_card {
    #border: 5px solid red !important;
    width: 50%;
}

.card_login .main_icon {
    margin: auto;
    width: 20%;
    #border: 5px solid red;
    display: flex;
    justify-content: space-between;
}

.img_collage {
    #border: 5px solid purple !important;
  /*  #background-image: url("@/assets/collage.png") !important;
    background-repeat: no-repeat;*/
}

.text_efect {
    color: white !important;
    width: 45%;
    position: absolute;
    top: 11rem;
    left: 52.5%;
    #border: 5px solid red !important;
    background: rgba(255, 255, 255, 0.15);
    #border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(7.9px);
    -webkit-backdrop-filter: blur(7.9px);
}

.img_collage img {
    object-fit: cover;
    #opacity: 0.7;
    width: 100%;
    height: 100%;
}
</style>
<script>
/*
// @ is an alias to /src
import { mapActions } from "vuex";
export default {
    data() {
        return {
            usuario: {
                user: "administrador",
                password: "123456",
            },
        };
    },
    methods: {
        ...mapActions(["login"]),
    },
};
*/
</script>