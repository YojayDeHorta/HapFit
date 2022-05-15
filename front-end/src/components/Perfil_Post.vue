<template>
    <v-container style='margin:0 !important;padding:0 !important'>
        <div class='marco_secundario' style='margin:0 !important'>
            <img :src="usuario.linkPerfil" alt="">
            <h3>{{usuario.nombre}}</h3>
        </div>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            usuario:{
                nombre:'',
                linkPerfil:''
            },
        }
    },
    created() {
        this.usuario.nombre=localStorage.getItem('nombre')
        this.usuario.linkPerfil=localStorage.getItem('linkPerfil')
    },
}
</script>
<style scoped>
.marco_secundario {
    padding: 0.2rem !important;
    height: 120px;
    #border: 4px solid red !important;
    display: flex;
    flex-direction: row;
    background: linear-gradient(180deg, #E42256 0%, #FF8370 100%);
    color: white !important;
}

img {
    width: 100px;
    height: 100px;
    #border: 5px solid purple;
    border-radius: 50%;
    object-fit: cover !important;
    border: 2px solid white;
}


h3 {
    position: relative;
    top: 12%;
    left: 4%;
}

h1,
h6 {
    border: 5px solid purple !important;
}
</style>
