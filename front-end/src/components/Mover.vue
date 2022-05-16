<template>
    <v-container>
    	<v-card class='tarjeta'>
    			<v-btn to='/' plain>
    				<v-icon class='icon'>
    						mdi-home-circle
    				</v-icon>
    			</v-btn>    	
    	</v-card>
    </v-container>
</template>
<style scoped>
	.tarjeta{
		position: absolute;
		bottom: 0;
		left:24%;
		display: flex;
		justify-content: center;
		padding: 0.5rem;
		#border: 5px solid black;
		width: 50%;
		margin-top: 1.5rem;
		margin-bottom:0.5rem ;
	}
	.icon{
		outline: none !important;
		border: none !important;
		background-color: transparent !important;
		cursor: pointer;
		font-size: 3rem !important;
	}
</style>
<script>
</script>