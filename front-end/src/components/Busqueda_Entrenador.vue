<template>
    <v-container style='#padding:2rem' fluid>
        <div style='height:50px;background: linear-gradient(180deg, #E42256 0%, #FF8370 100%);'></div>
        <v-row style='padding:1rem'>
            <v-col cols='12'>
            	<main class='main_search'>
            		<section style='width:80%'>
            			<v-text-field outlined label="Buscar Usuario" height='50px'></v-text-field>
            		</section>
            		<section style='background-color:#eee;height:55px;border-radius:0rem 3rem 3rem 0rem;padding:0rem; 1rem 0rem 1rem;width:60px'>
            			  <v-icon class='mt-1' style='font-size:3rem;color:#e42256;#padding:1rem'>mdi-magnify</v-icon>
            		</section>
            	</main>
            </v-col>
            <v-col class='scroll_pantalla' cols='12'>
                <main>
                    <v-card to='/perfil_entrenador'  v-for='i in 7' :key='i' class='Tarjeta' style='padding:1rem' fluid>
                        <p> <img class='mt-2' src="@/assets/entrenadores.jpg" alt="" style='border-radius: 50%;width:90px;height:90px;'></p>
                        <p style="#border:5px solid red !important;">
                            Camilo Sinfuentes<br>
                            <small>Entrenador</small>
                        </p>
                        <p style="#width:25% !important">
                            <v-icon class='check_icon' style='color:black !important;font-size:2rem !important'>
                                mdi-license
                            </v-icon>
                        </p>
                    </v-card>
                </main>
            </v-col>
        </v-row>
    </v-container>
</template>
<style scoped>
.main_search{
	#border: 5px solid purple !important;
	text-align: center;
	display: flex;
	justify-content: center;
	#align-items: center;
}

.scroll_pantalla{
    height: 600px;
    #border: 4px solid black;
    overflow: auto;
}

.main_search section{
    height: 100px;
	#width: 70%;
	#border: 5px solid black !important;
}

.Tarjeta{
    display: flex;
   justify-content: space-between;
    align-items: center;
    gap: 1;
    margin-top: 1rem;
}

.Tarjeta p{
    text-align: center;
    #margin-left: 2rem;
}

</style>
<script>


</script>