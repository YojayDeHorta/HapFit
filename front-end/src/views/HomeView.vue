<template>
    <div class="marco_principal text-center">
        <div class='marco_secundario'>
            <div class="text-center div_img">
                <img src="@/assets/text_logo.png" alt="">
            </div>
            <div class="div_btn">
                <v-btn class="btn_inicio" to="/inicio" rounded x-large elevation='2'>
                    Iniciar Sesión
                </v-btn>
                <v-btn class="btn_registro" to="/registro" rounded x-large elevation='2'>
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
h1 {
    color: rgb(228, 34, 86) !important;
    position: absolute;
    top: 22rem;
    font-size: 5rem !important;
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
    display: flex;
    justify-content: center;
}

.div_img {
    position: relative;
    top: 18rem;
    left: 0.5rem;
    width: 80%;
}

.div_img img {
    width: 100%;
    height: 100%;
}

.div_btn {
    position: absolute;
    bottom: 0 !important;
    margin-bottom: 3rem;
}

.btn_inicio {
    margin-bottom: 1rem;
    background-color: rgb(228, 34, 86) !important;
    color: white !important;
    #padding: 1rem !important;
    width: 80% !important;
    #font-size: 2rem !important;
}

.btn_registro {
    border: 2px solid rgb(228, 34, 86) !important;
    color: #E42256 !important;
    font-weight: bold !important;
    width: 80% !important;
    background-color: white;
    padding: 1rem;
    font-size: 2rem;
}

.v-btn {
    padding: 1.8rem !important;
    font-size: 1.5rem
}
</style>