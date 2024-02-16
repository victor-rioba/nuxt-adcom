<template>
  <UCard class="p-4 w-screen h-screen pb-24 overflow-y-auto">
    <PageBreadcrumbs v-if="useRoute().name !== 'index'" />
    <slot />
    <PageNavbarMobile />
  </UCard>
</template>
