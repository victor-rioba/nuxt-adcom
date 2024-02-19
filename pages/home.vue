<script setup>
definePageMeta({
  layout: "landing",
});
</script>

<template>
  <div
    class="w-screen h-screen overflow-hidden flex flex-col bg-white text-gray-600 dark:bg-black dark:text-gray-300"
  >
    <header class="w-screen h-32 flex justify-between items-center px-10 py-10">
      <div
        class="flex gap-2 items-center justify-center text-azul-500 hover:text-azul-400 font-semibold text-2xl"
      >
        <UIcon name="i-solar-bag-check-broken" />
        <span>adcom.io</span>
      </div>
      <div class="space-x-4">
        <UButton label="Sign in" to="/api/login" external />
        <UButton
          variant="outline"
          label="Sign up"
          to="/api/register"
          external
        />
      </div>
    </header>

    <main class="grid place-content-center h-full text-center px-8 mx-auto">
      <span>
        <UIcon
          name="i-solar-bag-check-broken"
          class="text-azul-400 text-[200px]"
        />
      </span>
      <div>
        <span
          class="text-[4rem] md:text-[8rem] font-black bg-gradient bg-clipped"
        >
          Coming Soon
        </span>
      </div>
      <p class="text-center max-w-2xl mx-auto leading-8 py-8">
        The best e-commerce admin from Africa vetted by industry leading
        professionals. A well curated admin panel for engaged and driven
        individuals.
      </p>
      <div class="flex space-x-4">
        <UInput
          type="email"
          placeholder="Please enter your email address"
          class="flex-1"
          size="lg"
        />
        <UButton> Notify Me </UButton>
      </div>
    </main>
    <footer
      class="h-10 flex justify-between items-center px-10 py-10 text-gray-500 text-sm"
    >
      <span>Privacy Policy</span>
      <div class="space-x-2 text-lg">
        <UIcon name="i-ph-facebook-logo" />
        <UIcon name="i-ph-instagram-logo" />
        <UIcon name="i-ph-twitter-logo" />
      </div>
    </footer>
  </div>
</template>

<style scoped lang="css">
@import url("https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@700;800;900&display=swap");
.bg-gradient {
  background-color: #13adc7;
  background-image: linear-gradient(
    43deg,
    #3bcde3 0%,
    #138aa7 46%,
    #1b5b6f 100%
  );
}
.bg-clipped {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-family: "Lexend Deca", sans-serif;
}
</style>
