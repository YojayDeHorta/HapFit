<template>
    <div class="marco_principal">
        <div class="marco_secundario">
            <v-card class='tarjeta'>
                <mover />
                <div class="div_img text-center">
                    <img class='mt-5' src="@/assets/text_logo.png" alt="">
                </div>
                <form class='mt-5'>
                    <section class='mt-5'>
                        <v-text-field class="inputStyle" placeholder="Correo Electronico" v-model="usuario.email" outlined filled></v-text-field>
                    </section>
                    <section class='mt-3'>
                        <v-text-field class="inputStyle" type="password" placeholder="Contraseña" v-model="usuario.password" outlined filled></v-text-field>
                    </section>
                    <section>
                        <p class="errorMsg">{{msgError}}</p>
                    </section>
                    <section class="text-center mb-5">
                        <v-btn class="btn_registro mt-5" rounded x-large style='font-size:1.2rem' @click="login">
                            Iniciar Sesión
                        </v-btn>
                    </section>
                </form>
            </v-card>
        </div>
    </div>
</template>
<script>
import mover from '../components/Mover'


export default {

    components: {

        mover
    },

    data() {
        return {
<<<<<<< HEAD
            usuario: {
                email: "",
                password: ""
=======
            usuario:{
                email:"",
                password:"",
>>>>>>> e79c48b0dc622f05fa0c5883ae121731eb9a664a
            },
            msgError: null,
        }
    },
    methods: {
<<<<<<< HEAD
        async login() {
            if (this.usuario.email === "" || this.usuario.password === "") {
                this.msgError = 'El campo es requerido';
                setInterval(() => {
                    this.msgError = '';
                }, 4000);
            } else {
                const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    },
                    body: JSON.stringify(this.usuario)
                })
                const { data, error, user } = await res.json()
                if (error) {
                    this.msgError = error;
                    setInterval(() => {
                        this.msgError = '';
                    }, 4000);
                    return
                }
                localStorage.setItem('token', data.token)
                localStorage.setItem('idUsuario', user.id)
                localStorage.setItem('rol', user.rol)
                localStorage.setItem('nombre', user.nombre)
                localStorage.setItem('linkPerfil', user.linkPerfil)
                if (user.rol == "cliente" || user.rol == "entrenador") {
                    this.$router.push({ name: "perfil" })
                }
                if (user.rol == "administrador") {
                    this.$router.push({ name: "Admin" })
=======
        async login(){
            if (!this.usuario.email || !this.usuario.password) {
                this.msgErrorShow( 'El campo es requerido' );
            } 
            else {
                if (!this.emailValidation()) {
                    this.msgErrorShow( 'Correo no valido' );
                }
                else {
                    const res = await fetch(process.env.VUE_APP_BASE_URL+'/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token':localStorage.getItem('token')
                        },
                    body: JSON.stringify(this.usuario)
                    })
                    const {data, error, user} = await res.json()
                    if(error) {
                        this.msgErrorShow( error );
                        return 
                    }
                    localStorage.setItem('token',data.token)
                    localStorage.setItem('idUsuario',user.id)
                    localStorage.setItem('rol',user.rol)
                    localStorage.setItem('nombre',user.nombre)
                    localStorage.setItem('linkPerfil',user.linkPerfil)
                    if (user.rol=="cliente"||user.rol=="entrenador") {
                        this.$router.push({ name: "perfil"})
                    }
                    if (user.rol=="administrador") {
                        this.$router.push({ name: "Admin"})
                    }
>>>>>>> e79c48b0dc622f05fa0c5883ae121731eb9a664a
                }

                

            }
        },

        emailValidation() {
            const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return res.test(String(this.usuario.email).toLowerCase());
        },

        msgErrorShow( msg ) {
            this.msgError = msg;
            setTimeout(()=>{
                this.msgError = null;
            },4000);
        },
    },
}
</script>
<style scoped>
.errorMsg {
    text-align: center;
    color: red;
    font-size: 1.2em;
    margin: 0px;
}

<<<<<<< HEAD

.marco_principal {
    padding: 0;
    margin: 0;
    position: relative;
    background-image: url('@/assets/Inicio.png') !important;
    background-position: center;
    background-size: cover;
    height: 100%;
}

.marco_secundario {
    position: relative;
    top: 18%;
}

=======
    .errorMsg {
        text-align: center;
        color: red;
        font-size: 1.2em;
        margin: 0px;
    }
    .marco_principal {
        padding: 0;
        margin: 0;
        position: relative;
        background-image: url('@/assets/Inicio.png') !important;
        background-position: center;
        background-size: cover;
        height: 100%;
    }

    .marco_secundario {
        position: relative;
        top: 18%;
    }
>>>>>>> e79c48b0dc622f05fa0c5883ae121731eb9a664a

.tarjeta {
    margin: auto;
    width: 92%;
    border-radius: 1.5rem !important;
}

<<<<<<< HEAD
img {
    width: 100%;
    height: 100%;
}

.div_img {
    position: relative;
    top: 1rem;
    left: 3.3rem;
    width: 80%;
}

form {
    padding: 1.8rem;
    margin-top: 1rem !important
}

.inputStyle {
    font-size: 1.3em !important;
}

.btn_registro {
    border: 2px solid rgb(228, 34, 86) !important;
    color: #E42256 !important;
    font-weight: bold !important;
    width: 80% !important;
    background-color: white !important;
    font-size: 2rem;
    position: relative;
    #left: 1.5rem;
}
</style>
=======
    .btn_registro {
        border: 2px solid rgb(228, 34, 86) !important;
        color: #E42256 !important;
        font-weight: bold !important;
        width: 80% !important;
        background-color: white !important;
        font-size: 2rem;
        position:relative;
    }
</style>
>>>>>>> e79c48b0dc622f05fa0c5883ae121731eb9a664a
