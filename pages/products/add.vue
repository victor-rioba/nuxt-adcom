<script setup lang="ts">
import { ProductAddEditForm } from "~/features/products";

const toast = useToast();

const images = ref<Image[]>([]);

const addedImageIds = computed(() => images.value.map((img) => img.id));

const hasImagesBeenEdited = computed(() => Boolean(addedImageIds.value.length));

type ProductRequest = Partial<Omit<Product, "images">> & {
  images: { id: string; deleted: boolean }[];
};

const createProduct = async (body: ProductRequest) => {
  const res = await $fetch("/api/products", {
    method: "POST",
    body,
  });
  toast.add({
    icon: "i-heroicons-check-circle",
    title: "Product added successfully",
  });

  navigateTo({ name: "products-slug", params: { slug: res.slug } });
};

async function onSubmit(formState: Partial<Product>) {
  const data = {
    ...formState,
    images: [...addedImageIds.value.map((id) => ({ id, deleted: false }))],
  };
  return createProduct(data);
}

const onRemoveImage = (id: string) => {
  images.value = images.value.filter((img) => img.id !== id);
};

const isMediaGalleryOpen = ref(false);

const onChoose = (image: Image) => {
  images.value.push(image);
  isMediaGalleryOpen.value = false;
};

const onDiscardChanges = () => {
  images.value = [];
};
</script>

<template>
  <UCard>
    <ProductAddEditForm
      :images="images"
      :has-images-been-edited="hasImagesBeenEdited"
      :is-add-page="true"
      @submit="onSubmit"
      @remove-image="onRemoveImage"
      @open-media-gallery="isMediaGalleryOpen = true"
      @discard-changes="onDiscardChanges"
    />
    <UModal
      v-model="isMediaGalleryOpen"
      :ui="{
        width: 'lg:max-w-[75vw]',
      }"
    >
      <MediaLibrary @choose="onChoose" />
    </UModal>
  </UCard>
</template>
