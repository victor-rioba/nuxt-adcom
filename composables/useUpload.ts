import type { Image } from "~/types"

export type CloudinaryImage = {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: string[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  folder: string
  original_filename: string
  original_extension: string
}

export const useUpload = () => {
  const unsignedUploadPreset = "zozryaz8"
  const cloudName = "dd9ngrnnr"
  const apiKey = "453274839973854"

  const toast = useToast()

  const file = ref<File>()

  const isBusy = ref({
    pending: false,
    imageId: "",
  })

  const preview = computed(() => {
    if (!file.value) return
    return {
      path: URL.createObjectURL(file.value).split("/").reverse()[0],
    }
  })

  const onFileChange = (e: Event) => {
    const { files } = e.target as HTMLInputElement
    if (!files) return
    file.value = files[0]
  }

  const onDropUpload = (e: DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer?.items && e.dataTransfer.items[0].kind === "file") {
      const uploadedFile = e.dataTransfer.items[0].getAsFile()
      if (!uploadedFile || !uploadedFile.type.startsWith("image")) return
      file.value = uploadedFile
    }
  }

  const clearUpload = () => {
    file.value = undefined
  }

  const uploadFile = async (folder = "products") => {
    if (!file.value) {
      toast.add({
        title: "No file selected",
        description: "Please select a file to upload",
        icon: "i-heroicons-exclamation-circle-20-solid",
        color: "red",
      })
      throw new Error("No file selected")
    }
    isBusy.value.pending = true
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    const formData = new FormData()
    formData.append("upload_preset", unsignedUploadPreset)
    formData.append("tags", "browser_upload") // Optional - add tags for image admin in Cloudinary
    formData.append("file", file.value)
    formData.append("folder", folder)

    return $fetch<CloudinaryImage>(url, {
      method: "POST",
      body: formData,
    })
      .then((data) => {
        const body = {
          assetId: data.asset_id,
          signature: data.signature,
          width: data.width,
          height: data.height,
          format: data.format,
          bytes: data.bytes,
          type: data.type,
          url: data.url,
          secureUrl: data.secure_url,
          folder: data.folder,
          path: data.url.split("upload")[1],
        }
        return $fetch("/api/images", {
          method: "POST",
          body,
        })
      })
      .catch((error) => {
        console.error("Error uploading the file:", error)
        throw error
      })
      .finally(() => {
        isBusy.value.pending = false
      })
  }

  const deleteImage = async (image: Image) => {
    isBusy.value = { pending: true, imageId: image.id }
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`

    const path = image.path.split(".")[0]
    const [_spc, _key, folder, img] = path.split("/")

    const publicId = `${folder}/${img}`

    const currentTimestamp = Date.now().toString()

    const signature = await $fetch("/api/cloudinary/signature", {
      query: {
        public_id: publicId,
        timestamp: currentTimestamp,
      },
    })

    const formData = new FormData()
    formData.append("public_id", publicId) // todo: save public_id in the database
    formData.append("signature", signature)
    formData.append("api_key", apiKey)
    formData.append("timestamp", currentTimestamp)

    return $fetch(url, {
      method: "POST",
      body: formData,
    })
      .then(() => {
        return $fetch(`/api/images/${image.id}`, {
          method: "DELETE",
        })
      })
      .catch((error) => {
        console.error("Error deleting the file:", error)
        throw error
      })
      .finally(() => {
        isBusy.value = { pending: false, imageId: "" }
      })
  }

  return {
    isBusy,
    preview,
    onFileChange,
    onDropUpload,
    uploadFile,
    clearUpload,
    deleteImage,
  }
}
