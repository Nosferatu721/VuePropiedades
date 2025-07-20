import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const router = useRouter()

  const errorMsg = ref('')
  const authUser = ref(null)

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user
        router.push({ name: 'admin-propiedades' })
      } else {
        authUser.value = null
      }
    })
  })

  const login = (credentials) => {
    errorMsg.value = ''
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user
        authUser.value = user
        router.push({ name: 'admin-propiedades' })
      })
      .catch((error) => {
        errorMsg.value = error.message
      })
  }

  const logout = async () => {
    try {
      await signOut(auth)
      authUser.value = null
      router.push({ name: 'home' })
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const hasError = computed(() => {
    return errorMsg.value !== ''
  })

  const isAuthenticated = computed(() => {
    return authUser.value !== null
  })

  return {
    login,
    errorMsg,
    hasError,
    isAuthenticated,
    authUser,
    logout,
  }
})
