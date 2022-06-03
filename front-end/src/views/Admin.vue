<template>
    <div style='display:flex;flex-direction:row;align-items:center'>
        <navbar></navbar>
        <v-container class='container' style='padding: 0; height: 90vh; !important;overflow:auto;'>
            <v-data-table :headers="columnas" :items="solicitudes" style='#border:4px solid black;width:92%;margin:auto;box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;' elevation='8'>
                <template v-slot:[`item.linkTitulos`]="{ item }">
                    <a v-if="item.linkTitulos" :href="item.linkTitulos">ver titulo</a>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small color="green" class="mr-2" @click="aceptarSolicitud(item.idSolicitud,item.Cliente_idCliente,item.linkTitulos)"> mdi-check </v-icon>
                    <v-icon small color="red" @click="borrarSolicitud(item.idSolicitud,item.Cliente_idCliente)"> mdi-delete </v-icon>
                </template>
            </v-data-table>
        </v-container>
    </div>
</template>
<script>
import navbar from '../components/Navbar_Admin.vue'


export default {
    components: {
        navbar
    },
    data() {
        return {

            dialog: false,
            solicitudes: [],
            columnas: [
                { text: 'ID del cliente', value: 'Cliente_idCliente', class: 'pink white--text', align: 'center'},
                { text: 'Nombre', value: 'nombre', class: 'pink white--text' , align: 'center'},
                { text: 'linkTitulos', value: 'linkTitulos', class: 'pink white--text' , align: 'center'},
                { text: 'descripcion', value: 'descripcion', class: 'pink white--text', align: 'center' },
                { text: 'meses de experiencia', value: 'mesesExp', class: 'pink white--text' , align: 'center'},
                { text: 'lugar de experiencia', value: 'lugarExp', class: 'pink  white--text' , align: 'center'},
                { text: 'ACCIONES', value: 'actions', class: 'pink white--text accion_tabla', sortable: false , align: 'center'},
            ],
        };
    },
    created() {
        this.getSolicitudes()
    },
    methods: {
        async getSolicitudes() {

            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/solicitud/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }
            this.solicitudes = data
            console.log(data);


        },
        async aceptarSolicitud(idSolicitud, idCliente, linkTitulos) {
            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/solicitud/aceptar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ idSolicitud, idCliente, linkTitulos })
            })
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }
            this.$root.vtoast.show({ message: 'aceptado con exito!' })
            this.getSolicitudes()
        },
        async borrarSolicitud(idSolicitud, idCliente) {
            const res = await fetch(process.env.VUE_APP_BASE_URL + '/api/solicitud/rechazar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ idSolicitud, idCliente })
            })
            const { data, error } = await res.json()
            if (error) {
                console.log(error);
                return
            }
            this.$root.vtoast.show({ message: 'borrado con exito!' })
            this.getSolicitudes()
        },
    }
};
</script>
<style scoped>
.accion_tabla {
    border: 4px solid red !important;
    margin-bottom: 2rem;
}
</style>