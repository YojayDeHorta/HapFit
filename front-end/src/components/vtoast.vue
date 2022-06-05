<template>
    <v-snackbar v-model="snackbar.open" :timeout="3000" top right>
        <div class="d-flex justify-space-between">
            <div class="mt-2" style="text-transform: capitalize;">{{ snackbar.text }}</div>
            <v-btn color="error" class="ml-5" @click="snackbar.open = false">X</v-btn>
        </div>
      
    </v-snackbar>
</template>
<script>
export default {
    name: "vtoast",

    data() {
        return {
            snackbar:{
                open:false,
                text:''
            },
        }
    },
    methods: {
        show(data){
        this.snackbar.open=true
        this.snackbar.text=data.message
        },
    },
}
</script>