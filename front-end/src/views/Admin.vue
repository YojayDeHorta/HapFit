<template>
  <v-container  class='container' style='padding: 0;background: linear-gradient(180deg, #E42256 0%, rgba(228, 34, 86, 0) 100%) !important;'>
    <v-card class="mx-auto  mt-5" v-for="solicitud in solicitudes"  :key="solicitud.idSolicitud" max-width="344"        >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">{{solicitud.nombre}} quiere ser entrenador</div>
          <v-list-item-subtitle>Titulo: <a :href="solicitud.linkTitulos">{{solicitud.linkTitulos}}</a></v-list-item-subtitle>
          <v-list-item-subtitle>Descripcion: {{solicitud.descripcion}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80"><v-img :src="solicitud.linkPerfil"></v-img></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text color="green" @click="aceptarSolicitud(solicitud.idSolicitud,solicitud.Cliente_idCliente,solicitud.linkTitulos)"> Aceptar </v-btn>
        <v-btn outlined rounded text color="red"  @click="borrarSolicitud(solicitud.idSolicitud,solicitud.Cliente_idCliente)"> Rechazar </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      solicitudes:[]
    };
  },
  created() {
      this.getSolicitudes()
  },
  methods: {
      async getSolicitudes(){

            const res = await fetch(process.env.VUE_APP_BASE_URL+'/api/solicitud/', {
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
            this.solicitudes=data
            console.log(data);    

            
    },
    async aceptarSolicitud(idSolicitud,idCliente,linkTitulos){
            const res = await fetch(process.env.VUE_APP_BASE_URL+'/api/solicitud/aceptar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({idSolicitud,idCliente,linkTitulos  })
            })
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }
            this.getSolicitudes()
    },
    async borrarSolicitud(idSolicitud,idCliente){
            const res = await fetch(process.env.VUE_APP_BASE_URL+'/api/solicitud/rechazar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({idSolicitud,idCliente })
            })
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }
            this.getSolicitudes()
    },
  },
  components: {},
};
</script>