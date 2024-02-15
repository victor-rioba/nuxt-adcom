<script setup lang="ts">
const email = ref("");

const handleSubmit = (e: any) => {
  console.log(e);
};

const scrollUp = (to: string) => {
  window.scroll(0, 0);
  navigateTo(to);
};
</script>

<template>
  <div
    class=" bg-[#1d3752] mt-10 text-gray-400 px-10 mx-6 md:mx-8 mb-8 rounded-xl"
  >
    <div
      class="py-16 flex flex-col gap-12 md:grid md:grid-cols-6 md:gap-4 justify-items-center"
    >
      <div class="col-span-2 flex flex-col gap-5">
        <div class="flex gap-4 items-center text-xl font-semibold">
          <NuxtImg
            src="https://heimatconsult.co.ke/wp-content/uploads/2022/10/logo.jpg"
            format="webp"
            height="40"
            width="84"
            alt="logo"
          />
          Heimat Consult Limited
        </div>
        <div>
          <h3 class="pb-4 text-lg font-semibold">Location:</h3>
          <p>BP Plaza (1st floor), Umoja Road,Nyali.</p>
          <p>P.O. Box 95670-80106 | Mombasa, Kenya.</p>
          <h3 class="py-3 text-lg font-semibold">Working hours:</h3>
          <p>Mon – Fri – 8:00am – 5:00pm</p>
          <p>Sat – 8:30am – 1:00pm</p>
        </div>
      </div>
      <div>
        <div class="uppercase font-semibold opacity-70 pb-3">Services</div>
        <span class="py-1 block">Real Estate Management</span>
        <span class="py-1 block">Property Management</span>
        <span class="py-1 block">Survey & Valuation</span>
        <span class="py-1 block">Construction</span>
        <span class="py-1 block">Property Development</span>
        <span class="py-1 block">Consultancy & Advisory Services</span>
      </div>
      <div class="flex flex-col">
        <div class="li-title uppercase font-semibold opacity-70 pb-3">
          Company
        </div>
        <NuxtLink to="/about" class="li py-1">About</NuxtLink>
        <NuxtLink to="/blog" class="li py-1">Blog</NuxtLink>
        <div class="li py-1">Jobs</div>
        <div class="li py-1">Partners</div>
        <div class="li-title uppercase font-semibold opacity-70 py-3">
          Layouts
        </div>
      </div>
      <div class="col-span-2 flex flex-col gap-4">
        <div>
          <div class="uppercase font-semibold opacity-70 pb-3">
            Get In Touch
          </div>
          <p class="py-1">
            <Icon name="ic:baseline-call" /> 0795333777 | 0792 111 777
          </p>
          <p class="py-1">
            <Icon name="tabler:mail-filled" /> info@heimatconsult.co.ke
          </p>
          <p class="py-1">
            <Icon name="tabler:mail-filled" /> sales@heimatconsult.co.ke
          </p>
        </div>
        <div class="social flex gap-12 text-3xl opacity-60">
          <Icon name="ic:outline-facebook" />
          <Icon name="uil:instagram" />
          <Icon name="ic:outline-tiktok" />
          <Icon name="ri:twitter-x-fill" />
        </div>
      </div>
    </div>
    <div
      class="py-5 text-center border-t border-t-gray-600 font-semibold opacity-70"
    >
      Copyright &copy; {{ new Date().getFullYear() }} Heimat Consult Limited
    </div>
  </div>
</template>
