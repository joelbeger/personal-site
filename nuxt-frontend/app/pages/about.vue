<script setup lang="ts">
import type { Homepage, Skill } from '~/types/strapi'

const { getSingle, getCollection } = useStrapiClient()
const config = useRuntimeConfig()
const { setPageSeo } = useSeo()

const mediaUrl = (img: { url: string } | null | undefined) =>
  img?.url ? `${config.public.strapiUrl}${img.url}` : ''

const { data: homepageRes } = await useAsyncData('homepage', () =>
  getSingle<Homepage>('/homepage', { populate: '*' })
)

const { data: skillsRes } = await useAsyncData('skills', () =>
  getCollection<Skill>('/skills', {
    populate: ['icon'],
    sort: ['order:asc'],
  })
)

const homepage = computed(() => homepageRes.value?.data)
const skills = computed(() => skillsRes.value?.data ?? [])

setPageSeo({
  title: 'About Joel Beger | Frontend Developer & Web Engineer',
  description: 'Learn more about Joel Beger, a full-stack engineer specializing in frontend development. Building high-performance websites and ecommerce solutions with React, Vue, Nuxt, Shopify, and more.',
  path: '/about',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Joel Beger',
    description: 'Learn more about Joel Beger, a full-stack engineer specializing in frontend development.',
    mainEntity: {
      '@type': 'Person',
      name: 'Joel Beger',
      url: 'https://joelbeger.com',
      jobTitle: 'Frontend Developer & Web Engineer',
    }
  }
})
</script>

<template>
  <main class="min-h-screen">
    <section class="max-w-7xl mx-auto px-4 py-20 scroll-mt-32">
      <h1 class="text-4xl md:text-5xl font-heading font-bold mb-8">
        About Joel Beger
      </h1>

      <div class="grid gap-10 md:grid-cols-2 items-start">
        <!-- Photo -->
        <div class="justify-self-center">
          <NuxtImg
            src="/begerfamily.webp"
            alt="Joel Beger and family"
            class="w-full rounded-2xl object-cover shadow-xl
                   border border-slate-200 dark:border-slate-700 aspect-[3/2]"
            sizes="(max-width: 768px) 100vw, 40vw"
            format="webp"
            quality="90"
          />
        </div>

        <!-- Bio -->
        <div class="space-y-6">
          <div class="prose dark:prose-invert max-w-none">
            <p class="text-lg text-slate-100 dark:text-slate-200 leading-relaxed">
              As a full-stack engineer, I live for polished, high-impact front-end work. I build
              custom websites (like this one) as well as ecommerce sites across Shopify, HubSpot,
              Webflow, and WordPress, always optimizing for performance, CRO, and SEO.
            </p>
            <p class="text-lg text-slate-100 dark:text-slate-200 leading-relaxed">
              I'm always interested in learning new technologies and even did a
              <a href="https://youtu.be/2ajOH-srlZM?si=DZrAy_QhOXBsMfY6" target="_blank" rel="noopener noreferrer" class="text-violet-400 hover:text-violet-300 underline">SingleSprout/Codesmith tech talk</a>
              discussing Next.js a few years ago. Heck, I even learned Strapi and Nuxt to build this site.
            </p>
            <p class="text-lg text-slate-100 dark:text-slate-200 leading-relaxed">
              Beyond coding, I'm an experienced project manager, coordinating developers, giving
              feedback, handling QA, and making sure everything stays on track for both dev teams
              and clients.
            </p>
            <p class="text-lg text-slate-100 dark:text-slate-200 leading-relaxed">
              When I'm not coding, I'm usually spending time with my family, playing position 2-5 in DOTA 2 or catching up on a show.
              I'm also a collector of sorts — soccer cards, TCG cards, and vinyl music albums.
            </p>
          </div>

          <div v-if="homepage?.linkedinUrl" class="flex gap-3">
            <a
              :href="homepage.linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                     bg-slate-700 hover:bg-slate-600 text-white
                     transition-colors duration-200"
            >
              Connect on LinkedIn
              <NuxtImg src="/icons/linkedin.png" alt="" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div v-if="skills.length" class="mt-16">
        <h2 class="text-3xl font-heading font-semibold mb-6">
          Skills & Technologies
        </h2>
        <div class="flex flex-wrap gap-3">
          <div
            v-for="skill in skills"
            :key="skill.id"
            class="flex items-center gap-2 px-4 py-2.5 rounded-full
                   bg-white dark:bg-neutral-600
                   border border-slate-200 dark:border-slate-500"
          >
            <NuxtImg
              v-if="skill.icon"
              provider="strapi"
              :src="skill.icon.url"
              :alt="skill.name"
              sizes="24px"
              format="webp"
              quality="90"
              loading="lazy"
              class="h-6 w-6 object-contain"
            />
            <span class="text-sm text-slate-900 dark:text-slate-100">{{ skill.name }}</span>
          </div>
        </div>
      </div>

      <CtaSection />
    </section>
  </main>
</template>
