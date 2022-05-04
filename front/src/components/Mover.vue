<template>
    <v-container>
    	<v-card class='tarjeta'>
    		<section>
    			<!--
    			<v-icon class='icon'>
    				mdi-arrow-left-circle
    			</v-icon>
    		-->
    		</section>
    	
    			<v-btn to='/' >
    				<v-icon class='icon'>
    						mdi-home-circle
    				</v-icon>
    			
    			</v-btn>
    	
    		
    		<section>
    			<!--
    				<v-icon class='icon'>
    				mdi-arrow-right-circle
    			</v-icon>
    		-->
    		</section>
    	
    	</v-card>
    </v-container>
</template>
<style scoped>
	.tarjeta{
		padding: 0.5rem;
		position: relative;
		top: 5.3rem;
		display: flex;
		justify-content: space-between;
		width: 100%;
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