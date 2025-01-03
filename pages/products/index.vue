<script setup lang="ts">
import { format } from "date-fns"
import type { Product } from "~/types"

definePageMeta({
  middleware: ["auth-logged-in"],
})

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
  key: key as string,
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
  <UCard>
    <div
      class="my-2 flex flex-col justify-between space-y-4 border-b border-gray-200 px-3 pb-4 md:flex-row md:space-y-0"
    >
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        size="sm"
        color="white"
        :trailing="false"
        @update:model-value="onQueryChange"
        placeholder="Search products..."
      />
      <div
        class="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-6 md:space-y-0"
      >
        <UButton
          icon="i-heroicons-plus-20-solid"
          label="Add Product"
          to="/products/add"
        />
        <div class="flex items-center gap-1.5">
          <span class="text-sm leading-5">Rows per page:</span>

          <USelect
            v-model="perPage"
            :options="[3, 5, 10, 20, 30, 40]"
            class="me-2 w-20"
            size="xs"
          />
        </div>
        <USelectMenu v-model="selectedColumns" :options="columns" multiple>
          <UButton icon="i-heroicons-view-columns" color="gray" size="xs">
            Select Columns
          </UButton>
        </USelectMenu>
        <USelectMenu
          v-model="action"
          :options="actions"
          placeholder="Actions"
        />
      </div>
    </div>
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
            class="rounded"
            provider="cloudinary"
            src="/v1708501493/placeholder.png"
            format="webp"
            height="40"
          />
          <NuxtImg
            v-else
            class="rounded"
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
          <span class="text-sm font-medium text-gray-900">{{ row.name }}</span>
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
        <span>{{ format(new Date(row.createdAt), `do MMMM yyyy`) }}</span>
      </template>

      <template #updatedAt-data="{ row }">
        <span>{{ format(new Date(row.updatedAt), `do MMMM yyyy`) }}</span>
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
    <div
      class="flex items-center justify-between border-t border-gray-200 px-3 pt-4"
      v-if="pagination?.total && pagination.total > 0"
    >
      <span class="text-sm opacity-50">
        Showing {{ pagination.from || 1 }} - {{ pagination.to }} of
        {{ pagination.total }}
      </span>
      <UPagination
        :model-value="pagination.currentPage"
        :page-count="pagination.lastPage"
        :total="pagination.lastPage"
        @update:model-value="onPageChange"
      />
    </div>
  </UCard>
</template>
