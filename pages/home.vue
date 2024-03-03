<script setup>
definePageMeta({
  layout: "landing",
})
</script>

<template>
  <div
    class="flex h-screen w-screen flex-col overflow-hidden bg-white text-gray-600 dark:bg-black dark:text-gray-300"
  >
    <header class="flex h-32 w-screen items-center justify-between px-10 py-10">
      <div
        class="flex items-center justify-center gap-2 text-2xl font-semibold text-dodger-blue-500 hover:text-dodger-blue-400"
      >
        <PageLogo class="text-3xl" />
        <span class="hidden md:block">adcom.io</span>
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

    <main class="mx-auto grid h-full place-content-center px-8 text-center">
      <div class="flex items-center justify-center">
        <PageLogo class="text-primary text-[200px]" />
      </div>
      <div>
        <span
          class="text-primary font-lexend text-[4rem] font-black md:text-[8rem]"
        >
          Coming Soon
        </span>
      </div>
      <p class="mx-auto max-w-2xl py-8 text-center leading-8">
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
      class="flex h-10 items-center justify-between px-10 py-10 text-sm text-gray-500"
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

.font-lexend {
  font-family: "Lexend Deca";
}
</style>
