<script setup>
definePageMeta({
  middleware: ["auth-logged-in"],
});

const router = useRouter();
const toast = useToast();

const commandPaletteRef = ref();

const products = [
  {
    id: "1",
    label: 'Apple MacBook Pro 16"',
    href: "http://localhost:3000/products",
    avatar: {
      src: "https://images.macrumors.com/t/MwgTEggiztXrvIN2l8bZny1f93M=/1600x/article-new/2013/09/2023-macbook-pro-transparent.png",
      srcset:
        "https://images.macrumors.com/t/MwgTEggiztXrvIN2l8bZny1f93M=/1600x/article-new/2013/09/2023-macbook-pro-transparent.png",
      loading: "lazy",
    },
  },
  {
    id: "2",
    label: 'Samsung 32" UHD Curved Monitor',
    href: "http://localhost:3000/products",
    avatar: {
      src: "https://images.samsung.com/is/image/samsung/ae-uhd-u32r590cwm-lu32r590cwmxue-lperspectiveblack-167281200?$684_547_PNG$",
      srcset:
        "https://images.samsung.com/is/image/samsung/ae-uhd-u32r590cwm-lu32r590cwmxue-lperspectiveblack-167281200?$684_547_PNG$",
      loading: "lazy",
    },
  },
];

const actions = [
  {
    id: "new-product",
    label: "Add new product",
    icon: "i-heroicons-document-plus",
    click: () => toast.add({ title: "New product added!" }),
    shortcuts: ["⌘", "N"],
  },
  {
    id: "manage-files",
    label: "Manage files",
    icon: "i-heroicons-folder-plus",
    click: () => toast.add({ title: "New folder added!" }),
    shortcuts: ["⌘", "F"],
  },
  {
    id: "category",
    label: "Add category",
    icon: "i-heroicons-tag",
    click: () => toast.add({ title: "Category added!" }),
    shortcuts: ["⌘", "L"],
  },
];

const groups = computed(() =>
  [
    commandPaletteRef.value?.query
      ? {
          key: "products",
          commands: products,
        }
      : {
          key: "recent",
          label: "Recent searches",
          commands: products.slice(0, 2),
        },
    {
      key: "actions",
      commands: actions,
    },
  ].filter(Boolean)
);

function onSelect(option) {
  if (option.click) {
    option.click();
  } else if (option.to) {
    router.push(option.to);
  } else if (option.href) {
    window.open(option.href, "_blank");
  }
}
</script>

<template>
  <UContainer class="h-full space-y-10 pt-16">
    <div class="flex flex-col gap-8 items-center text-2xl py-4">
      <UIcon name="i-solar-bag-check-broken" class="text-4xl" />
      <h1>Welcome to adcom.io</h1>
    </div>
    <UCard>
      <UCommandPalette
        ref="commandPaletteRef"
        :groups="groups"
        :autoselect="false"
        @update:model-value="onSelect"
      />
    </UCard>
  </UContainer>
</template>
