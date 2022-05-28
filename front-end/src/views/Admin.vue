<template>
  <v-container  class='container pt-4' style='padding: 0;background: linear-gradient(180deg, #E42256 0%, rgba(228, 34, 86, 0) 50%); height: 100vh; !important;'>
    <h1>Solicitudes</h1>
    <v-data-table :headers="columnas"  :items="solicitudes"  >
      <template v-slot:[`item.linkTitulos`]="{ item }">
          <a v-if="item.linkTitulos" :href="item.linkTitulos">ver titulo</a>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
          <!-- <v-icon small class="mr-2" @click="prepararEdicion(item)"> mdi-pencil </v-icon> -->
          <v-icon small color="green" class="mr-2" @click="aceptarSolicitud(item.idSolicitud,item.Cliente_idCliente,item.linkTitulos)"> mdi-check </v-icon>
          <v-icon small color="red"  @click="borrarSolicitud(item.idSolicitud,item.Cliente_idCliente)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      solicitudes:[],
      columnas:[
          {text:'ID del cliente' ,value:'Cliente_idCliente', class:'black white--text'},
          {text:'Nombre' ,value:'nombre', class:'black white--text'},
          {text:'linkTitulos' ,value:'linkTitulos', class:'black white--text'},
          {text:'descripcion' ,value:'descripcion', class:'black white--text'},
          {text:'meses de experiencia' ,value:'mesesExp', class:'black white--text'},
          {text:'lugar de experiencia' ,value:'lugarExp', class:'black white--text'},
          {text: 'ACCIONES', value: 'actions', class:'black white--text', sortable: false },
      ],
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
            this.$root.vtoast.show({message: 'aceptado con exito!'})
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
            this.$root.vtoast.show({message: 'borrado con exito!'})
            this.getSolicitudes()
    },
  },
  components: {},
};
</script>

<style>
  
</style>