import { createRouter, createWebHistory } from 'vue-router'
import AddDesign from '../views/AddDesign.vue'
import Designs from '../views/Designs.vue'
import CreateDesign from '../views/CreateDesign.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AddDesign
    },
    {
      path: '/add-design',
      name: 'add-design',
      component: AddDesign,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AddDesign,
    },
    {
      path: '/designs',
      name: 'Designs',
      component: Designs,
    },
    {
      path: '/create-design',
      name: 'CreateDesign',
      component: CreateDesign,
    },
  ]
})

export default router
