import { createRouter, createWebHistory } from 'vue-router'
import EditDesignOperations from '../views/EditDesignOperations.vue'
import Designs from '../views/Designs.vue'
import CreateDesign from '../views/CreateDesign.vue'
import PlatformsSettings from '../views/PlatformsSettings.vue'
import EditDesign from '../views/EditDesign.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CreateDesign
    },
    {
      path: '/edit-design-details/:id',
      name: 'EditDesign',
      component: EditDesign,
      props: true,
    },
    {
      path: '/edit-design-operations/:id',
      name: 'EditDesignOperations',
      component: EditDesignOperations,
      props: true,
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
    {
      path: '/platforms-settings',
      name: 'PlatformsSettings',
      component: PlatformsSettings,
    },
  ]
})

export default router
