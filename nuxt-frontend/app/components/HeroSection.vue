<script setup lang="ts">
import type { Homepage } from '~/types/strapi'

const props = defineProps<{
  homepage: Homepage | null | undefined
  mediaUrl: (img: { url: string } | null | undefined) => string
}>()

const { parseMarkdown } = useMarkdown()
</script>

<template>
  <section
    id="top"
    class="relative -mt-24 pt-24 scroll-mt-32 min-h-[700px] flex items-center"
  >
    <AnimatedBackground />

    <div class="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
      <div
        v-if="homepage"
        class="grid gap-10 md:grid-cols-[2fr,1.5fr] items-center"
      >
        <!-- Text content - order-2 on mobile, order-1 on desktop -->
        <div class="order-2 md:order-1">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            {{ homepage.heroTitle }}
          </h1>

          <div 
            class="mb-6 prose font-semibold prose-invert prose-p:text-slate-50 prose-a:text-slate-900 dark:prose-a:text-violet-400 prose-a:underline hover:prose-a:text-slate-950 dark:hover:prose-a:text-violet-500"
            v-html="parseMarkdown(homepage.heroSubtitle)"
          ></div>

          <div class="flex flex-wrap gap-3">
            <a
              :href="homepage.linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-3 px-4 py-2 rounded-lg
                    bg-slate-200 hover:bg-slate-300
                    dark:bg-slate-700 dark:hover:bg-slate-600
                    transition-all duration-300 ease-out
                    hover:scale-105 shadow-md hover:shadow-lg"
            >
              <span class="text-slate-800 dark:text-slate-100 font-medium">
                LinkedIn
              </span>
              <NuxtImg src="/icons/linkedin.png"  alt="" class="w-6 h-6" />
            </a>
          </div>
        </div>

        <!-- Image - order-1 on mobile (shows first), order-2 on desktop -->
        <div v-if="homepage.heroImage" class="justify-self-center order-1 md:order-2">
          <NuxtImg
            :src="mediaUrl(homepage.heroImage)"
            :alt="homepage.heroImage.alternativeText || homepage.heroTitle"
            class="w-80 h-80 rounded-full object-cover shadow-xl
                   border border-slate-200 dark:border-slate-700"
                   fetchpriority="high"
                    loading="eager"
                    width="320"
                    height="320"
                    format="webp"
                    quality="85"
          />
        </div>
      </div>
    </div>
    
    <!-- Gradient fade overlay (light mode only) -->
    <div 
      class="absolute bottom-0 left-0 right-0 h-32 z-[5]
             bg-gradient-to-b from-transparent to-sky-500
             dark:hidden"
    ></div>
  </section>
</template>