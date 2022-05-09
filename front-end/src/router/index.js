import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/inicio',
        name: 'inicio',
        component: () => import( /* webpackChunkName: "about" */ '../views/Inicio.vue')
    },
    {
        path: '/registro',
        name: 'registro',
        component: () => import( /* webpackChunkName: "about" */ '../views/Registro.vue')
    },
    {
        path: '/entrenedaores',
        name: 'entrenedores',
        component: () => import( /* webpackChunkName: "about" */ '../views/Entrenedores.vue')
    },
    {
        path: '/post',
        name: 'post',
        component: () => import( /* webpackChunkName: "about" */ '../views/Post.vue')
    },
    {
        path: '/perfil',
        name: 'perfil',
        component: () => import( /* webpackChunkName: "about" */ '../views/Perfil_Usuario.vue'),
        meta: {requireAuth: true}
    },
    {
        path: '/perfil_entrenador',
        name: 'perfil_entrenador',
        component: () => import( /* webpackChunkName: "about" */ '../views/Perfil_Entrenador.vue'),
        meta: {requireAuth: true}
    },
    {
        path: '/planes_entrenador',
        name: 'planes_entrenador',
        component: () => import( /* webpackChunkName: "about" */ '../views/Planes_Entrenador.vue')
    },
    {
        path: '/navegacion_entrenador',
        name: 'navegacion_entrenador',
        component: () => import( /* webpackChunkName: "about" */ '../components/Navegation_Entrenador.vue')
    },
        {
        path: '/rutinas_entrenador',
        name: 'rutinas_entrenador',
        component: () => import( /* webpackChunkName: "about" */ '../views/Rutinas_Entrenador.vue')
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    const rutaProtegida = to.matched.some(record => record.meta.requireAuth);
    store.dispatch('leerToken')
    // console.log(store.state.token)
      if(rutaProtegida && store.state.token === null){
          // ruta protegida es true
          // token es nulo true, por ende redirigimos al inicio
          next('/')
      }else{
          // En caso contrario sigue...
          next()
      }
  
  })
export default router