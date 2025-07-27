<script setup>
import { pricePropertyFormat } from '@/helpers'

const props = defineProps({
  propiedad: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <v-col cols="12" md="4">
    <v-card>
      <v-img :src="propiedad.imagen" height="250px" cover></v-img>
      <v-card-title>{{ propiedad.titulo }}</v-card-title>
      <v-card-text class="text-truncate">{{ propiedad.descripcion }}</v-card-text>
      <v-card-text>Precio: {{ pricePropertyFormat(propiedad.precio) }}</v-card-text>
      <template v-slot:actions>
        <v-btn :to="{ name: 'propiedad', params: { id: propiedad.id } }" color="info" block variant="tonal">Ver informacion</v-btn>
      </template>
    </v-card>
  </v-col>
</template>
