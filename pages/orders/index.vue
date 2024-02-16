<script setup>
const sort = ref({
  column: "name",
  direction: "desc",
});

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "image",
    label: "Image",
  },
  {
    key: "title",
    label: "Title",
    sortable: true,
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "category",
    label: "Category",
  },
  {
    key: "price",
    label: "Price",
    sortable: true,
  },
  {
    key: "brand",
    label: "Brand",
  },
  {
    key: "stock",
    label: "In Stock",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "createdAt",
    label: "Date Added",
    sortable: true,
    direction: "desc",
  },
  {
    key: "updatedAt",
    label: "Date Modified",
    sortable: true,
    direction: "desc",
  },
];

// const selectedColumns = ref(columns);
const selectedColumns = ref(columns.filter((col) => col.key !== "description"));
const columnsTable = computed(() => {
  return [
    ...columns.filter((column) => selectedColumns.value.includes(column)),
    {
      key: "actions",
    },
  ];
});

const data = [
  {
    id: "1",
    title: 'Apple MacBook Pro 16"',
    description:
      "Apple M1 chip with 8‑core CPU, 8‑core GPU, and 16‑core Neural Engine",
    price: "$1,299.00",
    status: true,
    image:
      "https://images.macrumors.com/t/MwgTEggiztXrvIN2l8bZny1f93M=/1600x/article-new/2013/09/2023-macbook-pro-transparent.png",
    stock: 62,
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
    category: "Computers",
    brand: "Apple",
  },
  {
    id: "2",
    title: "iPhone 15 Pro Max",
    description:
      "Apple M1 chip with 8‑core CPU, 8‑core GPU, and 16‑core Neural Engine",
    price: "$1,099.00",
    status: false,
    image:
      "https://www.apple.com/v/iphone/home/bn/images/overview/compare/compare_iphone_14_pro__cjmfbiggqhpy_large.jpg",
    stock: 0,
    createdAt: "2023-10-01",
    updatedAt: "2023-10-01",
    category: "Phones",
    brand: "Apple",
  },
  {
    id: "3",
    title: 'Samsung 32" UHD Curved Monitor',
    description: "Curved Monitor with 1 Billion colors",
    price: "$800.00",
    status: true,
    image:
      "https://images.samsung.com/is/image/samsung/ae-uhd-u32r590cwm-lu32r590cwmxue-lperspectiveblack-167281200?$684_547_PNG$",
    stock: 5,
    createdAt: "2023-12-01",
    updatedAt: "2023-13-01",
    category: "Monitors",
    brand: "Samsung",
  },
  {
    id: "4",
    title: "Samsung Galaxy S23 Ultra",
    description: "Curved Monitor with 1 Billion colors",
    price: "$1,000.00",
    status: true,
    image:
      "https://images.samsung.com/africa_en/smartphones/galaxy-s23-ultra/buy/nonshop_green.jpg",
    stock: 5,
    createdAt: "2023-12-01",
    updatedAt: "2023-13-01",
    category: "Phones",
    brand: "Samsung",
  },
  {
    id: "5",
    title: "Sony Alpha a7 IV",
    description: "Mirrorless Digital Camera with 28-70mm Lens",
    price: "$2,480.00",
    status: false,
    image:
      "https://www.camerasafrica.com/wp-content/uploads/2021/11/Sony-Alpha-a7-IV-Mirrorless-Digital-Camera-with-28-70mm-Lens-camerasafrica.jpg",
    stock: 0,
    createdAt: "2023-01-01",
    updatedAt: "2023-09-01",
    category: "Cameras",
    brand: "Sony",
  },
  {
    id: "6",
    title: "Logitech MX Master 3s",
    description: "Advanced wireless mouse",
    price: "$219.00",
    status: true,
    image:
      "https://resource.logitech.com/w_150,c_limit,f_auto,q_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-black.png?v=1",
    stock: 16,
    createdAt: "2023-01-01",
    updatedAt: "2023-09-01",
    category: "Mouse",
    brand: "Logitech",
  },
  {
    id: "7",
    title: "Homepod Mini",
    description: "Smart Speaker with Siri",
    price: "$150.00",
    status: true,
    image:
      "https://www.phoneplacekenya.com/wp-content/uploads/2021/01/HomePod-mini-b.jpg",
    stock: 22,
    createdAt: "2023-12-01",
    updatedAt: "2023-13-01",
    category: "Speakers",
    brand: "Apple",
  },
  {
    id: "8",
    title: "Huawei Watch Fit 2",
    description: 'Smart Watch with 1.64" AMOLED Display',
    price: "$160.00",
    status: false,
    image:
      "https://www.phoneplacekenya.com/wp-content/uploads/2022/06/Huawei-Watch-Fit-2.jpg",
    stock: 0,
    createdAt: "2023-12-01",
    updatedAt: "2023-13-01",
    category: "Smart Watches",
    brand: "Huawei",
  },
  {
    id: "9",
    title: "Samsung Galaxy Watch 4",
    description: 'Smart Watch with 1.64" AMOLED Display',
    price: "$220.00",
    status: true,
    image:
      "https://www.phoneplacekenya.com/wp-content/uploads/2022/08/Samsung-Galaxy-Watch-5-Pro-c.jpg",
    stock: 31,
    createdAt: "2023-01-01",
    updatedAt: "2023-09-01",
    category: "Smart Watches",
    brand: "Samsung",
  },
  {
    id: "10",
    title: "HP Z32 4K UHD IPS Monitor",
    description:
      '4K UHD IPS Monitor with 31.5" Display and 3840 x 2160 Resolution',
    price: "$999.00",
    status: true,
    image: "https://support.hp.com/doc-images/604/c05856329.jpg",
    stock: 3,
    createdAt: "2023-01-01",
    updatedAt: "2023-09-01",
    category: "Monitors",
    brand: "HP",
  },
  {
    id: "1",
    title: 'Apple MacBook Pro 16"',
    description:
      "Apple M1 chip with 8‑core CPU, 8‑core GPU, and 16‑core Neural Engine",
    price: "$1,299.00",
    status: true,
    image:
      "https://images.macrumors.com/t/MwgTEggiztXrvIN2l8bZny1f93M=/1600x/article-new/2013/09/2023-macbook-pro-transparent.png",
    stock: 62,
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
    category: "Computers",
    brand: "Apple",
  },
  {
    id: "2",
    title: "iPhone 15 Pro Max",
    description:
      "Apple M1 chip with 8‑core CPU, 8‑core GPU, and 16‑core Neural Engine",
    price: "$1,099.00",
    status: false,
    image:
      "https://www.apple.com/v/iphone/home/bn/images/overview/compare/compare_iphone_14_pro__cjmfbiggqhpy_large.jpg",
    stock: 0,
    createdAt: "2023-10-01",
    updatedAt: "2023-10-01",
    category: "Phones",
    brand: "Apple",
  },
  {
    id: "3",
    title: 'Samsung 32" UHD Curved Monitor',
    description: "Curved Monitor with 1 Billion colors",
    price: "$800.00",
    status: true,
    image:
      "https://images.samsung.com/is/image/samsung/ae-uhd-u32r590cwm-lu32r590cwmxue-lperspectiveblack-167281200?$684_547_PNG$",
    stock: 5,
    createdAt: "2023-12-01",
    updatedAt: "2023-13-01",
    category: "Monitors",
    brand: "Samsung",
  },
  {
    id: "4",
    title: "Samsung Galaxy S23 Ultra",
    description: "Curved Monitor with 1 Billion colors",
    price: "$1,000.00",
    status: true,
    image:
      "https://images.samsung.com/africa_en/smartphones/galaxy-s23-ultra/buy/nonshop_green.jpg",
    stock: 5,
    createdAt: "2023-12-01",
    updatedAt: "2023-13-01",
    category: "Phones",
    brand: "Samsung",
  },
  {
    id: "5",
    title: "Sony Alpha a7 IV",
    description: "Mirrorless Digital Camera with 28-70mm Lens",
    price: "$2,480.00",
    status: false,
    image:
      "https://www.camerasafrica.com/wp-content/uploads/2021/11/Sony-Alpha-a7-IV-Mirrorless-Digital-Camera-with-28-70mm-Lens-camerasafrica.jpg",
    stock: 0,
    createdAt: "2023-01-01",
    updatedAt: "2023-09-01",
    category: "Cameras",
    brand: "Sony",
  },
  {
    id: "6",
    title: "Logitech MX Master 3s",
    description: "Advanced wireless mouse",
    price: "$219.00",
    status: true,
    image:
      "https://resource.logitech.com/w_150,c_limit,f_auto,q_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-black.png?v=1",
    stock: 16,
    createdAt: "2023-01-01",
    updatedAt: "2023-09-01",
    category: "Mouse",
    brand: "Logitech",
  },
  {
    id: "7",
    title: "Homepod Mini",
    description: "Smart Speaker with Siri",
    price: "$150.00",
    status: true,
    image:
      "https://www.phoneplacekenya.com/wp-content/uploads/2021/01/HomePod-mini-b.jpg",
    stock: 22,
    createdAt: "2023-12-01",
    updatedAt: "2023-13-01",
    category: "Speakers",
    brand: "Apple",
  },
  {
    id: "8",
    title: "Huawei Watch Fit 2",
    description: 'Smart Watch with 1.64" AMOLED Display',
    price: "$160.00",
    status: false,
    image:
      "https://www.phoneplacekenya.com/wp-content/uploads/2022/06/Huawei-Watch-Fit-2.jpg",
    stock: 0,
    createdAt: "2023-12-01",
    updatedAt: "2023-13-01",
    category: "Smart Watches",
    brand: "Huawei",
  },
  {
    id: "9",
    title: "Samsung Galaxy Watch 4",
    description: 'Smart Watch with 1.64" AMOLED Display',
    price: "$220.00",
    status: true,
    image:
      "https://www.phoneplacekenya.com/wp-content/uploads/2022/08/Samsung-Galaxy-Watch-5-Pro-c.jpg",
    stock: 31,
    createdAt: "2023-01-01",
    updatedAt: "2023-09-01",
    category: "Smart Watches",
    brand: "Samsung",
  },
  {
    id: "10",
    title: "HP Z32 4K UHD IPS Monitor",
    description:
      '4K UHD IPS Monitor with 31.5" Display and 3840 x 2160 Resolution',
    price: "$999.00",
    status: true,
    image: "https://support.hp.com/doc-images/604/c05856329.jpg",
    stock: 3,
    createdAt: "2023-01-01",
    updatedAt: "2023-09-01",
    category: "Monitors",
    brand: "HP",
  },
];

const selected = ref([]);

function select(row) {
  const index = selected.value.findIndex((item) => item.id === row.id);
  if (index === -1) {
    selected.value.push(row);
  } else {
    selected.value.splice(index, 1);
  }
}

const action = ref("");

const actions = ["Categorize", "Delete"];

const query = ref("");

const page = ref(1);
const pageCount = ref(10);
const offset = computed(() => (page.value - 1) * pageCount.value);

const filteredRows = computed(() => {
  return (
    query.value
      ? data.filter((person) => {
          return Object.values(person).some((value) => {
            return String(value)
              .toLowerCase()
              .includes(query.value.toLowerCase());
          });
        })
      : data
  ).slice(offset.value, page.value * pageCount.value);
});

const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
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
    },
  ],
];
</script>

<template>
  <UCard>
    <div
      class="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between px-3 pb-4 border-b border-gray-200 my-2"
    >
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        size="sm"
        color="white"
        :trailing="false"
        v-model="query"
        placeholder="Search products..."
      />
      <div
        class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6"
      >
        <div class="flex items-center gap-1.5">
          <span class="text-sm leading-5">Rows per page:</span>

          <USelect
            v-model="pageCount"
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
      :rows="filteredRows"
      @select="select"
    >
      <template #image-data="{ row }">
        <div class="h-6 flex items-center justify-center -ml-6">
          <img class="h-6" :src="row.image" />
        </div>
      </template>

      <template #category-data="{ row }">
        <UBadge
          size="xs"
          :label="row.category"
          color="green"
          variant="subtle"
        />
      </template>

      <template #status-data="{ row }">
        <div class="text-sm flex items-center gap-1">
          <span>{{ row.status ? "Published" : "Draft" }}</span>
          <span
            class="h-[6px] w-[6px] rounded-full"
            :class="{ 'bg-green-500': row.status, 'bg-red-400': !row.status }"
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
        <UDropdown :items="items(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
    </UTable>
    <div
      class="flex justify-between items-center px-3 pt-4 border-t border-gray-200"
    >
      <span class="text-sm opacity-50">
        Showing {{ offset + 1 }} - {{ offset + Number(pageCount) }} of
        {{ data.length }}
      </span>
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="data.length"
      />
    </div>
  </UCard>
</template>
