<template>
  <div>
    <h1 class="text-center text-[3rem] font-black uppercase tracking-wide py-6">
      The Blog
    </h1>
    <ul class="px-48 flex flex-col gap-8">
      <li>
        <NuxtLink to="/blog/post" class="flex gap-2 bg-gray-100 rounded-sm">
          <nuxt-img
            format="webp"
            src="https://static.wixstatic.com/media/1bb245_9fde7bcbec5d4256af9ba6a914a2a4aa~mv2.jpg/v1/fill/w_514,h_386,fp_0.50_0.50,q_90,enc_auto/1bb245_9fde7bcbec5d4256af9ba6a914a2a4aa~mv2.jpg"
            class="w-36 h-36 rounded-sm"
          />
          <div class="flex gap-4 items-center px-4">
            <div class="flex gap-4 items-center w-[20%]">
              <nuxt-img
                format="webp"
                class="w-12 h-12 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                alt="Bonnie Avatar"
              />
              <div class="flex flex-col">
                <span class="font-semibold">The Writer</span>
                <span class="text-sm">October, 3 2023</span>
                <span class="italic text-xs text-gray-500">2 min read</span>
              </div>
            </div>
            <div class="flex flex-col gap-2 w-[70%]">
              <h1>The Mixed-Use Real Estate Model</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                perspiciatis, minus quia modi similique quos. Velit ex
                laboriosam dolor quod quae esse, officiis corporis ad voluptates
                delectus rerum, ab...
              </p>
            </div>
            <div
              class="w-[10%] bg-gray-200 mr-2 flex flex-col gap-3 py-3 rounded"
            >
              <div class="flex justify-around">
                <Icon name="ic:round-open-in-full" />
                <Icon name="iconamoon:comment-dots-light" />
              </div>
              <div class="flex justify-around">
                <Icon name="icon-park-outline:like" />
                <Icon name="solar:share-bold" />
              </div>
            </div>
          </div>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/blog/post" class="flex gap-2 bg-gray-100 rounded-sm">
          <nuxt-img
            format="webp"
            src="https://static.wixstatic.com/media/4a7193_65de18ed459247029bcfd6e5d8c0da70~mv2.jpg/v1/fill/w_514,h_386,fp_0.50_0.50,q_90,enc_auto/4a7193_65de18ed459247029bcfd6e5d8c0da70~mv2.jpg"
            class="w-36 h-36 rounded-sm"
          />
          <div class="flex gap-4 items-center px-4">
            <div class="flex gap-4 items-center w-[20%]">
              <nuxt-img
                format="webp"
                class="w-12 h-12 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                alt="Jese Avatar"
              />
              <div class="flex flex-col">
                <span class="font-semibold">The Writer</span>
                <span class="text-sm">October, 3 2023</span>
                <span class="italic text-xs text-gray-500">2 min read</span>
              </div>
            </div>
            <div class="flex flex-col gap-2 w-[70%]">
              <h1>The Mixed-Use Real Estate Model</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                perspiciatis, minus quia modi similique quos. Velit ex
                laboriosam dolor quod quae esse, officiis corporis ad voluptates
                delectus rerum, ab...
              </p>
            </div>
            <div
              class="w-[10%] bg-gray-200 mr-2 flex flex-col gap-3 py-3 rounded"
            >
              <div class="flex justify-around">
                <Icon name="ic:round-open-in-full" />
                <Icon name="iconamoon:comment-dots-light" />
              </div>
              <div class="flex justify-around">
                <Icon name="icon-park-outline:like" />
                <Icon name="solar:share-bold" />
              </div>
            </div>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
