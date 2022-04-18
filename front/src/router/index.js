import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/inicio',
    name: 'inicio',
    component: () => import(/* webpackChunkName: "about" */ '../views/Inicio.vue')
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
  },
  {
    path: '/entrenedaores',
    name: 'entrenedores',
    component: () => import(/* webpackChunkName: "about" */ '../views/Entrenedores.vue')
  },
  {
    path: '/post',
    name: 'post',
    component: () => import(/* webpackChunkName: "about" */ '../views/Post.vue')
  },
    {
    path: '/perfil',
    name: 'perfil',
    component: () => import(/* webpackChunkName: "about" */ '../views/Perfil.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
