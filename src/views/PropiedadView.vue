<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFirestore, useDocument } from 'vuefire'
import { doc } from 'firebase/firestore'
import { pricePropertyFormat } from '@/helpers'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import useLocationMap from '@/composables/useLocationMap'
const { zoom, center } = useLocationMap()

const route = useRoute()
const db = useFirestore()

const propiedadDoc = doc(db, 'propiedades', route.params.id)
const { data: propiedad } = useDocument(propiedadDoc)

watch(propiedad, (propiedad) => {
  if (propiedad) {
    center.value = propiedad.ubicacion || [0, 0]
  }
})
</script>

<template>
  <v-card flat>
    <v-card-title class="mt-5 text-h3 text-center py-5 font-weight-bold">{{ propiedad?.titulo }}</v-card-title>

    <v-img :src="propiedad?.imagen" height="400px"></v-img>

    <div class="bg-blue-grey-lighten-5 d-flex flex-column flex-md-row align-center justify-center p-5">
      <v-card-text>
        Precio:
        <span class="font-weight-bold">{{ pricePropertyFormat(propiedad?.precio) }}</span>
      </v-card-text>
      <v-card-text>
        Baños:
        <span class="font-weight-bold">{{ propiedad?.wc }}</span>
      </v-card-text>
      <v-card-text>
        Dormitorios:
        <span class="font-weight-bold">{{ propiedad?.habitaciones }}</span>
      </v-card-text>
      <v-card-text>
        Estacionamiento:
        <span class="font-weight-bold">{{ propiedad?.estacionamiento }}</span>
      </v-card-text>
    </div>

    <v-row class="py-5">
      <v-col cols="12" md="8">
        <div class="text-pre-wrap py-10">
          <p class="text-h5 font-weight-bold">Descripción:</p>
          <p>{{ propiedad?.descripcion }}</p>
        </div>
      </v-col>

      <v-col>
        <div style="height: 400px; width: 100%">
          <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :lat-lng="center">
              <LPopup>{{ propiedad?.titulo }}</LPopup>
            </LMarker>
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
          </LMap>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
