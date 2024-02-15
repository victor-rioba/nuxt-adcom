<template>
  <div class="text-[#1d3752] px-6 md:px-8">
    <div
      class="w-full aspect-[3/6] md:aspect-[16/9] rounded-xl grid place-content-center text-white bg-center bg-cover"
      style="
        background: linear-gradient(
            0deg,
            rgba(29, 55, 82, 1) 0%,
            rgba(29, 55, 82, 0) 100%
          ),
          url(&quot;https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&quot;);
      "
    >
      <h1
        class="py-4 text-4xl md:text-[5rem] md:leading-none tracking-wide font-bold text-center"
      >
        Discover Your Perfect Home
      </h1>
      <p class="text-center w-2/3 md:w-1/2 mx-auto">
        Let our expert team guide through your real estate journey and help you
        find the perfect home where your dreams take flight
      </p>
      <div class="flex flex-col text-[#1d3752] w-5/6 md:w-2/3 mx-auto py-8">
        <div class="bg-[#1d3752] rounded-t-lg max-w-fit overflow-hidden">
          <button class="bg-white rounded-tr px-4 py-2">Buy</button>
          <button class="px-4 py-2 text-white">Rent</button>
        </div>
        <div
          class="flex flex-col md:flex-row gap-4 md:gap-0 py-4 md:py-2 items-center bg-white rounded-lg rounded-tl-none p-2 text-sm pl-4"
        >
          <div class="w-full">
            <span class="font-semibold pb-1 block">Property Type</span>
            <div class="flex items-center gap-2 opacity-50 text-xs">
              <input
                type="text"
                placeholder="Select Property Type"
                class="focus-within:border-transparent outline-transparent"
              />
              <Icon name="ph:caret-down-bold" />
            </div>
          </div>
          <div class="w-full md:border-x md:pl-8 md:pr-4">
            <span class="font-semibold pb-1 block">Location</span>
            <div class="opacity-50 text-xs">
              <input
                type="text"
                placeholder="e.g Bamburi, Tudor, etc."
                class="focus-within:border-transparent outline-transparent"
              />
            </div>
          </div>
          <div class="w-full md:pl-8">
            <span class="font-semibold pb-1 block">Price Range</span>
            <div class="opacity-50 text-xs">
              <input
                type="text"
                placeholder="Min price - Max price"
                class="focus-within:border-transparent outline-transparent"
              />
            </div>
          </div>
          <div class="w-full">
            <UButton
              class="bg-[#1d3752] text-white flex justify-center px-4 py-2 rounded-lg w-full"
              label="Search"
            />
          </div>
        </div>
      </div>
    </div>
    <UContainer
      class="flex flex-col md:flex-row gap-4 md:gap-[30vw] px-6 md:px-24 py-4 md:py-16 items-center"
    >
      <h1 class="text-4xl md:text-[4rem] md:leading-none font-bold">
        Your Trusted Real Estate Advisors
      </h1>
      <p class="font-semibold opacity-80 md:w-1/2">
        A cutting edge real estate agent that offers a seamless and immersive
        experience for finding your dream home in the heart of the city
      </p>
    </UContainer>
    <UContainer class="px-6 md:px-24 flex flex-col md:flex-row gap-4 md:gap-20">
      <div class="gap-6 md:w-1/2 grid grid-cols-2">
        <div
          class="flex flex-col gap-2 pl-4 md:pl-8 py-4 md:py-8 shadow-sm bg-gray-50 rounded-2xl"
        >
          <span class="text-4xl md:text-[4rem] md:leading-none font-black"
            >113+</span
          >
          <span class="text-lg">Apartments Sold</span>
        </div>
        <div
          class="flex flex-col gap-2 pl-4 md:pl-8 py-4 md:py-8 shadow-sm bg-[#1d3752] rounded-2xl text-white"
        >
          <span class="text-4xl md:text-[4rem] font-black">355+</span>
          <span class="text-lg">Satisfied Clients</span>
        </div>
        <div
          class="flex flex-col gap-2 pl-4 md:pl-8 py-4 md:py-8 shadow-sm bg-amber-50 rounded-2xl"
        >
          <span class="text-4xl md:text-[4rem] font-black">718+</span>
          <span class="text-lg">Units Rented</span>
        </div>
        <div
          class="flex flex-col gap-2 pl-4 md:pl-8 py-4 md:py-8 shadow-sm bg-gray-100 rounded-2xl"
        >
          <span class="text-4xl md:text-[4rem] font-black">54+</span>
          <span class="text-lg">Listed Units</span>
        </div>
      </div>
      <div
        class="md:w-1/2 flex flex-col md:flex-row gap-8 bg-gray-100 rounded-lg shadow-sm p-6"
      >
        <div class="flex flex-col justify-between md:w-1/2">
          <p class="py-4 font-semibold">
            We have witnessed the ever evolving landscape of the real estate
            market and become a trusted partner by hundreds of clients
          </p>
          <UButton
            to="/contact"
            label="Contact us -> "
            class="rounded-full py-4 font-semibold shadow-sm text-white flex justify-center"
          />
        </div>
        <div class="md:w-1/2 h-full pl-4">
          <nuxt-img
            format="webp"
            class="w-full h-full rounded-lg"
            src="https://heimatconsult.co.ke/wp-content/uploads/2022/09/about-our-company.jpg"
          />
        </div>
      </div>
    </UContainer>
    <UContainer
      class="flex flex-col md:flex-row gap-4 md:gap-[30vw] px-6 md:px-24 py-4 md:py-16 items-center"
    >
      <h1 class="text-[2.5rem] md:text-[4rem] font-bold">
        Uncover the latest trends and stories
      </h1>
      <p class="font-semibold opacity-80 md:w-1/2">
        Stay informed and updated with the latest trends, home improvement ideas
        and our clients' story who achieved their real estate dreams
        <UButton
          to="/blog"
          class="text-primary py-2 text-lg bg-transparent shadow-none outline-none hover:underline focus:underline hover:bg:transparent hover:outline-none"
        >
          Read more in our <span class="font-bold">blog</span>...
        </UButton>
      </p>
    </UContainer>
    <UContainer class="px-6 md:px-24 flex flex-col md:flex-row gap-4 md:gap-20">
      <div class="relative">
        <nuxt-img
          format="webp"
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          class="rounded-lg h-full"
        />
        <div
          class="absolute bottom-2 left-2 right-2 bg-[#1d3752] rounded-lg text-white p-3"
        >
          <div class="flex justify-between items-center">
            <h1 class="underline opacity-60">Unique House</h1>
            <UButton to="/blog" class="rounded-full w-10 h-10 text-2xl">
              <Icon name="ic:round-arrow-outward" />
            </UButton>
          </div>
          <p class="font-semibold pb-2 pr-12">
            Modern House with steel frame and wooden base in the coastal beaches
            that offers a relaxing retreat
          </p>
          <span class="opacity-60">10 hours ago</span>
        </div>
      </div>
      <div>
        <nuxt-img
          format="webp"
          src="https://images.unsplash.com/photo-1604014238029-86e8c12579f2?auto=format&fit=crop&q=80&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          class="rounded-lg h-full"
        />
      </div>
      <div>
        <nuxt-img
          format="webp"
          src="https://images.unsplash.com/photo-1600573472556-e636c2acda88?auto=format&fit=crop&q=80&w=3087&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          class="rounded-lg h-full"
        />
      </div>
    </UContainer>
  </div>
</template>
