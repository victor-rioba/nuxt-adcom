<script setup lang="ts">
const props = defineProps<{ error: any }>();

if (props.error.statusCode == 401) {
  if (useRoute().name === "index") {
    navigateTo("/home");
  } else {
    navigateTo("/api/login", { external: true });
  }
}

const handleError = () => clearError({ redirect: "/home" });
</script>

<template>
  <div class="w-screen h-screen grid place-content-center text-center">
    <h2 class="text-xl py-4">{{ error.statusCode }}</h2>
    <UButton size="lg" @click="handleError">Go Home</UButton>
  </div>
</template>
