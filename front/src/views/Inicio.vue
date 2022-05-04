<template>
    <div class="marco_principal">
        <div class="marco_secundario">
            <v-card style='margin:auto;width: 92%;border-radius:1.5rem'>
                <v-btn class="btnBack" to='/' >
                    <v-icon class='icon' style="color:rgb(228, 34, 86); font-size: 40px;">
                        mdi-arrow-left-circle
                    </v-icon>
    		    </v-btn>

                <div class="text-center" style="position:relative;top:1rem;left:3.3rem;width: 80%;">
                    <img class='mt-5' src="@/assets/text_logo.png" alt="" style="width:100%;height: 100%;">
                </div>
                <form class='mt-5' style="padding:1.8rem;margin-top:1rem !important">
                    <section class='mt-5'>
                        <v-text-field class="inputStyle" label="Correo Electronico" v-model="usuario.email" outlined filled></v-text-field>
                    </section>
                    <section class='mt-3'>
                        <v-text-field class="inputStyle" label="Contraseña" v-model="usuario.password" outlined filled></v-text-field>
                    </section>
                    <section>
                        <p class="errorMsg">{{msgError}}</p>
                    </section>
                    <section class="text-center mb-5">
                        <v-btn class="btn_registro mt-5" rounded x-large
                            style='font-size:1.2rem' @click="login">
                            Entrar
                        </v-btn>
                    </section>
                </form>
                
            </v-card>

        </div>
         <!--<mover style='position:relative;top:9.5rem' />-->
    </div>
</template>
<script>
import mover from '../components/Mover'
export default {
       



    components:{

        mover
    },

    data() {
        return {
            usuario:{
                email:"",
                password:""
            },
            msgError: ''
        }
    },
    methods: {
        async login(){
            if (this.usuario.email === "" || this.usuario.password === "") {
                this.msgError = 'El campo es requerido';
                setInterval(()=>{
                    this.msgError = '';
                },4000);
            } 
            else {
                const res = await fetch('http://localhost:3500/api/user/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(this.usuario)
                })
                const {data, error} = await res.json()
                if(error) {
                    this.msgError = error;
                    setInterval(()=>{
                        this.msgError = '';
                    },4000);
                    return 
                }
                this.$router.push({ name: "perfil"})
            }
        },
    },
}
</script>
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
        background-image: url('@/assets/Inicio.png') !important;
        background-position: center;
        background-size: cover;
        height: 100%;
    }

    .btnBack {
        position: relative !important;
        margin: 1em 0em 0em 1em;
        background: transparent !important;
        box-shadow: none !important;
        min-width: auto !important;
        padding: 0em !important;
        border-radius: 50px !important;
    }

    .marco_secundario {
        position: relative;
        top: 18%;
    }

    .inputStyle {
        font-size: 1.3rem;
        background-color: transparent !important;
    }

    .errorMsg {
        text-align: center;
        color: red;
        font-size: 1.2em;
        margin: 0px;
    }

    .btn_registro {
        border: 3px solid rgb(228, 34, 86) !important;
        color: rgb(228, 34, 86) !important;
        width: 80% !important;
        background-color: white !important;
        font-size: 2rem;
        font-weight: 900;
        position:relative;
    }
</style>
