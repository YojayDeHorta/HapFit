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
                            <h4>${{billetera.saldo}} USD</h4>
                            <h4 v-if="billetera.solicitud">solicitud de retiro en proceso</h4>
                        </section>
                    </v-card>
                </section>
                <br>
                <section class='mt-5'>
                    <form action="">
                        <label for="">Medio De Pago Paypal</label>
                        <v-text-field class='mt-3' v-model="nuevoCorreo" placeholder="Escribe Tu Correo Electronico (PayPal)" outlined></v-text-field>
                        <section style='display:flex;justify-content:space-between;align-items:center'>
                            <label for="" v-if="billetera.correoPayPal">Correo Actual <br> {{billetera.correoPayPal}}</label> 
                            <label for="" v-else>Agrega un correo para recibir tus pagos</label> 
                            <v-btn @click="setCorreo()">
                                Cambiar Email
                            </v-btn>
                        </section>
                        <br><br><br>
                        <section class='text-center mt-5'>
                            <v-btn block v-if="billetera.correoPayPal&&!billetera.solicitud" @click="setSolicitud()">
                                enviar solicitud
                            </v-btn>
                        </section>
                    </form>
                </section>
            </main>
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            billetera:0,
            nuevoCorreo:''
        }
    },
    created() {
        this.getBilletera()
    },
    methods: {
        async getBilletera(){
            const res = await fetch(process.env.VUE_APP_BASE_URL+'/api/billetera/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
                }
            })
            const {data, error} = await res.json()
            if(error) {
                console.log(error);
                return 
            }
            this.billetera=data
            
        },
        async setCorreo(){
            const res = await fetch(process.env.VUE_APP_BASE_URL+'/api/billetera/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
                },
                body: JSON.stringify({ correoPayPal: this.nuevoCorreo })
            })
            const {data, error} = await res.json()
            if(error) {
                console.log(error);
                return 
            }
            this.nuevoCorreo=''
             this.$root.vtoast.show({ message: 'correo agregado!' })
             this.getBilletera()            
        },
        async setSolicitud(){
            const res = await fetch(process.env.VUE_APP_BASE_URL+'/api/billetera/solicitud', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
                }
            })
            const {data, error} = await res.json()
            if(error) {
                console.log(error);
                return 
            }
            this.$root.vtoast.show({ message: 'solicitud enviada correctamente, se le enviara al correo la confirmacion' })
            this.getBilletera()   
        },
    },
}
</script>
<style scoped>
</style>
