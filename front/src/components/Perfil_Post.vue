<template>
    <v-container style='margin:0 !important;padding:0 !important'>
        <div class='marco_secundario' style='margin:0 !important'>
            <img src="@/assets/asuka.jpg" alt="">
            <h3>Nombre Generico</h3>
        </div>
    </v-container>
</template>
<style scoped>
.marco_secundario {
	padding: 0.2rem !important;
    height: 120px;
    border: 4px solid red !important;
    display: flex;
    flex-direction: row;
    background-color: rgb(228, 34, 86) !important;
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
<script>
</script>