<template>
    <div class="marco_principal">
        <div class="marco_secundario">
            <v-card style='margin:auto;width: 92%;border-radius:1.5rem'>
                <div class="text-center" style="position:relative;top:1rem;left:3.3rem;width: 80%;">
                    <img class='mt-5' src="@/assets/text_logo.png" alt="" style="width:100%;height: 100%;">
                </div>
                <form class='mt-5' style="padding:1.8rem;margin-top:1rem !important">
                    <section class='mt-5'>
                        <v-text-field label="Correo Electronico" v-model="usuario.email" outlined filled></v-text-field>
                    </section>
                    <section class='mt-3'>
                        <v-text-field label="Contraseña" v-model="usuario.password" outlined filled></v-text-field>
                    </section>
                    <section class="text-center mb-5">
                        <v-btn class="btn_registro mt-5" rounded x-large
                            style='font-size:1.2rem' @click="login">
                            Iniciar Sesión
                        </v-btn>
                    </section>
                </form>
                
            </v-card>

        </div>

         <mover style='position:relative;top:9.5rem' />
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
            }
        }
    },
    methods: {
        async login(){
            const res = await fetch('http://localhost:3500/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(this.usuario)
            })
            const {data, error} = await res.json()
            if(error) {
                console.log(error);
                return 
            }
            this.$router.push({ name: "perfil"})
        }
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
        #border: 5px solid red;
        background-image: url('@/assets/Inicio.png') !important;
        background-position: center;
        background-size: cover;
        height: 100%;

    }

    .marco_secundario {
        position: relative;
        top: 18%;
        #background-color: rgb(250, 250, 250);

    }

    .btn_registro {
        border: 2px solid rgb(228, 34, 86) !important;
        width: 80% !important;
        background-color: white !important;
        font-size: 2rem;
        position:relative;
        #left:1.5rem;
    }
</style>
