<script setup lang="ts">
import type { Project } from '~/types/strapi'

const { getCollection } = useStrapiClient()
const config = useRuntimeConfig()
const { setPageSeo } = useSeo()

const mediaUrl = (img: { url: string } | null | undefined) =>
  img?.url ? `${config.public.strapiUrl}${img.url}` : ''

const { data: projectsRes } = await useAsyncData('projects', () =>
  getCollection<Project>('/projects', {
    populate: ['thumbnail', 'skills.icon'],
    sort: ['order:asc'],
  })
)

const projects = computed(() => projectsRes.value?.data ?? [])

setPageSeo({
  title: 'Projects by Joel Beger | Web Development Portfolio',
  description: 'Browse Joel Beger\'s web development portfolio. Custom websites and ecommerce projects built with React, Vue, Nuxt, Shopify, HubSpot, Webflow, and WordPress.',
  path: '/projects',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects by Joel Beger',
    description: 'Web development portfolio by Joel Beger.',
    author: {
      '@type': 'Person',
      name: 'Joel Beger',
      url: 'https://joelbeger.com',
    }
  }
})
</script>

<template>
  <main class="min-h-screen">
    <section class="max-w-7xl mx-auto px-4 py-20">
      <h1 class="text-4xl md:text-5xl font-heading font-bold mb-4">
        Projects by Joel Beger
      </h1>
      <p class="text-lg text-slate-200 dark:text-slate-300 mb-12 max-w-2xl">
        A collection of websites and web applications I've designed and developed for clients across various industries.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink
          v-for="project in projects"
          :key="project.id"
          :to="`/projects/${project.slug}`"
          class="group rounded-2xl overflow-hidden
                 bg-white/5 dark:bg-slate-800/30
                 border border-slate-200/20 dark:border-slate-700/30
                 transition-all duration-300
                 hover:bg-white/10 dark:hover:bg-slate-800/50
                 hover:border-slate-300/30 dark:hover:border-slate-600/50
                 hover:shadow-lg hover:-translate-y-1"
        >
          <!-- Thumbnail -->
          <div class="aspect-video overflow-hidden">
            <NuxtImg
              v-if="project.thumbnail"
              provider="strapi"
              :src="project.thumbnail.url"
              :alt="project.title"
              width="630"
              height="440"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              format="webp"
              quality="85"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <!-- Info -->
          <div class="p-5">
            <h2 class="text-xl font-bold mb-1 text-slate-100 dark:text-slate-100 group-hover:text-white transition-colors">
              {{ project.title }}
            </h2>
            <p class="text-sm text-slate-300 dark:text-slate-400 mb-3">
              {{ project.role }}
            </p>
            <p class="text-sm text-slate-200 dark:text-slate-300 line-clamp-2">
              {{ project.shortDescription }}
            </p>

            <!-- Skills -->
            <div v-if="project.skills?.length" class="flex flex-wrap gap-2 mt-4">
              <div
                v-for="skill in project.skills.slice(0, 5)"
                :key="skill.id"
                class="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full
                       bg-slate-100/10 dark:bg-slate-700/50"
              >
                <NuxtImg
                  v-if="skill.icon"
                  provider="strapi"
                  :src="skill.icon.url"
                  :alt="skill.name"
                  sizes="16px"
                  format="webp"
                  quality="90"
                  loading="lazy"
                  class="h-4 w-4 object-contain"
                />
                <span class="text-slate-300 dark:text-slate-400">{{ skill.name }}</span>
              </div>
              <span
                v-if="project.skills.length > 5"
                class="text-xs px-2 py-1 text-slate-400"
              >
                +{{ project.skills.length - 5 }} more
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <CtaSection />
    </section>
  </main>
</template>
