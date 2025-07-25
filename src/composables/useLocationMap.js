import { ref } from "vue"

export default function useLocationMap() {
  const zoom = ref(15)
  const center = ref([4.6509855, -74.0957274]) // Default center coordinates

  function setCenter(coordinates) {
    center.value = [coordinates.target._latlng.lat, coordinates.target._latlng.lng]
  }

  return {
    zoom,
    center,
    setCenter,
  }
}
