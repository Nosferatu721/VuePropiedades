<script setup>
import usePropiedades from '@/composables/usePropiedades'
import Propiedad from '../components/Propiedad.vue'

const { propiedadesFiltradas, alberca } = usePropiedades()
</script>

<template>
  <h1 class="text-center text-h3 font-weight-bold my-5">Nuestras propiedades</h1>

  <v-card flat class="py-10">
    <v-card-title class="text-h5">
      <v-checkbox v-model="alberca" label="Mostrar solo propiedades con alberca" />
    </v-card-title>
    <v-row>
      <Propiedad v-for="propiedad in propiedadesFiltradas" :key="propiedad.id" :propiedad="propiedad" class="mx-auto" />
    </v-row>
  </v-card>
</template>
