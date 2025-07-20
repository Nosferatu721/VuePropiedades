import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import HomeView from '../views/HomeView.vue'

const auth = useFirebaseAuth()

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
      path: '/admin',
      name: 'admin',
      meta: { requiresAuth: true },
      component: () => import('../views/admin/AdminLayout.vue'),
      children: [
        {
          path: '/admin/propiedades',
          name: 'admin-propiedades',
          component: () => import('../views/admin/AdminView.vue'),
        },
        {
          path: '/admin/editar-propiedad/:id',
          name: 'admin-editarPropiedad',
          component: () => import('../views/admin/EditarPropiedadView.vue'),
        },
        {
          path: '/admin/nueva-propiedad',
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
      await authenticateUser()
      next()
    } catch {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

function authenticateUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe() // Detener la escucha una vez que se ha verificado el estado de autenticación
      if (user) {
        resolve(true)
      } else {
        reject(new Error('User not authenticated'))
      }
    })
  })
}

export default router
