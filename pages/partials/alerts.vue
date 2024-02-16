<template>
  <UAlert title="Heads up!" />
  <UAlert
    description="You can add components to your app using the cli."
    title="Heads up!"
  />
  <UAlert
    icon="i-heroicons-command-line"
    description="You can add components to your app using the cli."
    title="Heads up!"
  />
  <UAlert
    description="You can add components to your app using the cli."
    :avatar="{ src: 'https://avatars.githubusercontent.com/u/739984?v=4' }"
    title="Heads up!"
  />
  <UAlert
    icon="i-heroicons-command-line"
    color="primary"
    variant="solid"
    title="Heads up!"
    description="You can add components to your app using the cli."
  />
  <UAlert
    :close-button="{
      icon: 'i-heroicons-x-mark-20-solid',
      color: 'gray',
      variant: 'link',
      padded: false,
    }"
    title="Heads up!"
  />
  <UAlert
    :actions="[
      { variant: 'solid', color: 'primary', label: 'Action 1' },
      { variant: 'outline', color: 'primary', label: 'Action 2' },
    ]"
    title="Heads up!"
    description="You can add components to your app using the cli."
  />
</template>
