<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

const props = defineProps<{
  product?: Product | null;
  images: Image[];
  hasImagesBeenEdited: boolean;
  isAddPage?: boolean;
}>();

const emit = defineEmits<{
  (event: "submit", payload: Partial<Product>): void;
  (event: "delete", productId: string): void;
  (event: "remove-image", imageId: string): void;
  (event: "open-media-gallery"): void;
  (event: "discard-changes"): void;
}>();

const state = reactive({
  name: "",
  sku: "",
  longDescription: "",
  price: "",
});

const hasBeenEdited = computed(() => {
  return (
    props.hasImagesBeenEdited ||
    state.name !== (props.product?.name || '') ||
    state.sku !== (props.product?.sku || '') ||
    state.longDescription !== (props.product?.longDescription || '') ||
    state.price !== (props.product?.price || '')
  );
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.name) errors.push({ path: "name", message: "Required" });
  if (!state.price) errors.push({ path: "price", message: "Required" });
  return errors;
};

const onSubmit = (_event: FormSubmitEvent<any>) => {
  const product = {
    name: state.name,
    sku: state.sku,
    longDescription: state.longDescription,
    price: state.price,
    slug: props.product?.slug || state.name.toLowerCase().replace(/\s/g, "-"),
    isActive: true, // todo: add isActive to the form
  };

  emit("submit", product);
};

const onDeleteProduct = async () => {
  emit("delete", props.product!.id);
};

const onRemoveImage = (id: string) => {
  emit("remove-image", id);
};

const onDiscardChanges = () => {
  state.name = props.product?.name || "";
  state.sku = props.product?.sku || "";
  state.longDescription = props.product?.longDescription || "";
  state.price = props.product?.price || "";
  emit("discard-changes");
};

const onOpenMediaGallery = () => {
  emit("open-media-gallery");
};

watchEffect(() => {
  state.name = props.product?.name || "";
  state.sku = props.product?.sku || "";
  state.longDescription = props.product?.longDescription || "";
  state.price = props.product?.price || "";
});
</script>

<template>
  <UForm :state="state" :validate="validate" class="p-4" @submit="onSubmit">
    <div class="flex justify-between items-center mb-6">
      <h5
        class="text-md font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        {{ isAddPage ? "Add" : "Edit" }} Product
      </h5>
      <div class="flex items-center gap-4">
        <UButton
          v-show="isAddPage && hasBeenEdited"
          icon="i-heroicons-plus-20-solid"
          label="Add Product"
          size="md"
          type="submit"
        />
        <UButton
          v-show="!isAddPage && hasBeenEdited"
          icon="i-heroicons-pencil-square-20-solid"
          label="Save Changes"
          size="md"
          type="submit"
        />
        <UButton
          v-show="hasBeenEdited"
          icon="i-heroicons-x-mark-20-solid"
          label="Discard"
          color="gray"
          variant="outline"
          size="md"
          @click="onDiscardChanges"
        />
        <UButton
          v-show="!isAddPage"
          icon="i-heroicons-trash-20-solid"
          label="Delete"
          color="red"
          variant="outline"
          size="md"
          @click="onDeleteProduct"
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
            :value="product?.createdAt"
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
              <div
                v-if="images.length"
                class="h-64 grid place-content-center relative"
              >
                <NuxtImg
                  provider="cloudinary"
                  :src="images[0].path"
                  format="webp"
                  alt="product main image"
                  class="h-[inherit] rounded-lg"
                />
                <UButton
                  icon="i-heroicons-trash-20-solid"
                  class="absolute text-red-500 text-3xl top-0 right-0 opacity-20 hover:opacity-100"
                  variant="ghost"
                  square
                  @click="onRemoveImage(images[0].id)"
                />
              </div>
              <div v-else class="flex items-center justify-center w-full">
                <div
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  @click="onOpenMediaGallery"
                >
                  <div
                    class="flex flex-col items-center justify-center pt-5 pb-6 gap-4"
                  >
                    <UIcon
                      name="i-heroicons-plus-circle-20-solid"
                      class="text-4xl text-primary"
                    />
                    <p
                      class="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400"
                    >
                      Click to add image
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="images.length" class="grid grid-cols-5 gap-4">
              <div
                v-for="image in images.slice(1)"
                :key="image.id"
                class="relative"
              >
                <NuxtImg
                  provider="cloudinary"
                  :src="image.path"
                  format="webp"
                  class="h-auto max-w-full rounded-lg"
                />
                <UButton
                  icon="i-heroicons-trash-20-solid"
                  class="absolute text-red-500 text-3xl -top-4 -right-4 opacity-20 hover:opacity-100"
                  variant="ghost"
                  square
                  @click="onRemoveImage(image.id)"
                />
              </div>
              <div class="relative">
                <NuxtImg
                  provider="cloudinary"
                  src="/v1708501493/placeholder.png"
                  format="webp"
                  class="h-auto max-w-full rounded-lg"
                />
                <button
                  type="button"
                  class="text-4xl bg-black text-white bg-opacity-20 opacity-50 hover:opacity-100 rounded-[10px] absolute inset-0 grid place-content-center z-10 cursor-pointer"
                  @click="onOpenMediaGallery"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UForm>
</template>
