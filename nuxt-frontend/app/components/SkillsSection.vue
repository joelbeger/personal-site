<script setup lang="ts">
import type { Skill, Homepage } from '~/types/strapi'

const props = defineProps<{
  skills: Skill[]
  homepage: Homepage | null | undefined
  mediaUrl: (img: { url: string } | null | undefined) => string
}>()

const skillsByRole = computed(() => ({
  'Frontend': props.skills.filter(s => s.role === 'Frontend'),
  'Backend': props.skills.filter(s => s.role === 'Backend'),
  'Platform/CMS': props.skills.filter(s => s.role === 'Platform/CMS'),
  'Tools/Other': props.skills.filter(s => s.role === 'Tools/Other')
}))
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 pb-12 scroll-mt-24" id="skills">
    <h2 class="font-heading text-4xl text-neutral-50 font-semibold mb-8">
      {{ homepage?.skillsSectionTitle || 'Skills' }}
    </h2>

    <!-- Group skills by role -->
    <div class="space-y-10">
      <!-- Frontend Skills -->
      <div v-if="skillsByRole['Frontend'].length">
        <h3 class="text-2xl font-heading font-semibold mb-4 text-neutral-50 dark:text-violet-400">
          Frontend
        </h3>
        <div class="grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          <div
            v-for="skill in skillsByRole['Frontend']"
            :key="skill.id"
            class="flex flex-col items-center rounded-xl border-2
                   border-cyan-300 dark:border-violet-400
                   bg-white dark:bg-neutral-600
                   p-4 gap-2
                   hover:shadow-lg hover:scale-105 hover:-translate-y-1
                   transition-all duration-200 ease-out cursor-pointer"
          >
            <NuxtImg
              v-if="skill.icon"
              :src="mediaUrl(skill.icon)"
              :alt="skill.name"
              loading="lazy"
              class="w-10 h-10 object-contain"
            />
            <span class="text-slate-900 dark:text-slate-100">
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Backend Skills -->
      <div v-if="skillsByRole['Backend'].length">
        <h3 class="text-2xl font-heading font-semibold mb-4 text-neutral-50 dark:text-violet-500">
          Backend
        </h3>
        <div class="grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          <div
            v-for="skill in skillsByRole['Backend']"
            :key="skill.id"
            class="flex flex-col items-center rounded-xl border-2
                   border-cyan-300 dark:border-violet-500
                   bg-white dark:bg-neutral-600
                   p-4 gap-2 shadow-md
                   hover:shadow-lg hover:scale-105 hover:-translate-y-1
                   transition-all duration-200 ease-out cursor-pointer"
          >
            <NuxtImg
              v-if="skill.icon"
              :src="mediaUrl(skill.icon)"
              :alt="skill.name"
              loading="lazy"
              class="w-10 h-10 object-contain"
            />
            <span class="text-slate-900 dark:text-slate-100">
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Platform/CMS Skills -->
      <div v-if="skillsByRole['Platform/CMS'].length">
        <h3 class="text-2xl font-heading font-semibold mb-4 text-neutral-50 dark:text-violet-600">
          Platform/CMS
        </h3>
        <div class="grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          <div
            v-for="skill in skillsByRole['Platform/CMS']"
            :key="skill.id"
            class="flex flex-col items-center rounded-xl border-2
                   border-cyan-300 dark:border-violet-600
                   bg-white dark:bg-neutral-600
                   p-4 gap-2 shadow-md
                   hover:shadow-lg hover:scale-105 hover:-translate-y-1
                   transition-all duration-200 ease-out cursor-pointer"
          >
            <NuxtImg
              v-if="skill.icon"
              :src="mediaUrl(skill.icon)"
              :alt="skill.name"
              loading="lazy"
              class="w-10 h-10 object-contain"
            />
            <span class="text-slate-900 dark:text-slate-100">
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Tools/Other Skills -->
      <div v-if="skillsByRole['Tools/Other'].length">
        <h3 class="text-2xl font-heading font-semibold mb-4 text-neutral-50 dark:text-violet-700">
          Tools/Other
        </h3>
        <div class="grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          <div
            v-for="skill in skillsByRole['Tools/Other']"
            :key="skill.id"
            class="flex flex-col items-center rounded-xl border-2
                   border-cyan-300 dark:border-violet-700
                   bg-white dark:bg-neutral-600
                   p-4 gap-2 shadow-md
                   hover:shadow-lg hover:scale-105 hover:-translate-y-1
                   transition-all duration-200 ease-out cursor-pointer"
          >
            <NuxtImg
              v-if="skill.icon"
              :src="mediaUrl(skill.icon)"
              :alt="skill.name"
              loading="lazy"
              class="w-10 h-10 object-contain"
            />
            <span class="text-slate-900 dark:text-slate-100">
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>