import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Inicio.vue')
  },
  {
    path: '/solicitud/cita/:id',
    name: 'SolicitudCita',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/solicitud/Cita.vue')
  },
  {
    path: '/solicitud/ConfirmarCita',
    name: 'ConfirmacionCita',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/solicitud/ConfirmacionCita.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
