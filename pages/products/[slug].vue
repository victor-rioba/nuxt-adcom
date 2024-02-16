<script setup lang="ts">
const products = [
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

const slug = computed(() => (useRoute().params as { slug: string }).slug);

const isAddPage = computed(() => slug.value === "add");

const product = products[0];
const categories = products.map((p) => p.category);
const sCategories = ref([]);
</script>

<template>
  <UCard>
    <FormKit type="form" class="p-4">
      <div class="flex justify-between items-center mb-6">
        <h5
          class="text-md font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Edit Product
        </h5>
        <div class="flex items-center gap-4">
          <UButton
            v-if="isAddPage"
            icon="i-heroicons-plus-20-solid"
            label="Add Product"
            size="md"
          />
          <UButton
            v-else
            icon="i-heroicons-pencil-square-20-solid"
            label="Edit Product"
            size="md"
          />
          <UButton
            icon="i-heroicons-trash-20-solid"
            label="Delete"
            color="red"
            variant="outline"
            size="md"
          />
          <UButton
            icon="i-heroicons-x-mark-20-solid"
            label="Discard"
            color="gray"
            variant="outline"
            size="md"
          />
        </div>
      </div>
      <div class="grid gap-4 sm:grid-cols-3 sm:gap-6">
        <div class="space-y-4 sm:col-span-2 sm:space-y-6">
          <FormKit
            type="text"
            label="Product Name"
            name="title"
            placeholder="Type product name"
          />

          <FormKit
            type="text"
            label="SKU (Store Keeping Unit)"
            name="sku"
            placeholder="Product SKU"
          />

          <UFormGroup label="Description" name="description">
            <div
              class="px-4 py-3 border border-gray-300 border-b-0 shadow-sm rounded-t-md text-xl text-gray-500 flex items-center space-x-6 bg-gray-50"
            >
              <UButton
                :padded="false"
                variant="link"
                color="gray"
                icon="i-heroicons-paper-clip-20-solid"
              />
              <UButton
                :padded="false"
                variant="link"
                color="gray"
                icon="i-heroicons-map-pin-20-solid"
              />
              <UButton
                :padded="false"
                variant="link"
                color="gray"
                icon="i-heroicons-photo-20-solid"
              />
              <UButton
                :padded="false"
                variant="link"
                color="gray"
                icon="i-heroicons-code-bracket-square-20-solid"
              />
              <UButton
                :padded="false"
                variant="link"
                color="gray"
                icon="i-heroicons-face-smile-solid"
              />
              <UButton
                :padded="false"
                variant="link"
                color="gray"
                icon="i-heroicons-link-20-solid"
              />
            </div>
            <UTextarea
              placeholder="Write product description here"
              variant="outline"
              :rows="6"
              autoresize
              :ui="{ rounded: 'rounded-t-none' }"
            />
          </UFormGroup>

          <FormKit
            type="select"
            label="Category"
            name="category"
            placeholder="Select Categories"
            :options="categories"
          />
          <!-- <USelectMenu
            v-model="sCategories"
            :options="categories"
            placeholder="Select Categories"
            multiple
            color="gray"
            variant="outline"
            size="md"
          /> -->

          <UDivider />

          <FormKit
            type="text"
            label="Brand"
            name="brand"
            placeholder="Product Brand"
          />

          <FormKit
            type="text"
            label="Barcode"
            name="barcode"
            placeholder="Product Barcode"
          />

          <UDivider />

          <FormKit
            type="number"
            label="Item Weight (kg)"
            name="weight"
            placeholder="Ex. 12"
          />

          <FormKit
            type="number"
            label="Length (cm)"
            name="length"
            placeholder="Ex. 105"
          />

          <FormKit
            type="number"
            label="Breadth (cm)"
            name="breadth"
            placeholder="Ex. 15"
          />

          <FormKit
            type="number"
            label="Width (cm)"
            name="width"
            placeholder="Ex. 23"
          />

          <!-- fixme -->
          <FormKit
            type="checkbox"
            label="Product has multiple options, like different colors or sizes"
            name="varied"
          />

          <!-- <FormKit
            type="datepicker"
            label="Created At"
            name="datepicker"
            placeholder="Select date"
          /> -->

          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              datepicker=""
              id="datepicker"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
              value="15/08/2022"
              placeholder="Select date"
            />
          </div>
        </div>

        <div class="space-y-4 sm:space-y-6">
          <div class="mb-4">
            <div class="grid gap-4 mt-2 mb-8">
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  :src="product.image"
                  alt=""
                />
              </div>
              <div class="grid grid-cols-5 gap-4">
                <div>
                  <img
                    class="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    class="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    class="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    class="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    class="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div
                  class="flex flex-col items-center justify-center pt-5 pb-6"
                >
                  <svg
                    aria-hidden="true"
                    class="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewbox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span>
                    or drag and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </FormKit>

    <!-- <UForm class="p-4">
      <div class="flex justify-between items-center mb-6">
        <h5
          class="text-md font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Edit Product
        </h5>
        <div class="flex items-center gap-4">
          <UButton
            v-if="isAddPage"
            icon="i-heroicons-plus-20-solid"
            label="Add Product"
            size="md"
          />
          <UButton
            v-else
            icon="i-heroicons-pencil-square-20-solid"
            label="Edit Product"
            size="md"
          />
          <UButton
            icon="i-heroicons-trash-20-solid"
            label="Delete"
            color="red"
            variant="outline"
            size="md"
          />
          <UButton
            icon="i-heroicons-x-mark-20-solid"
            label="Discard"
            color="gray"
            variant="outline"
            size="md"
          />
        </div>
      </div>
      <div class="grid gap-4 sm:grid-cols-3 sm:gap-6">
        <div class="space-y-4 sm:col-span-2 sm:space-y-6">
          <UFormGroup label="Product Name" name="title">
            <UInput
              size="md"
              placeholder="Type product name"
              color="gray"
              variant="outline"
            />
          </UFormGroup>

          <UFormGroup label="SKU (Store Keeping Unit)" name="sku">
            <UInput
              size="md"
              placeholder="Product SKU"
              color="gray"
              variant="outline"
            />
          </UFormGroup>

          <UFormGroup label="Description" name="description">
            <div
              class="px-4 py-3 border border-gray-300 border-b-0 shadow-sm rounded-t-md text-xl text-gray-500 flex items-center space-x-6 bg-gray-50"
            >
              <UButton
                :padded="false"
                variant="link"
                color="gray"
                icon="i-heroicons-paper-clip-20-solid"
              />
              <UButton
                :padded="false"
                variant="link"
                color="gray"
                icon="i-heroicons-map-pin-20-solid"
              />
              <UButton
                :padded="false"
                variant="link"
                color="gray"
                icon="i-heroicons-photo-20-solid"
              />
              <UButton
                :padded="false"
                variant="link"
                color="gray"
                icon="i-heroicons-code-bracket-square-20-solid"
              />
              <UButton
                :padded="false"
                variant="link"
                color="gray"
                icon="i-heroicons-face-smile-solid"
              />
              <UButton
                :padded="false"
                variant="link"
                color="gray"
                icon="i-heroicons-link-20-solid"
              />
            </div>
            <UTextarea
              placeholder="Write product description here"
              variant="outline"
              :rows="6"
              autoresize
              :ui="{ rounded: 'rounded-t-none' }"
            />
          </UFormGroup>

          <UFormGroup label="Category" name="category">
            <USelectMenu
              v-model="sCategories"
              :options="categories"
              placeholder="Select Categories"
              multiple
              color="gray"
              variant="outline"
              size="md"
            />
          </UFormGroup>

          <UDivider />

          <UFormGroup label="Brand" name="brand">
            <UInput
              size="md"
              placeholder="Product Brand"
              color="gray"
              variant="outline"
            />
          </UFormGroup>

          <UFormGroup label="Barcode" name="barcode">
            <UInput
              size="md"
              placeholder="Product Barcode"
              color="gray"
              variant="outline"
            />
          </UFormGroup>

          <UDivider />

          <UFormGroup label="Item Weight (kg)" name="weight">
            <UInput
              size="md"
              placeholder="Ex. 12"
              color="gray"
              variant="outline"
            />
          </UFormGroup>

          <UFormGroup label="Length (cm)" name="length">
            <UInput
              size="md"
              placeholder="Ex. 105"
              color="gray"
              variant="outline"
            />
          </UFormGroup>

          <UFormGroup label="Breadth (cm)" name="breadth">
            <UInput
              size="md"
              placeholder="Ex. 15"
              color="gray"
              variant="outline"
            />
          </UFormGroup>

          <UFormGroup label="Width (cm)" name="width">
            <UInput
              size="md"
              placeholder="Ex. 23"
              color="gray"
              variant="outline"
            />
          </UFormGroup>

          <UCheckbox
            name="varied"
            label="Product has multiple options, like different colors or
              sizes"
          />

          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              datepicker=""
              id="datepicker"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
              value="15/08/2022"
              placeholder="Select date"
            />
          </div>
        </div>
        <div class="space-y-4 sm:space-y-6">
          <div class="mb-4">
            <div class="grid gap-4 mt-2 mb-8">
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  :src="product.image"
                  alt=""
                />
              </div>
              <div class="grid grid-cols-5 gap-4">
                <div>
                  <img
                    class="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    class="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    class="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    class="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    class="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div
                  class="flex flex-col items-center justify-center pt-5 pb-6"
                >
                  <svg
                    aria-hidden="true"
                    class="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewbox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span>
                    or drag and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </UForm> -->
  </UCard>
</template>
