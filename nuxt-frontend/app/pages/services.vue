<script setup lang="ts">
import type { Service } from '~/types/strapi'

const { getCollection } = useStrapiClient()
const config = useRuntimeConfig()
const { setPageSeo } = useSeo()

const mediaUrl = (img: { url: string } | null | undefined) =>
  img?.url ? `${config.public.strapiUrl}${img.url}` : ''

const { data: servicesRes } = await useAsyncData('services', () =>
  getCollection<Service>('/services', {
    populate: ['icon'],
    sort: ['order:asc'],
  })
)

const services = computed(() => servicesRes.value?.data ?? [])

setPageSeo({
  title: 'Web Development Services by Joel Beger',
  description: 'Joel Beger offers frontend development, ecommerce solutions, performance optimization, and SEO services. Custom websites built with React, Vue, Nuxt, Shopify, HubSpot, Webflow, and WordPress.',
  path: '/services',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Web Development Services by Joel Beger',
    description: 'Frontend development, ecommerce, performance optimization, and SEO services by Joel Beger.',
    provider: {
      '@type': 'Person',
      name: 'Joel Beger',
      url: 'https://joelbeger.com',
    }
  }
})
</script>

<template>
  <main class="min-h-screen">
    <section class="max-w-7xl mx-auto px-4 py-20 scroll-mt-32">
      <h1 class="text-4xl md:text-5xl font-heading font-bold mb-4">
        Services by Joel Beger
      </h1>
      <p class="text-lg text-slate-200 dark:text-slate-300 mb-12 max-w-2xl">
        Joel Beger delivers end-to-end web development services, from custom builds to
        performance optimization. Every project is crafted to drive measurable results.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="service in services"
          :key="service.id"
          class="flex flex-col items-center text-center p-6 rounded-2xl
                 bg-white/5 dark:bg-slate-800/30
                 border border-slate-200/20 dark:border-slate-700/30
                 backdrop-blur-sm
                 transition-all duration-300
                 hover:bg-white/10 dark:hover:bg-slate-800/50
                 hover:border-slate-300/30 dark:hover:border-slate-600/50
                 hover:shadow-lg hover:-translate-y-1"
        >
          <div
            v-if="service.icon"
            class="w-20 h-20 mb-6 rounded-xl
                   bg-white dark:bg-white
                   border border-slate-200 dark:border-slate-300
                   p-4 flex items-center justify-center
                   shadow-sm"
          >
            <NuxtImg
              provider="strapi"
              :src="service.icon.url"
              :alt="service.title"
              sizes="80px"
              format="webp"
              quality="90"
              loading="lazy"
              class="w-full h-full object-contain"
            />
          </div>

          <h2 class="text-xl font-bold mb-3 text-slate-100 dark:text-slate-100">
            {{ service.title }}
          </h2>

          <p class="text-sm text-slate-100 dark:text-slate-300 leading-relaxed">
            {{ service.description }}
          </p>
        </div>
      </div>

      <CtaSection />
    </section>
  </main>
</template>
