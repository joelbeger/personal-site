<script setup lang="ts">
import type { Project } from '~/types/strapi'

const route = useRoute()
const config = useRuntimeConfig()
const { parseMarkdown } = useMarkdown()
const { setPageSeo } = useSeo()

const mediaUrl = (img: { url: string } | null | undefined) =>
  img?.url ? `${config.public.strapiUrl}${img.url}` : ''

const slug = computed(() => String(route.params.slug || ''))

const { data: projectRes, error } = await useAsyncData(
  `project-${slug.value}`,
  () =>
    $fetch<{ data: Project[] }>(`${config.public.strapiUrl}/api/projects`, {
      params: {
        'filters[slug][$eq]': slug.value,
        'populate[thumbnail]': true,
        'populate[skills][populate][0]': 'icon',
        // Remove 'populate[description]': true
      },
    })
)

const project = computed(() => projectRes.value?.data?.[0] ?? null)

watchEffect(() => {
  if (project.value) {
    setPageSeo({
      title: `${project.value.title} | Joel Beger`,
      description: project.value.description?.substring(0, 160) || project.value.shortDescription,
      image: mediaUrl(project.value.thumbnail),
      path: `/projects/${project.value.slug}`
    })
  }
})

</script>

<template> 
  <main class="min-h-screen max-w-4xl mx-auto px-4 py-12">
    <div v-if="error">
      <p class="text-red-500">Error loading project: {{ error }}</p>
    </div>

    <div v-else-if="!project">
      <p>Project not found.</p>
    </div>

    <article v-else class="space-y-6">
      <button
        type="button"
        class="text-sm text-slate-700 dark:text-slate-300 mb-4"
        @click="$router.push('/#projects')"
      >
        ← Back to projects
      </button>

      <header class="space-y-2">
        <h1 class="text-2xl md:text-3xl font-heading">
          {{ project.title }}: {{ project.shortDescription }} 
        </h1>
        <p class="text-sm text-neutral-200 dark:text-slate-300">
          Role: {{ project.role }}
        </p>
      </header>

      <section v-if="project.skills?.length" class="pt-0  pb-6 border-slate-200 dark:border-slate-600">
        <div class="flex flex-wrap gap-2">
          <div
            v-for="skill in project.skills"
            :key="skill.id"
            class="flex items-center gap-2 text-xs px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-700"
          >
          <NuxtImg
            v-if="skill.icon"
            provider="strapi"
            :src="skill.icon.url"
            :alt="skill.name"
            sizes="32px"
            format="webp"
            quality="90"
            loading="lazy"
            class="h-8 w-8 object-contain"
          />
            <span class="text-base text-neutral-500 dark:text-neutral-300" >{{ skill.name }}</span>
          </div>
        </div>
      </section>
      <NuxtImg
        v-if="project.thumbnail"
        provider="strapi"
        :src="project.thumbnail.url"
        :alt="project.title"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        format="webp"
        loading="lazy"
        class="w-full rounded-xl border border-slate-200 dark:border-slate-600"
      />
      <div class="prose dark:prose-invert max-w-none">
        <!-- Use v-html if description contains HTML, or whitespace-pre-line if plain text -->
        <div 
          class="text-neutral-200 text-lg dark:text-neutral-200"
          v-html="parseMarkdown(project.description)"
        />
      </div>
      <div class="flex flex-wrap gap-4 pt-4">
      <a 
        v-if="project.projectUrl"
        :href="project.projectUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-base font-medium
              bg-slate-700 hover:bg-slate-600 text-white
              dark:bg-slate-600 dark:hover:bg-slate-500
              transition-colors duration-200"
      >
        {{ project.isArchived ? 'View Archived Site' : 'View Live Site' }}
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
        
        <a 
          v-if="project.projectUrlBefore"
          :href="project.projectUrlBefore"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-base font-medium
                border-2 border-slate-300 text-slate-700 hover:bg-slate-100
                dark:border-slate-500 dark:text-slate-300 dark:hover:bg-slate-800
                transition-colors duration-200"
        >
          View Before Redesign
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
            <button
        type="button"
        class="text-sm text-slate-700 dark:text-slate-300 mb-4"
        @click="$router.push('/#projects')"
      >
        ← Back to projects
      </button>
    </article>
  </main>
</template>