import { createRouter, createWebHistory } from 'vue-router'
import EditDesignOperations from '../views/EditDesignOperations.vue'
import Designs from '../views/Designs.vue'
import CreateDesign from '../views/CreateDesign.vue'
import PlatformsSettings from '../views/PlatformsSettings.vue'
import EditDesign from '../views/EditDesign.vue'
import Settings from '../views/Settings.vue'
import Help from '../views/Help.vue'
import FirstSteps from '../views/FirstSteps.vue'
import RemoveFooter from '../views/RemoveFooter.vue'

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
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    },
    {
      path: '/help',
      name: 'Help',
      component: Help,
    },
    {
      path: '/first-steps',
      name: 'FirstSteps',
      component: FirstSteps,
    },
    {
      path: '/remove-footer',
      name: 'RemoveFooter',
      component: RemoveFooter,
    },
  ]
})

export default router
