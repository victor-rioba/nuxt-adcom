<script setup lang="ts">
const navigations = [
  {
    title: "Products",
    routes: [
      {
        name: "Product List",
        icon: "i-eos-icons-products-outlined",
        to: "/products",
      },
      {
        name: "Categories",
        icon: "i-clarity-blocks-group-solid-badged",
        to: "/products/categories",
      },
      {
        name: "Attributes",
        icon: "i-solar-checklist-minimalistic-linear",
        to: "/products/attributes",
      },
    ],
  },
  {
    title: "Customers",
    routes: [
      {
        name: "Customer List",
        icon: "i-solar-user-rounded-outline",
        to: "/customers",
      },
      {
        name: "Customer Groups",
        icon: "i-solar-users-group-rounded-linear",
        to: "/customers/groups",
      },
    ],
  },
  {
    title: "Orders",
    routes: [
      {
        name: "Order List",
        icon: "i-ci-shopping-bag-01",
        to: "/orders",
      },
      {
        name: "Invoices",
        icon: "i-basil-invoice-outline",
        to: "/orders/invoices",
      },
      {
        name: "Billing",
        icon: "i-solar-cash-out-linear",
        to: "/orders/billing",
      },
    ],
  },
  {
    title: "Marketing",
    routes: [
      {
        name: "Analytics",
        icon: "i-tabler-brand-google-analytics",
        to: "/marketing",
      },
      {
        name: "Discounts",
        icon: "i-tabler-discount-2",
        to: "/marketing/discounts",
      },
    ],
  },
  {
    title: "Store",
    routes: [
      {
        name: "Information",
        icon: "i-material-symbols-store-outline-rounded",
        to: "/stores",
      },
      {
        name: "Settings",
        icon: "i-lucide-cog",
        to: "/stores/settings",
      },
      {
        name: "Integrations",
        icon: "i-fluent-plug-connected-settings-24-regular",
        to: "/stores/integrations",
      },
    ],
  },
];

const showNav = ref(true);

const { $auth } = useNuxtApp();

const user = computed(() => $auth.user);

const items = [
  [
    {
      label: "Account",
      avatar: {
        src: user.value?.picture ?? "",
      },
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-heroicons-adjustments-horizontal-solid",
    },
  ],
  [
    {
      label: "Logout",
      icon: "i-heroicons-arrow-right-on-rectangle-20-solid",
      to: "/api/logout",
      external: true,
    },
  ],
];
</script>

<template>
  <UCard as="nav" class="relative min-w-fit">
    <NuxtLink
      to="/"
      class="flex gap-2 items-center mb-16 justify-center text-azul-500 hover:text-azul-400 font-semibold"
      :class="[showNav ? 'text-xl' : 'text-2xl']"
    >
      <UIcon name="i-solar-bag-check-broken" />
      <span v-show="showNav">adcom.io</span>
    </NuxtLink>
    <div
      v-for="(nav, i) in navigations"
      :key="nav.title"
      class="flex flex-col pt-4 text-gray-500 text-sm"
      :class="[
        showNav
          ? 'text-base'
          : 'text-xl border-t border-gray-200 pb-4 first:border-t-0',
        i === 0 ? 'border-t-0' : '',
      ]"
    >
      <span class="pb-1" v-show="showNav">{{ nav.title }}</span>
      <ULink
        :to="route.to"
        class="flex gap-2 items-center pl-3 py-1 hover:text-black"
        v-for="route in nav.routes"
        :key="route.name"
      >
        <UIcon v-if="showNav" :name="route.icon" />

        <UTooltip
          :text="route.name"
          :popper="{ placement: 'right' }"
          class="capitalize"
          v-else
        >
          <UIcon :name="route.icon" />
        </UTooltip>
        <span v-show="showNav">{{ route.name }}</span>
      </ULink>
    </div>

    <div
      class="absolute bottom-0 right-0 left-0 pb-8 px-4 flex items-center"
      :class="[showNav ? 'justify-between' : 'flex-col gap-4']"
    >
      <UDropdown :items="items" mode="hover">
        <UAvatar
          chip-color="primary"
          chip-text=""
          chip-position="top-right"
          size="sm"
          :src="user?.picture || ''"
          alt="Avatar"
        />
      </UDropdown>

      <UButton
        :padded="false"
        size="xl"
        color="gray"
        variant="link"
        @click="showNav = !showNav"
        :icon="
          showNav
            ? 'i-material-symbols-keyboard-double-arrow-left-rounded'
            : 'i-material-symbols-keyboard-double-arrow-right-rounded'
        "
      />
    </div>
  </UCard>
</template>
