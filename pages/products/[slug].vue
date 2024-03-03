<script setup lang="ts">
import type { Product, Image, ProductRequest } from "~/types"
const toast = useToast()

const slug = computed(() => (useRoute().params as { slug: string }).slug)

const { data } = await useFetch(`/api/products/${slug.value}`)

const productImages = computed(() => data.value?.images || [])

const addedImages = ref<Image[]>([])

const removedImageIds = ref<string[]>([])

const images = computed(() =>
  [...productImages.value, ...addedImages.value].filter(
    (img) => !removedImageIds.value.includes(img.id),
  ),
)

const addedImageIds = computed(() => addedImages.value.map((img) => img.id))

const hasImagesBeenEdited = computed(() =>
  Boolean(addedImageIds.value.length || removedImageIds.value.length),
)

const updateProduct = async (body: ProductRequest) => {
  const res = await $fetch(`/api/products/${data.value!.id}`, {
    method: "PUT",
    body,
  })
  toast.add({
    icon: "i-heroicons-check-circle",
    title: "Product updated successfully",
  })
  data.value = res
  addedImages.value = []
  removedImageIds.value = []
}

async function onSubmit(formState: Partial<Product>) {
  const data = {
    ...formState,
    images: [
      ...addedImageIds.value.map((id) => ({ id, deleted: false })),
      ...removedImageIds.value.map((id) => ({ id, deleted: true })),
    ],
  }
  return updateProduct(data)
}

const onDeleteProduct = async (productId: string) => {
  await $fetch(`/api/products/${productId}`, { method: "DELETE" })
  toast.add({
    icon: "i-heroicons-trash-20-solid",
    title: "Product deleted successfully",
  })
  navigateTo({ name: "products" })
}

const onRemoveImage = (imageId: string) => {
  if (addedImageIds.value.includes(imageId)) {
    addedImages.value = addedImages.value.filter((img) => img.id !== imageId)
  } else {
    removedImageIds.value.push(imageId)
  }
}

const isMediaGalleryOpen = ref(false)

const onChoose = (image: Image) => {
  if (productImages.value.some((img) => img.id === image.id)) {
    toast.add({
      icon: "i-heroicons-exclamation-circle",
      title: "Image already added to product",
    })
    return
  }
  addedImages.value.push(image)
  isMediaGalleryOpen.value = false
}

const onDiscardChanges = () => {
  addedImages.value = []
  removedImageIds.value = []
}
</script>

<template>
  <UCard>
    <ProductFormAddEdit
      :product="data"
      :images="images"
      :has-images-been-edited="hasImagesBeenEdited"
      @submit="onSubmit"
      @delete="onDeleteProduct"
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
