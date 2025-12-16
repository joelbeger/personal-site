<script setup lang="ts">
import type { Service } from '~/types/strapi'

const props = defineProps<{
  services: Service[]
  mediaUrl: (img: { url: string } | null | undefined) => string
}>()
</script>

<template>
  <section 
    id="services" 
    class="relative max-w-7xl scroll-mt-32 mx-auto px-4 py-20"
  >
    <h2 class="font-heading font-semibold text-4xl mb-8">
      Services
    </h2>

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
        <!-- Icon -->
        <div 
        v-if="service.icon"
        class="w-20 h-20 mb-6 rounded-xl 
                bg-white dark:bg-white
                border border-slate-200 dark:border-slate-300
                p-4 flex items-center justify-center
                shadow-sm"
        >
        <NuxtImg
            :src="mediaUrl(service.icon)"
            :alt="service.title"
            loading="lazy"
            class="w-full h-full object-contain"
        />
        </div>

        <!-- Title -->
        <h3 class="text-xl font-bold mb-3 text-slate-100 dark:text-slate-100">
          {{ service.title }}
        </h3>

        <!-- Description -->
        <p class="text-sm text-slate-100 dark:text-slate-300 leading-relaxed">
          {{ service.description }}
        </p>
      </div>
    </div>
  </section>
</template>