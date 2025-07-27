import { getCurrentUser } from 'vuefire'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/propiedad/:id',
      name: 'propiedad',
      component: () => import('../views/PropiedadView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      meta: { requiresAuth: true },
      component: () => import('../views/admin/AdminLayout.vue'),
      children: [
        {
          path: 'propiedades',
          name: 'admin-propiedades',
          component: () => import('../views/admin/AdminView.vue'),
        },
        {
          path: 'editar-propiedad/:id',
          name: 'admin-editarPropiedad',
          component: () => import('../views/admin/EditarPropiedadView.vue'),
        },
        {
          path: 'nueva-propiedad',
          name: 'admin-nuevaPropiedad',
          component: () => import('../views/admin/NuevaPropiedadView.vue'),
        },
      ],
    },
  ],
})

// Guard de navegacion
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth) {
    try {
      // Opción más simple con getCurrentUser de VueFire
      const user = await getCurrentUser()
      if (user) {
        next()
      } else {
        throw new Error('User not authenticated')
      }
    } catch (error) {
      console.error('Authentication error:', error)
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
