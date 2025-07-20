<script setup>
import { useForm, useField } from 'vee-validate'
import { loginSchema } from '@/validation/loginSchema'
import { useAuthStore } from '@/stores/auth'

const storeAuth = useAuthStore()

const { handleSubmit } = useForm({
  validationSchema: loginSchema,
})
const email = useField('email')
const password = useField('password')
const submit = handleSubmit((values) => {
  storeAuth.login(values)
})
</script>

<template>
  <v-card flat max-width="600" class="mx-auto">
    <v-card-title class="text-center text-h4 font-weight-bold" tag="h3">Iniciar Sesion</v-card-title>
    <v-card-subtitle class="text-h5 text-center">Inicia sesion con tu cuenta</v-card-subtitle>

    <!-- Alert -->
    <v-alert
      text="Credenciales incorrectas"
      title="Error"
      type="error"
      v-if="storeAuth.hasError"
    ></v-alert>

    <v-form class="mt-5">
      <v-text-field
        type="email"
        label="Email"
        bg-color="blue-grey-lighten-5"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
      />
      <v-text-field
        type="password"
        label="Contraseña"
        bg-color="blue-grey-lighten-5"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
      />
      <v-btn type="submit" color="indigo-darken-3" class="mt-5" block @click="submit">Iniciar Sesion</v-btn>
    </v-form>
  </v-card>
</template>
