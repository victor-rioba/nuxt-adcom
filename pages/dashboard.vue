<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue"
import type { Product } from "~/types"

definePageMeta({
  layout: false,
})

const { user } = useAuth()
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
]

const navigations = [
  {
    title: "Products",
    current: true,
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
]

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
]

type SortBy = "asc" | "desc"

const sort = ref({
  column: "name",
  direction: "desc" as SortBy,
})

type ProductField = keyof Product

const columnLabels: Record<ProductField, string> = {
  id: "ID",
  slug: "Slug",
  sku: "SKU",
  storeId: "Store ID",
  name: "Name",
  shortDescription: "Summary",
  longDescription: "Description",
  price: "Price",
  available: "In Stock",
  isActive: "Status",
  createdAt: "Date Added",
  updatedAt: "Date Modified",
  deletedAt: "Date Deleted",

  images: "Image",
  categories: "Categories",
  attributes: "Attributes",
  variants: "Variants",
}

const columnsToShow: ProductField[] = [
  "slug",
  "images",
  "name",
  "shortDescription",
  "longDescription",
  "price",
  "available",
  "isActive",
  "createdAt",
  "updatedAt",
]

const sortableColumns: ProductField[] = [
  "name",
  "price",
  "createdAt",
  "updatedAt",
]

const descColumns: ProductField[] = ["createdAt", "updatedAt"]

const columns = columnsToShow.map((key) => ({
  key,
  label: columnLabels[key],
  sortable: sortableColumns.includes(key),
  direction: descColumns.includes(key) ? ("desc" as SortBy) : ("asc" as SortBy),
}))

const selectedColumns = ref(columns)

const columnsTable = computed(() => {
  return [
    ...columns.filter((column) => selectedColumns.value.includes(column)),
    {
      key: "actions",
    },
  ]
})

const { data } = await useFetch("/api/products")

const list = computed(() => data.value?.data || [])

const pagination = computed(() => data.value?.pagination)

const page = ref(pagination.value?.currentPage || 1)

const perPage = ref(pagination.value?.perPage || 10)

const selected = ref<Product[]>([])

function select(row: Product) {
  const index = selected.value.findIndex((item) => item.id === row.id)
  if (index === -1) {
    selected.value.push(row)
  } else {
    selected.value.splice(index, 1)
  }
}

function onPageChange(page: number) {
  console.log("Page", page)
}

function onQueryChange(query: string) {
  console.log("Query", query)
}

const action = ref("")

const actions = ["Categorize", "Delete"]

const items = (row: Product) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => navigateTo(`/products/${row.slug}`),
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
    },
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid",
    },
    {
      label: "Move",
      icon: "i-heroicons-arrow-right-circle-20-solid",
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => $fetch(`/api/products/${row.id}`, { method: "DELETE" }),
    },
  ],
]
</script>

<template>
  <Body class="bg-[#fafafa]">
    <div class="min-h-full">
      <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between pt-4">
            <div class="flex items-center gap-1">
              <div class="flex-shrink-0">
                <PageLogo class="h-8 w-auto" />
              </div>
              <span class="mr-2 size-[6px] rounded-full bg-black"></span>
              <div
                class="flex items-center gap-2 rounded-full bg-gray-200 px-2"
              >
                <span class="py-[2px] text-xs font-semibold">sirkastik</span>
              </div>
              <span class="cursor-pointer rounded p-1 hover:bg-gray-200">
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 16 24"
                >
                  <path
                    d="M13 8.517L8 3 3 8.517M3 15.48l5 5.517 5-5.517"
                  ></path>
                </svg>
              </span>
            </div>
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  class="relative flex size-7 items-center justify-center rounded-full border"
                >
                  <span class="sr-only">View notifications</span>
                  <UIcon name="i-heroicons-bell" />
                </button>

                <!-- Profile dropdown -->
                <Menu as="div" class="relative ml-3">
                  <div>
                    <MenuButton
                      class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span class="absolute -inset-1.5" />
                      <span class="sr-only">Open user menu</span>
                      <img
                        class="h-7 w-7 rounded-full"
                        :src="user?.picture || ''"
                        alt=""
                      />
                    </MenuButton>
                  </div>
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <MenuItem
                        v-for="item in userNavigation"
                        :key="item.name"
                        v-slot="{ active }"
                      >
                        <a
                          :href="item.href"
                          :class="[
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700',
                          ]"
                          >{{ item.name }}</a
                        >
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton
                class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Open main menu</span>
                <UIcon
                  v-if="!open"
                  name="i-heroicons-menu-20-solid"
                  class="block h-6 w-6"
                />
                <UIcon
                  v-else
                  name="i-heroicons-x-mark"
                  class="block h-6 w-6"
                  aria-hidden="true"
                />
              </DisclosureButton>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="flex items-baseline space-x-4 pt-2">
              <NuxtLink
                v-for="item in navigations"
                :key="item.title"
                :to="{ name: 'dashboard' }"
                class="relative px-3 py-2 text-sm"
                :class="[
                  item.current
                    ? 'border-b-2 border-black font-semibold'
                    : 'font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
              >
                {{ item.title }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <DisclosurePanel class="md:hidden">
          <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <DisclosureButton
              v-for="item in navigation"
              :key="item.name"
              as="a"
              :href="item.href"
              :class="[
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              ]"
              :aria-current="item.current ? 'page' : undefined"
              >{{ item.name }}</DisclosureButton
            >
          </div>
          <div class="border-t border-gray-700 pb-3 pt-4">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <img
                  class="h-10 w-10 rounded-full"
                  :src="user?.picture || ''"
                  alt=""
                />
              </div>
              <div class="ml-3">
                <div class="text-base font-medium leading-none text-white">
                  {{ user?.given_name }}
                </div>
                <div class="text-sm font-medium leading-none text-gray-400">
                  {{ user?.email }}
                </div>
              </div>
              <button
                type="button"
                class="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">View notifications</span>
                <UIcon name="i-heroicons-bell-20-solid" class="h-6 w-6" />
              </button>
            </div>
            <div class="mt-3 space-y-1 px-2">
              <DisclosureButton
                v-for="item in userNavigation"
                :key="item.name"
                as="a"
                :href="item.href"
                class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >{{ item.name }}</DisclosureButton
              >
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

      <!-- <header>
      <div class="px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
      </div>
    </header> -->
      <main class="2xl:px-40">
        <div class="max-w-8xl mx-auto space-y-4 py-6 sm:px-6 lg:px-8">
          <div
            class="flex flex-col justify-between space-x-0 space-y-4 pb-4 md:flex-row md:space-x-2 md:space-y-0"
          >
            <UInput
              icon="i-heroicons-magnifying-glass-20-solid"
              size="lg"
              color="white"
              :trailing="false"
              placeholder="Search products..."
              class="flex-grow"
              @update:model-value="onQueryChange"
            />
            <USelectMenu v-model="selectedColumns" :options="columns" multiple>
              <UButton icon="i-heroicons-view-columns" color="white" size="lg">
                Select Columns
              </UButton>
            </USelectMenu>
            <!-- <USelect
            v-model="perPage"
            :options="[3, 5, 10, 20, 30, 40]"
            class="me-2 w-20"
          /> -->
            <USelectMenu
              v-model="action"
              :options="actions"
              placeholder="Actions"
              size="lg"
            />
            <UButton
              icon="i-heroicons-plus-20-solid"
              label="Add Product"
              to="/products/add"
              color="black"
            />
          </div>
          <UCard :ui="{ body: { padding: '!px-0 !py-0 !pt-1' } }">
            <UTable
              v-model="selected"
              v-model:sort="sort"
              :columns="columnsTable"
              :rows="list"
              @select="select"
            >
              <template #images-data="{ row }">
                <div class="flex h-6 items-center justify-center">
                  <NuxtImg
                    v-if="!row.images?.length"
                    provider="cloudinary"
                    src="/v1708501493/placeholder.png"
                    format="webp"
                    height="40"
                  />
                  <NuxtImg
                    v-else
                    provider="cloudinary"
                    :src="row.images[0].path"
                    format="webp"
                    height="40"
                  />
                </div>
              </template>

              <template #name-data="{ row }">
                <NuxtLink
                  :to="{
                    name: 'products-slug',
                    params: { slug: row.slug },
                  }"
                  @click.stop=""
                >
                  <span class="text-sm font-medium text-gray-900">{{
                    row.name
                  }}</span>
                </NuxtLink>
              </template>

              <!-- <template #category-data="{ row }">
            <UBadge size="xs" :label="row.category" color="dodger-blue" variant="subtle" />
          </template> -->

              <template #isActive-data="{ row }">
                <div class="flex items-center gap-1 text-sm">
                  <span>{{ row.isActive ? "Published" : "Draft" }}</span>
                  <span
                    class="h-[6px] w-[6px] rounded-full"
                    :class="{
                      'bg-green-500': row.isActive,
                      'bg-red-400': !row.isActive,
                    }"
                  ></span>
                </div>
              </template>

              <template #createdAt-data="{ row }">
                <span>{{ new Date(row.createdAt).toDateString() }}</span>
              </template>

              <template #updatedAt-data="{ row }">
                <span>{{ new Date(row.updatedAt).toDateString() }}</span>
              </template>

              <template #actions-data="{ row }">
                <UDropdown :items="items(row)" @click.stop="">
                  <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-ellipsis-horizontal-20-solid"
                  />
                </UDropdown>
              </template>
            </UTable>
          </UCard>
          <div
            v-if="pagination?.total && pagination.lastPage > 1"
            class="flex items-center justify-between gap-4"
          >
            <UButton
              class="pointer-events-none flex-grow text-sm opacity-50 shadow"
              color="white"
              size="lg"
            >
              Showing {{ pagination.from + 1 }} - {{ pagination.to }} of
              {{ pagination.total }}
            </UButton>
            <UPagination
              :model-value="pagination.currentPage"
              :page-count="pagination.lastPage"
              :total="pagination.lastPage"
              size="lg"
              @update:model-value="onPageChange"
            />
          </div>
        </div>
      </main>
    </div>
  </Body>
</template>
