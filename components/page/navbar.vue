<script setup>
const items = [
  {
    label: "Products",
    icon: "i-heroicons-rectangle-group",
    defaultOpen: true,
    links: [
      { label: "List products", to: "/products" },
      { label: "Create product" },
      { label: "List attributes" },
      { label: "List categories", to: "/categories" },
      { label: "Create category" },
    ],
  },
  {
    label: "Customers",
    icon: "i-heroicons-rectangle-group",
    links: [
      { label: "List customers", to: "customers" },
      { label: "Add customer" },
      { label: "Customer groups", to: "customers" },
    ],
  },
  {
    label: "Orders",
    icon: "i-heroicons-square-3-stack-3d",
    links: [
      { label: "List orders", to: "/orders" },
      { label: "Create order" },
      { label: "Invoices" },
    ],
  },
  {
    label: "Settings",
    icon: "i-heroicons-wrench-screwdriver",
    links: [
      { label: "Store", to: "/" },
      { label: "User", to: "/auth/signup" },
    ],
  },
];

const hoveredRoute = ref("");

const topLinks = [
  {
    name: "index",
    label: "dashboard",
    icon: `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92c0 .9-.18 1.75-.5 2.54l2.62 1.53c.56-1.24.88-2.62.88-4.07c0-5.18-3.95-9.45-9-9.95M12 19a7 7 0 0 1-7-7c0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95a10 10 0 0 0 10 10c3.3 0 6.23-1.61 8.05-4.09l-2.6-1.53A6.89 6.89 0 0 1 12 19Z"
            />
          </svg>
    `,
  },
  {
    name: "products",
    icon: `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M17 24h4v4h-4zm7 0h4v4h-4zm-7-7h4v4h-4zm7 0h4v4h-4z"
            />
            <path
              fill="currentColor"
              d="M28 11h-6V7c0-1.7-1.3-3-3-3h-6c-1.7 0-3 1.3-3 3v4H4c-.6 0-1 .4-1 1v.2l1.9 12.1c.1 1 1 1.7 2 1.7H15v-2H6.9L5.2 13H28v-2zM12 7c0-.6.4-1 1-1h6c.6 0 1 .4 1 1v4h-8V7z"
            />
          </svg>
    `,
  },
  {
    name: "customers",
    icon: `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M7 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm7.5 1a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175a6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755a4.502 4.502 0 0 1 5.874 2.636a.818.818 0 0 1-.36.98A7.465 7.465 0 0 1 14.5 16Z"
            />
          </svg>
    `,
  },
  {
    name: "orders",
    icon: `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M96 216a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm88-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm46.44-132.75A8 8 0 0 0 224 64H48.32l-8.11-28.4A16.08 16.08 0 0 0 24.82 24H8a8 8 0 0 0 0 16h16.82L61 166.59A24.11 24.11 0 0 0 84.07 184h96.11a23.89 23.89 0 0 0 22.94-16.94l28.53-92.71a8 8 0 0 0-1.21-7.1Z"
            />
          </svg>
    `,
  },
  {
    name: "invoices",
    icon: `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 32 32"
          >
            <path
              d="M26 22a3.86 3.86 0 0 0-2 .57l-3.09-3.1a6 6 0 0 0 0-6.94L24 9.43a3.86 3.86 0 0 0 2 .57a4 4 0 1 0-4-4a3.86 3.86 0 0 0 .57 2l-3.1 3.09a6 6 0 0 0-6.94 0L9.43 8A3.86 3.86 0 0 0 10 6a4 4 0 1 0-4 4a3.86 3.86 0 0 0 2-.57l3.09 3.1a6 6 0 0 0 0 6.94L8 22.57A3.86 3.86 0 0 0 6 22a4 4 0 1 0 4 4a3.86 3.86 0 0 0-.57-2l3.1-3.09a6 6 0 0 0 6.94 0l3.1 3.09a3.86 3.86 0 0 0-.57 2a4 4 0 1 0 4-4zm-10-2a4 4 0 1 1 4-4a4 4 0 0 1-4 4z"
              fill="currentColor"
            />
          </svg>
    `,
  },
];

const bottomLinks = [
  {
    name: "store",
    icon: `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M464 448V267.85a104.76 104.76 0 0 1-33.56 6.58c-1.18 0-2.3.05-3.4.05a108 108 0 0 1-56.86-16a108 108 0 0 1-56.85 16a106.16 106.16 0 0 1-56.51-16.2a107.84 107.84 0 0 1-57.2 16.2a106.14 106.14 0 0 1-56.85-16.42a106.14 106.14 0 0 1-56.85 16.42c-1.09 0-2.19 0-3.37-.05h-.06A104.66 104.66 0 0 1 48 267.49V448H16v32h480v-32Zm-240-64h-96v-76a4 4 0 0 1 4-4h88a4 4 0 0 1 4 4Zm160 64h-80V308a4 4 0 0 1 4-4h72a4 4 0 0 1 4 4Zm108.57-277.72L445.89 64C432 32 432 32 400 32H112c-32 0-32 0-45.94 32L19.38 170.28c-9 19.41 2.89 39.34 2.9 39.35l.41.66c.42.66 1.13 1.75 1.62 2.37c.1.13.19.27.28.4l5.24 6.39l5.31 5.14l.42.36a69.65 69.65 0 0 0 9.44 6.78v.05a74 74 0 0 0 36 10.67h2.47a76.08 76.08 0 0 0 51.89-20.31a72.38 72.38 0 0 0 5.77-6a74.18 74.18 0 0 0 5.78 6a76.08 76.08 0 0 0 51.89 20.31c23.28 0 44.07-10 57.63-25.56a.11.11 0 0 1 .15 0l5.66 5.26a76.09 76.09 0 0 0 51.9 20.31c23.29 0 44.11-10 57.66-25.61c13.56 15.61 34.37 25.61 57.67 25.61h2.49a71.35 71.35 0 0 0 35-10.7c.95-.57 1.86-1.17 2.78-1.77A71.33 71.33 0 0 0 488 212.17l2-3c.9-2.04 11.21-20.3 2.57-38.89Z"
            />
          </svg>
    `,
  },
  {
    name: "analytics",
    icon: `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 32 32"
          >
            <path fill="currentColor" d="M4 2H2v26a2 2 0 0 0 2 2h26v-2H4Z" />
            <path
              fill="currentColor"
              d="M30 9h-7v2h3.59L19 18.59l-4.29-4.3a1 1 0 0 0-1.42 0L6 21.59L7.41 23L14 16.41l4.29 4.3a1 1 0 0 0 1.42 0l8.29-8.3V16h2Z"
            />
          </svg>
    `,
  },
  {
    name: "pages",
    icon: `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            >
              <path d="M7 18h7m-7-4h1m-1-4h3M7 2h9.5L21 6.5V19" />
              <path
                d="M3 20.5v-14A1.5 1.5 0 0 1 4.5 5h9.752a.6.6 0 0 1 .424.176l3.148 3.148A.6.6 0 0 1 18 8.75V20.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 3 20.5Z"
              />
              <path d="M14 5v3.4a.6.6 0 0 0 .6.6H18" />
            </g>
          </svg>
    `,
  },
];
</script>

<template>
  <UCard class="relative min-w-[5rem]">
    <ULink to="/" class="flex items-center justify-center gap-3 text-3xl">
      <UTooltip text="Mercury" :popper="{ placement: 'bottom' }">
        <UIcon name="i-heroicons-presentation-chart-line" />
      </UTooltip>
    </ULink>

    <ul class="space-y-2 mt-20">
      <li
        v-for="link in topLinks"
        :key="link.name"
        @mouseenter="hoveredRoute = link.label || link.name"
        @mouseleave="hoveredRoute = ''"
        class="relative cursor-pointer p-2 grid place-content-center text-2xl font-normal text-gray-600 hover:text-green-800 rounded-lg group"
        :class="{
          'text-green-600': useRoute().name === link.name,
        }"
        @click="useRouter().push({ name: link.name })"
      >
        <UTooltip
          :text="link.label || link.name"
          :popper="{ placement: 'right' }"
          class="capitalize"
        >
          <span v-html="link.icon.trim()"></span>
        </UTooltip>
      </li>
    </ul>
    <ul
      class="pt-5 mt-5 space-y-2 border-t border-gray-200"
    >
      <li
        v-for="link in bottomLinks"
        :key="link.name"
        @mouseenter="hoveredRoute = link.label || link.name"
        @mouseleave="hoveredRoute = ''"
        class="relative cursor-pointer p-2 grid place-content-center text-2xl font-normal text-gray-600 hover:text-gray-900 rounded-lg group"
        @click="useRouter().push({ name: link.name })"
      >
        <UTooltip
          :text="link.label || link.name"
          :popper="{ placement: 'right' }"
          class="capitalize"
        >
          <span v-html="link.icon.trim()"></span>
        </UTooltip>
      </li>
    </ul>

    <div
      class="absolute bottom-0 right-0 left-0 grid place-content-center pb-4"
    >
      <UAvatar
        chip-color="primary"
        chip-text=""
        chip-position="top-right"
        size="sm"
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        alt="Avatar"
      />
    </div>
  </UCard>
</template>
