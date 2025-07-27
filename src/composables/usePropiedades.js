import { computed, ref } from 'vue'
import { collection, doc, deleteDoc } from 'firebase/firestore'
import {ref as storageRef, deleteObject} from 'firebase/storage'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'

export default function usePropiedades() {
  const alberca = ref(false)

  const storage = useFirebaseStorage()
  const db = useFirestore()
  const propiedadesCollection = useCollection(collection(db, 'propiedades'))

  const deletePropiedad = async (id, imagePath) => {
    try {
      const imageRef = storageRef(storage, imagePath)
      console.log('Eliminando imagen:', imageRef)
      await deleteDoc(doc(db, 'propiedades', id))
      await deleteObject(imageRef)
    } catch (error) {
      console.error('Error al eliminar la propiedad:', error)
    }
  }

  const propiedadesFiltradas = computed(() => {
    return alberca.value ? propiedadesCollection.value.filter((propiedad) => propiedad.alberca) : propiedadesCollection.value
  })

  return {
    propiedadesCollection,
    propiedadesFiltradas,
    alberca,
    deletePropiedad,
  }
}
