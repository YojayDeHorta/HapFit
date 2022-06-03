<template>
    <div class="marco_principal">
        <div class="marco_secundario">
            <v-card style='margin:auto;width: 92%;border-radius:1.5rem'>
                <mover />
                <div class="text-center" style="position:relative;top:1rem;left:3.3rem;width: 80%;">
                    <img class='mt-5' src="@/assets/text_logo.png" alt="" style="width:100%;height: 100%;">
                </div>
                <form class='mt-5' style="padding:1.8rem;margin-top:1rem !important">
                    <section class='mt-5'>
                        <v-text-field class="inputStyle" placeholder="Nombre" v-model="usuario.nombre" outlined filled></v-text-field>
                    </section>
                    <section class='mt-3'>
                        <v-text-field class="inputStyle" placeholder="Correo Electronico" v-model="usuario.email"  outlined filled></v-text-field>
                    </section>
                    <section class='mt-3'>
                        <v-text-field class="inputStyle" placeholder="Contraseña" type="password"  v-model="usuario.password"  outlined filled></v-text-field>
                    </section>
                    <section class="text-center mb-5">
                        <v-checkbox label="Aceptas Terminos y Condiciones?" v-model="terminos" required></v-checkbox>
                        <p class="errorMsg">{{msgError}}</p>
                        <v-btn class="btn_registro mt-5" rounded x-large 
                            style='font-size:1.2rem' @click="registro()">
                            Registrarse
                        </v-btn>
                    </section>
                </form>
                
            </v-card>

        </div>
         
    </div>
</template>
<style scoped>

    @media (min-width: 961px) {

  .marco_principal{
    display:none !important;
  }

}

    .marco_principal {
        padding: 0;
        margin: 0;
        position: relative;
        #border: 5px solid red;
        background-image: url('@/assets/Inicio.png') !important;
        background-position: center;
        background-size: cover;
        height: 100%;

    }

    .marco_secundario {
        position: relative;
        top: 11%;
        #background-color: rgb(250, 250, 250);

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
        position:relative;
        #left:1.5rem;
    }
    
    .errorMsg {
        text-align: center;
        color: red;
        font-size: 1.2em;
        margin: 0px;
    }
</style>
<script>

   import mover from '../components/Mover'


    export default {

        components:{

            mover
        },
    data() {
        return {
            usuario:{
                nombre: '',
                email: '',
                password: '',
                telefono:12342134,
                link:"1234123",
            },
            terminos: false,
            msgError: null
        }
    },
    methods: {
        async registro(){
            if (!this.usuario.email || !this.usuario.password || !this.usuario.nombre) {
                this.msgErrorShow( 'El campo es requerido' );
            }
            else if (!this.terminos) {
                this.msgErrorShow( 'Debe aceptar los terminos' );
            }
            else {
                if (!this.emailValidation()) {
                    this.msgErrorShow( 'Correo no valido' );
                }
                else {
                    const res = await fetch(process.env.VUE_APP_BASE_URL+'/api/user/register', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify(this.usuario)
                    })
                    const {data, error} = await res.json()
                    if(error) {
                        this.msgErrorShow( error );
                        return
                    }
                    this.$router.push({ name: "inicio"})
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