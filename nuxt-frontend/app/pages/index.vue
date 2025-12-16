<script setup lang="ts">
import type { Homepage, Project, Skill, Service } from '~/types/strapi'

const { getCollection, getSingle } = useStrapiClient()
const config = useRuntimeConfig()

const { setPageSeo } = useSeo()

setPageSeo({
  title: 'Joel Beger | Frontend Developer & Web Engineer',
  description: 'Joel Beger is a full-stack engineer specializing in high-impact frontend work. Building custom websites and ecommerce sites across Shopify, HubSpot, Webflow, and WordPress with expertise in performance, CRO, and SEO.',
  path: '/'
})

const mediaUrl = (img: { url: string } | null | undefined) =>
  img?.url ? `${config.public.strapiUrl}${img.url}` : ''

const { data: homepageRes } = await useAsyncData('homepage', () =>
  getSingle<Homepage>('/homepage', { populate: '*' })
)

const { data: servicesRes } = await useAsyncData('services', () =>
  getCollection<Service>('/services', {
    populate: ['icon'],
    sort: ['order:asc'], 
  })
)

const homepage = computed(() => homepageRes.value?.data)
const services = computed(() => servicesRes.value?.data ?? [])


// projects
const { data: projectsRes } = await useAsyncData('projects', () =>
  getCollection<Project>('/projects', {
    populate: ['thumbnail', 'skills.icon'],
    sort: ['order:asc'],
  })
)


const projects = computed(() => projectsRes.value?.data ?? [])


// skills
const { data: skillsRes } = await useAsyncData('skills', () =>
  getCollection<Skill>('/skills', {
    populate: ['icon'],
    sort: ['order:asc'],
  })
)

const skills = computed(() => skillsRes.value?.data ?? [])

const isLoading = computed(() => 
  !homepageRes.value || !projectsRes.value || !skillsRes.value || !servicesRes.value
)
</script>

<template>
  <main class="min-h-screen">
    <LoadingSpinner v-if="isLoading" />
    <template v-else>
      <HeroSection :homepage="homepage" :media-url="mediaUrl" />
      <ServicesSection :services="services" :media-url="mediaUrl" />
      <Projects :projects="projects" :media-url="mediaUrl" />
      <SkillsSection :skills="skills" :homepage="homepage" :media-url="mediaUrl" />
      <ContactForm />
    </template>
  </main>
</template>
