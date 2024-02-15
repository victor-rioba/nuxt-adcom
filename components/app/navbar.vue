<template>
  <nav class="flex justify-between  px-6 md:px-8 py-4 md:pr-12">
    <NuxtLink to="/">
      <nuxt-img
        format="webp"
        src="/img/logo-dark.png"
        width="80"
        height="30"
      />
    </NuxtLink>
    <div
      class="capitalize hidden md:flex gap-8 items-center font-semibold text-[#1d3752]"
    >
      <NuxtLink to="/developments">developments</NuxtLink>
      <NuxtLink to="/listings">listings</NuxtLink>
      <NuxtLink to="/blog">blog</NuxtLink>
      <NuxtLink
        to="/contact"
        class="bg-[#1d3752] text-white px-4 py-2 rounded-3xl text-sm"
      >
        contact us
      </NuxtLink>
    </div>
    <div class="md:hidden text-3xl text-[#1d3752] text-opacity-70">
      <Icon name="ph:list-bold" />
    </div>
  </nav>
</template>
