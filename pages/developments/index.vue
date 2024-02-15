<script setup lang="ts">
const projects = [
  {
    index: 1,
    name: "Evoque",
    location: "Seaside Residences",
    logo: "https://static.wixstatic.com/media/2b71ec_002820280fbd4645af085b9c240f46d2~mv2.png/v1/fill/w_530,h_170,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Evoque-Logo-03.png",
    images: [
      "https://static.wixstatic.com/media/2b71ec_1f193b95042444edacb29b3066d9ddfe~mv2.png/v1/fill/w_870,h_590,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/2b71ec_1f193b95042444edacb29b3066d9ddfe~mv2.png",
    ],
    price: "FROM KSHS 6,500,000",
    beds: "1, 2 & 3",
  },
];
</script>

<template>
  <ul class="flex flex-col gap-20 py-20 justify-center">
    <li
      v-for="project in projects"
      :key="project.index"
      class="flex flex-col md:flex-row px-6 md:px-0 md:gap-16 items-start justify-center"
    >
      <NuxtImg :src="project.logo" class="md:hidden mx-auto" />
      <NuxtImg :src="project.images[0]" class="rounded-sm shadow-md" />
      <div class="flex flex-col justify-start">
        <NuxtImg :src="project.logo" class="mb-3 hidden md:block" />
        <span class="uppercase my-3 md:text-lg md:font-semibold">
          {{ project.name }} | {{ project.location }}
        </span>
        <div class="flex gap-6 md:justify-between items-center my-1">
          <span class="uppercase"
            ><Icon name="ic:baseline-bedroom-parent" /> Beds</span
          >
          <span>{{ project.beds }}</span>
        </div>
        <div class="flex gap-6 md:justify-between items-center my-1">
          <span class="uppercase"
            ><Icon name="fluent:money-16-filled" /> Price</span
          >
          <span>{{ project.price }}</span>
        </div>
        <div class="flex gap-6 md:justify-between items-center my-1">
          <span class="uppercase"><Icon name="gridicons:layout" /> Plans</span>
          <NuxtLink to="/">view</NuxtLink>
        </div>
        <button class="border border-black uppercase py-2 mt-3">Details</button>
      </div>
    </li>
  </ul>
</template>
