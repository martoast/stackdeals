<template>
  <div class="bg-black min-h-screen">
    <div class="container mx-auto">
      <div
        class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
      >
        <div class="flex justify-center mb-8">
          <a href="https://urcreativeservices.com/" target="_blank">
            <img src="/logo.png" alt="Logo" class="h-16 w-auto" />
          </a>
        </div>
        <div class="mb-4">
          <button
            @click="hanldeBackButton"
            type="button"
            class="rounded-full bg-gold p-2 text-black shadow-lg shadow-gold/20 hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        </div>
        <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <!-- Image gallery -->
          <TabGroup as="div" class="flex flex-col-reverse">
            <!-- Image selector -->
            <div
              class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none"
            >
              <TabList class="grid grid-cols-4 gap-6 mb-8">
                <Tab
                  v-for="(image, index) in property.images"
                  :key="index"
                  class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-zinc-900 text-sm font-medium uppercase text-white hover:bg-zinc-800 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 transition-all"
                  v-slot="{ selected }"
                >
                  <span class="sr-only">Image {{ index + 1 }}</span>
                  <span class="absolute inset-0 overflow-hidden rounded-md">
                    <img
                      :src="image"
                      alt=""
                      class="h-full w-full object-cover object-center"
                    />
                  </span>
                  <span
                    :class="[
                      selected ? 'ring-gold' : 'ring-transparent',
                      'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2',
                    ]"
                    aria-hidden="true"
                  />
                </Tab>
              </TabList>
            </div>

            <TabPanels class="aspect-h-1 aspect-w-1 w-full">
              <TabPanel
                v-for="(image, index) in property.images"
                :key="index"
                @click="openModal(index)"
              >
                <img
                  :src="image"
                  :alt="`Image ${index + 1}`"
                  class="h-full w-full object-cover object-center sm:rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>

          <!-- Property info -->
          <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 class="text-3xl font-bold tracking-tight text-white">
              {{ property.address }}
            </h1>

            <div class="mt-3">
              <h2 class="sr-only">Property information</h2>
              <p class="text-3xl font-semibold tracking-tight text-gold mb-3">
                {{ formatCurrency(property.price) }}
              </p>
              <p v-if="property.sold !== null" class="font-medium text-white">
                <span class="text-zinc-400">Status:</span>
                <span
                  class="font-bold ml-2"
                  :class="property.sold ? 'text-accent-red' : 'text-accent-green'"
                >
                  {{ property.sold ? "Sold" : "Available" }}
                </span>
              </p>
              

              <!-- Docs Button -->
              <div v-if="property.docs_url" class="mt-4">
                <a
                  :href="property.docs_url"
                  target="_blank"
                  class="inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-gold/20 hover:bg-gold-light hover:shadow-gold/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                  View Docs
                </a>
              </div>
            </div>

            <!-- Property Details -->
            <section class="mt-4">
              <h3 class="text-xl font-semibold text-white mb-3">
                Property Details
              </h3>
              <div class="space-y-2 text-base text-zinc-300">
                <p v-if="property.property_type">
                  <span class="font-medium text-zinc-400">Property Type:</span>
                  <span class="text-white ml-2">{{ property.property_type }}</span>
                </p>
                <p v-if="property.bedrooms">
                  <span class="font-medium text-zinc-400">Bedrooms:</span>
                  <span class="text-white ml-2">{{ property.bedrooms }}</span>
                </p>
                <p v-if="property.bathrooms">
                  <span class="font-medium text-zinc-400">Bathrooms:</span>
                  <span class="text-white ml-2">{{ property.bathrooms }}</span>
                </p>
                <p v-if="property.living_area">
                  <span class="font-medium text-zinc-400">Living Area:</span>
                  <span class="text-white ml-2">{{ property.living_area }} sq ft</span>
                </p>
                <p v-if="property.monthly_hoa_fee">
                  <span class="font-medium text-zinc-400">Monthly HOA Fee:</span>
                  <span class="text-white ml-2">{{ formatCurrency(property.monthly_hoa_fee) }}</span>
                </p>
              </div>
            </section>

            <!-- Description -->
            <section v-if="property.description" class="mt-6">
              <h3 class="text-xl font-semibold text-white mb-3">Description</h3>
              <div class="space-y-2 text-base text-zinc-300">
                <p>{{ property.description }}</p>
              </div>
            </section>

            <!-- Contact Recipients -->
            <section v-if="property.contact_recipients?.length" class="mt-6">
              <h3 class="text-xl font-semibold text-white mb-3">
                Contact Recipients
              </h3>
              <div class="space-y-4 text-base text-zinc-300">
                <div
                  v-for="recipient in property.contact_recipients"
                  :key="recipient.zuid"
                  class="flex items-center space-x-4 bg-zinc-900/50 border border-zinc-800 rounded-lg p-4"
                >
                  <img
                    v-if="recipient.image_url"
                    :src="recipient.image_url"
                    :alt="recipient.display_name"
                    class="w-16 h-16 rounded-full object-cover border-2 border-zinc-800"
                  />
                  <div>
                    <p class="font-medium text-white">{{ recipient.display_name }}</p>
                    <p class="text-sm text-zinc-400">
                      Phone:
                      <span class="text-zinc-300">
                        {{
                          recipient.phone?.areacode
                            ? `(${recipient.phone.areacode}) ${recipient.phone.prefix}-${recipient.phone.number}`
                            : "N/A"
                        }}
                      </span>
                    </p>
                    <p v-if="recipient.email" class="text-sm text-zinc-400">
                      Email: <span class="text-zinc-300">{{ recipient.email }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <ModalCarousel
        :showModal="isModalOpen"
        :images="property.images"
        :startIndex="selectedImageIndex"
        @close="isModalOpen = false"
      />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { usePropertiesStore } from "~/store/DataStore";
import ModalCarousel from "~/components/ModalCarousel.vue";

const route = useRoute();
const store = usePropertiesStore();

await useAsyncData("property", () => store.find(route.params.id));

const property = computed(() => ({
  ...(store.property || {}),
  images: store.property?.images ? JSON.parse(store.property.images) : [],
  contact_recipients: store.property.contact_recipients
    ? JSON.parse(store.property.contact_recipients)
    : [],
}));

const isModalOpen = ref(false);
const selectedImageIndex = ref(0);

function openModal(index) {
  selectedImageIndex.value = index;
  isModalOpen.value = true;
}

function formatCurrency(value) {
  if (typeof value !== "number") {
    return value;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

const hanldeBackButton = async () => {
  await navigateTo("/");
};
</script>