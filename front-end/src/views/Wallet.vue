<template>
    <div>
        <div>
            <v-app-bar style='background-color: rgb(228, 34, 86) !important;' dense dark>
                <v-app-bar-nav-icon>
                    <v-btn to='/perfil' plain>
                        <v-icon>
                            mdi-arrow-left-thin
                        </v-icon>
                    </v-btn>
                </v-app-bar-nav-icon>
                <v-toolbar-title>My Wallet</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>mdi-wallet</v-icon>
                </v-btn>
            </v-app-bar>
        </div>
        <v-container style='#border:5px solid black !important;overflow:auto;height:792px;padding:1.5rem'>
            <main>
                <section>
                    <v-card style='padding:2rem'>
                        <section style='#display:flex;#align-items:center;#justify-content:space-between;text-align:center'>
                            <h1>Total Dinero Disponible</h1> <br>
                            <h4>$20.000 COP</h4>
                        </section>
                    </v-card>
                </section>
                <br>
                <section class='mt-5'>
                    <form action="">
                        <label for="">Medio De Pago Paypal</label>
                        <v-text-field class='mt-3' placeholder="Escribe Tu Correo Electronico (PayPal)" outlined></v-text-field>
                        <section style='display:flex;justify-content:space-between;align-items:center'>
                            <label for="">Correo Actual <br> Juan@gmail.com</label>
                            <v-btn>
                                Cambiar Email
                            </v-btn>
                        </section>
                        <br><br><br>
                        <section class='text-center mt-5'>
                            <v-btn block>
                                Enviar Dinero
                            </v-btn>
                        </section>
                    </form>
                </section>
            </main>
        </v-container>
    </div>
</template>
<style scoped>
</style>
<script>
</script>