<script setup>
import usePropiedades from '@/composables/usePropiedades'
import { pricePropertyFormat } from '@/helpers'

const { propiedadesCollection, deletePropiedad } = usePropiedades()
</script>

<template>
  <h2 class="text-center text-h3 my-5 font-weight-bold">Admin Dashboard</h2>

  <v-btn :to="{ name: 'admin-nuevaPropiedad' }" color="blue" variant="flat">Nueva Propiedad</v-btn>

  <v-card class="mx-auto mt-10">
    <v-list>
      <v-list-item v-for="propiedad in propiedadesCollection" :key="propiedad.id">
        <template v-slot:prepend>
          <v-list-item-media :start="true">
            <v-img :src="propiedad.imagen" width="180" />
          </v-list-item-media>
        </template>

        <v-list-item-title>{{ propiedad.titulo }}</v-list-item-title>
        <v-list-item-subtitle>{{ pricePropertyFormat(propiedad.precio) }}</v-list-item-subtitle>

        <template v-slot:append>
          <v-btn color="info" flat class="mr-2" :to="{ name: 'admin-editarPropiedad', params: { id: propiedad.id } }">Editar</v-btn>
          <v-btn color="red" flat @click="deletePropiedad(propiedad.id, propiedad.imagen)">Eliminar</v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
