<template>
  <div class="hidden md:flex w-screen h-screen">
    <PageNav />
    <UCard class="p-4 w-full h-screen overflow-y-auto">
      <PageBreadcrumbs v-if="useRoute().name !== 'index'" />
      <slot />
    </UCard>
  </div>
  <UCard class="p-4 w-screen h-screen pb-24 overflow-y-auto md:hidden">
    <PageBreadcrumbs v-if="useRoute().name !== 'index'" />
    <slot />
    <PageNavbarMobile />
  </UCard>
</template>
