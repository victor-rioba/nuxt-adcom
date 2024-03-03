<script setup lang="ts">
import type { Image } from "~/types"

const emit = defineEmits<{
  (event: "choose", image: Image): void;
}>();

const showUploader = ref(false);

const images = ref<Image[]>([]);

const {
  isBusy,
  preview,
  onFileChange,
  onDropUpload,
  uploadFile,
  clearUpload,
  deleteImage,
} = useUpload();

const onUpload = () => {
  if (!preview.value) return;
  uploadFile()
    .then((image) => {
      images.value.push(image);
      clearUpload();
      showUploader.value = false;
    })
    .catch(console.error);
};

const onDelete = (image: Image) => {
  deleteImage(image)
    .then(() => {
      images.value = images.value.filter((i) => i.id !== image.id);
    })
    .catch(console.error);
};

const onChoose = (image: Image) => {
  emit("choose", image);
};

onMounted(() => {
  $fetch("/api/images").then((res) => {
    images.value = res.data;
  });
});
</script>

<template>
  <div class="w-full h-[80vh] p-8">
    <header class="flex gap-2">
      <h1 class="font-bold text-4xl w-full">Media Library</h1>
      <UButton
        :label="showUploader ? 'Hide Uploader' : 'Show Uploader'"
        @click="showUploader = !showUploader"
      />
      <!-- <UButton label="Close" @click="" /> -->
    </header>
    <div class="flex w-full gap-8 p-4">
      <div
        class="h-[68vh] overflow-y-auto bg-gray-100 p-4 rounded-lg w-full flex flex-wrap gap-4"
      >
        <div class="h-72 relative" v-for="image in images" :key="image.id">
          <img
            :src="image.url"
            class="h-full object-cover rounded-lg cursor-pointer"
            @click="onChoose(image)"
          />
          <UButton
            icon="i-heroicons-trash-20-solid"
            class="absolute text-red-500 text-3xl top-0 right-0 opacity-20 hover:opacity-100"
            variant="ghost"
            :loading="isBusy.imageId === image.id"
            square
            @click="onDelete(image)"
          />
        </div>
      </div>
      <div v-if="showUploader" class="w-1/5 min-w-96">
        <div v-if="preview" class="h-64 grid place-content-center relative">
          <NuxtImg
            provider="blob"
            :src="preview.path"
            format="webp"
            alt="product main image"
            class="h-[inherit] rounded-lg"
          />
          <UButton
            icon="i-heroicons-trash-20-solid"
            class="absolute text-red-500 text-3xl top-0 right-0"
            variant="ghost"
            square
            @click="clearUpload"
          />
        </div>
        <div
          v-else
          class="flex items-center justify-center w-full"
          @drop="onDropUpload"
          @dragover="$event.preventDefault()"
          @dragleave="$event.preventDefault()"
        >
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
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
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              accept="image/*"
              @change="onFileChange"
            />
          </label>
        </div>
        <div class="mt-8">
          <UButton
            label="Upload"
            :disabled="!preview"
            :loading="isBusy.pending"
            size="lg"
            block
            @click="onUpload"
          />
        </div>
      </div>
    </div>
  </div>
</template>
