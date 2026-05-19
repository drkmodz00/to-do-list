<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 350px">

      <div class="text-h6 q-mb-md">Register</div>

      <q-input v-model="email" label="Email" />
      <q-input v-model="password" label="Password" type="password" class="q-mt-sm" />

      <q-btn
        label="Create account"
        color="primary"
        class="full-width q-mt-md"
        @click="register"
      />

      <q-btn
        flat
        label="Back to login"
        class="full-width q-mt-sm"
        to="/login"
      />

    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth-store'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const auth = useAuthStore()
const router = useRouter()

const register = async () => {
  try {
    await auth.register(email.value, password.value)
    await router.push('/login')
  } catch (err) {
    console.error(err)
  }
}
</script>