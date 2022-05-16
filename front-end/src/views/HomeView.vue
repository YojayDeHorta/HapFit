<template>
  <div class="marco_principal text-center">
    <div class='marco_secundario' style="display:flex;justify-content: center;">
        <div class="text-center" style="position:relative;top:18rem;left:0.5rem;width: 80%;">
          <img src="@/assets/text_logo.png" alt="" style="width:100%;height: 100%;">
        </div>
        <div class="div_btn">
          <v-btn class="btn_inicio" to="/inicio" rounded   x-large style='padding:1.8rem !important;font-size:1.5rem' elevation='2'>
              Iniciar Sesión
          </v-btn>
          <v-btn class="btn_registro" to="/registro" rounded   x-large style='padding:1.8rem !important;font-size:1.5rem' elevation='2'>
           Registrarse
          </v-btn>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',

  }
</script>

<style scoped>

@media (min-width: 961px) {

  .marco_principal{
    display:none !important;
  }

}


  h1{
    color: rgb(228, 34, 86) !important;
    position:absolute;
    top: 22rem;
    font-size: 5rem !important;
  }


.marco_principal{
  padding: 0;
  margin: 0;
  position:relative;
  #border:5px solid red;
  background-image: url('@/assets/Inicio.png') !important;
  background-position: center;
  background-size: cover; 
  height: 100% ;
}


.div_btn{
  position: absolute;
  bottom: 0 !important;
  margin-bottom:3rem;
}

.btn_inicio{
  margin-bottom: 1rem;
  background-color: rgb(228, 34, 86) !important;
  color:white !important;
  #padding: 1rem !important;
  width: 80% !important;
  #font-size: 2rem !important;
}

.btn_registro{
  border:2px solid rgb(228, 34, 86) !important;
  width: 80% !important;
  background-color:white;
  padding: 1rem;
  font-size: 2rem;
}

</style>