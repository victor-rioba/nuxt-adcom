<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

const toast = useToast();

const productId = computed(() => (useRoute().params as { slug: string }).slug);

const isAddPage = computed(() => productId.value === "add");

const data = ref<Product>();

const state = reactive({
  name: "",
  sku: "",
  longDescription: "",
  price: "",
});

const slug = computed(() => state.name.toLowerCase().replace(/\s/g, "-"));

const images = ref<string[]>([]);

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.name) errors.push({ path: "name", message: "Required" });
  if (!state.price) errors.push({ path: "price", message: "Required" });
  return errors;
};

type ProductRequest = {
  slug: string;
  images: string[];
  isActive: boolean;
  name: string;
  sku: string;
  longDescription: string;
  price: string;
};

const createProduct = async (product: ProductRequest) => {
  const res = await $fetch("/api/products", {
    method: "POST",
    body: product,
  });

  navigateTo({ name: "products-slug", params: { slug: res.id } });
};

const updateProduct = async (product: ProductRequest) => {
  const res = await $fetch(`/api/products/${productId.value}`, {
    method: "PUT",
    body: product,
  });
  state.name = res.name;
  state.sku = res.sku || "";
  state.longDescription = res.longDescription || "";
  state.price = res.price;
  images.value = res.images;
};

async function onSubmit(_event: FormSubmitEvent<any>) {
  const product = {
    ...state,
    slug: slug.value,
    images: images.value,
    isActive: true,
  };

  if (isAddPage.value) {
    await createProduct(product);
    toast.add({
      icon: "i-heroicons-check-circle",
      title: "Product added successfully",
    });
  } else {
    await updateProduct(product);
    toast.add({
      icon: "i-heroicons-check-circle",
      title: "Product updated successfully",
    });
  }
}

const onDeleteProduct = async () => {
  await $fetch(`/api/products/${productId.value}`, { method: "DELETE" });
  toast.add({
    icon: "i-heroicons-trash-20-solid",
    title: "Product deleted successfully",
  });
  navigateTo({ name: "products" });
};

const onDiscardChanges = () => {
  navigateTo({ name: "products-slug", params: { slug: productId.value } });
};

watch(
  data,
  (value) => {
    if (value) {
      state.name = value.name;
      state.sku = value.sku || "";
      state.longDescription = value.longDescription || "";
      state.price = value.price;
      // images.value = value.images;
    }
  },
  { immediate: true }
);

onMounted(async () => {
  if (isAddPage.value) return;
  await $fetch(`/api/products/${productId.value}`).then(
    (res) => (data.value = res)
  );
});
</script>

<template>
  <UCard>
    <UForm :state="state" :validate="validate" class="p-4" @submit="onSubmit">
      <div class="flex justify-between items-center mb-6">
        <h5
          class="text-md font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          {{ isAddPage ? "Add" : "Edit" }} Product
        </h5>
        <div class="flex items-center gap-4">
          <UButton
            v-if="isAddPage"
            icon="i-heroicons-plus-20-solid"
            label="Add Product"
            size="md"
            type="submit"
          />
          <UButton
            v-else
            icon="i-heroicons-pencil-square-20-solid"
            label="Edit Product"
            size="md"
            type="submit"
          />
          <UButton
            icon="i-heroicons-trash-20-solid"
            label="Delete"
            color="red"
            variant="outline"
            size="md"
            @click="onDeleteProduct"
          />
          <UButton
            icon="i-heroicons-x-mark-20-solid"
            label="Discard"
            color="gray"
            variant="outline"
            size="md"
            @click="onDiscardChanges"
          />
        </div>
      </div>
      <div class="grid gap-4 sm:grid-cols-3 sm:gap-6">
        <div class="space-y-4 sm:col-span-2 sm:space-y-6">
          <UFormGroup label="Product Name" name="name">
            <UInput
              size="md"
              placeholder="Type product name"
              color="gray"
              variant="outline"
              v-model="state.name"
            />
          </UFormGroup>

          <UFormGroup label="SKU (Store Keeping Unit)" name="sku">
            <UInput
              size="md"
              placeholder="Product SKU"
              color="gray"
              variant="outline"
              v-model="state.sku"
            />
          </UFormGroup>

          <UFormGroup label="Price" name="price">
            <UInput
              size="md"
              placeholder="Product Price"
              color="gray"
              variant="outline"
              v-model="state.price"
            />
          </UFormGroup>

          <UFormGroup label="Description" name="longDescription">
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
              v-model="state.longDescription"
            />
          </UFormGroup>

          <!-- <UFormGroup label="Category" name="category">
            <USelectMenu
              v-model="form.category"
              :options="categories"
              placeholder="Select Categories"
              multiple
              color="gray"
              variant="outline"
              size="md"
            />
          </UFormGroup> -->

          <!-- <UDivider />

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

          <UDivider /> -->

          <!-- <UFormGroup label="Item Weight (kg)" name="weight">
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
          </UFormGroup> -->

          <!-- <UCheckbox
            name="varied"
            label="Product has multiple options, like different colors or
              sizes"
          /> -->

          <!-- createdAt -->
          <div v-if="!isAddPage" class="relative">
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
              id="datepicker"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
              :value="data?.createdAt"
              placeholder="Select date"
              datepicker
              disabled
            />
          </div>
        </div>
        <div class="space-y-4 sm:space-y-6">
          <div class="mb-4">
            <div class="grid gap-4 mt-2 mb-8">
              <div>
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
                    <UInput id="dropzone-file" type="file" class="hidden" />
                  </label>
                </div>
                <img
                  v-if="images.length"
                  class="h-auto max-w-full rounded-lg"
                  src=""
                  alt="product main image"
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
            <!-- <div class="flex items-center justify-center w-full">
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
                <UInput id="dropzone-file" type="file" class="hidden" />
              </label>
            </div> -->
          </div>
        </div>
      </div>
    </UForm>
  </UCard>
</template>
