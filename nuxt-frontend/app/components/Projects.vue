<script setup lang="ts">
import type { Project } from '~/types/strapi'

const props = defineProps<{
  projects: Project[]
  mediaUrl: (img: { url: string } | null | undefined) => string
}>()

function isTouchEvent(e: TouchEvent | MouseEvent): e is TouchEvent {
  return 'touches' in e
}

const currentIndex = ref(0)
const rotation = ref(0)
const windowWidth = ref(1024) // Default to desktop size

// Drag state
const isDragging = ref(false)
const startX = ref(0)
const startRotation = ref(0)
const dragThreshold = 50 // pixels to drag before changing slide

const step = computed(() =>
  props.projects.length > 0 ? 360 / props.projects.length : 0
)

const next = () => {
  if (!props.projects.length) return
  currentIndex.value = (currentIndex.value + 1) % props.projects.length
  rotation.value -= step.value
}

const prev = () => {
  if (!props.projects.length) return
  currentIndex.value =
    (currentIndex.value - 1 + props.projects.length) % props.projects.length
  rotation.value += step.value
}

// Determine if a project should be rendered (current + 1 adjacent on each side)
// Only apply optimization on mobile to reduce initial load
const shouldRenderProject = (index: number) => {
  // On desktop (> 768px), render all projects
  if (windowWidth.value > 768) return true
  
  // On mobile, only render current + 1 adjacent
  const diff = Math.abs(index - currentIndex.value)
  const wrapDiff = props.projects.length - diff
  return Math.min(diff, wrapDiff) <= 1
}

// Drag handlers
// Drag handlers
const handleDragStart = (e: TouchEvent | MouseEvent) => {
  if (!isTouchEvent(e)) return
  
  const touch = e.touches[0]
  if (!touch) return
  
  isDragging.value = true
  startX.value = touch.clientX
  startRotation.value = rotation.value
}

const handleDragMove = (e: TouchEvent | MouseEvent) => {
  if (!isDragging.value || !isTouchEvent(e)) return
  
  const touch = e.touches[0]
  if (!touch) return
  
  const currentX = touch.clientX
  const deltaX = currentX - startX.value
  
  // Apply drag with some resistance, but don't limit it
  const dragRotation = deltaX * 0.3 // Reduced multiplier for more control
  rotation.value = startRotation.value + dragRotation
}

const handleDragEnd = (e: TouchEvent | MouseEvent) => {
  if (!isDragging.value || !isTouchEvent(e)) return
  
  const touch = e.changedTouches[0]
  if (!touch) return
  
  const endX = touch.clientX
  const deltaX = endX - startX.value
  
  // Determine direction and navigate
  if (Math.abs(deltaX) > dragThreshold) {
    if (deltaX > 0) {
      prev()
    } else {
      next()
    }
  }
  
  // CRITICAL: Always snap to the current index position
  // This ensures we're never "between" slides
  rotation.value = currentIndex.value * -step.value
  
  isDragging.value = false
}

const handleImageClick = (index: number, event: Event) => {
  // Only handle clicks for background images
  if (index !== currentIndex.value) {
    // Calculate the shortest direction
    const diff = index - currentIndex.value
    const projectCount = props.projects.length
    
    let shortestDiff = diff
    if (Math.abs(diff) > projectCount / 2) {
      shortestDiff = diff > 0 ? diff - projectCount : diff + projectCount
    }
    
    // Move one step in the appropriate direction
    if (shortestDiff > 0) {
      next()
    } else {
      prev()
    }
  }
}

const carouselStyle = computed(() => ({
  transform: `rotateY(${rotation.value}deg)`,
  transition: isDragging.value ? 'none' : 'transform 1s',
}))

const figureStyle = (index: number) => {
  // Adjust translateZ based on screen size for proper 3D spacing
  const translateZ = windowWidth.value < 480 ? 250 : windowWidth.value < 768 ? 290 : 520
  return {
    transform: `rotateY(${index * step.value}deg) translateZ(${translateZ}px) scale(0.825)`,
  }
}

// Update window width on client side
onMounted(() => {
  windowWidth.value = window.innerWidth
  
  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }
  
  window.addEventListener('resize', handleResize)
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<template>
  <section class="relative max-w-7xl scroll-mt-32 mx-auto px-4 pb-20 overflow-hidden" id="projects">
    <h2 class="relative font-semibold z-10 font-heading text-4xl mb-6">
      Projects
    </h2>

    <div class="relative z-10 projects-carousel">
      <div 
        class="carousel-container"
        @touchstart="handleDragStart"
        @touchmove="handleDragMove"
        @touchend="handleDragEnd"
      >
        <div class="carousel" :style="carouselStyle">
          <figure
              v-for="(project, index) in projects"
  v-show="shouldRenderProject(index)"
            :key="project.id"
            :style="figureStyle(index)"
            :class="{ show: index === currentIndex }"
          >
            <div 
              @click="handleImageClick(index, $event)"
              :class="{ 'pointer-events-none': index !== currentIndex }"
              @mousedown.right.stop="index !== currentIndex ? $event.preventDefault() : null"
            >
              <NuxtLink
                v-if="index === currentIndex"
                :to="`/projects/${project.slug}`"
                class="image-container block focus:outline-none focus:ring-2 focus:ring-slate-500 rounded overflow-hidden border-2 border-slate-50 dark:border-slate-400 pointer-events-auto"
                :tabindex="0"
              >
              <NuxtImg
                v-if="project.thumbnail"
                provider="strapi"
                :src="project.thumbnail.url"
                :alt="project.title"
                width="630"
                height="440"
                sizes="(max-width: 480px) 320px, (max-width: 768px) 360px, 630px"
                format="webp"
                :loading="index === 0 ? 'eager' : 'lazy'"
                class="project-image"
                draggable="false"
              />
              </NuxtLink>
              <div
                v-else
                class="image-container block rounded overflow-hidden border-2 border-slate-50 dark:border-slate-400 cursor-pointer pointer-events-auto"
                @contextmenu.prevent
              >
              <NuxtImg
                v-if="project.thumbnail"
                provider="strapi"
                :src="project.thumbnail.url"
                :alt="project.title"
                width="630"
                height="440"
                sizes="(max-width: 480px) 320px, (max-width: 768px) 360px, 630px"
                format="webp"
                loading="lazy"
                class="project-image"
                draggable="false"
                @contextmenu.prevent
              />
              </div>
            </div>
          </figure>
        </div>

        <!-- Floating panel positioned absolutely, outside 3D transform -->
        <div class="panel-container">
          <div 
            v-for="(project, index) in projects"
            :key="`panel-${project.id}`"
            class="floating-panel mt-8 px-6 py-5 rounded-2xl border transition-opacity duration-700
                   bg-white/10 dark:bg-slate-900/20 
                   border-white/20 dark:border-slate-700/30
                   backdrop-blur-sm"
            :class="index === currentIndex ? 'opacity-100' : 'opacity-0'"
          >
            <!-- project text block -->
            <div class="flex flex-col items-center gap-1">
              <!-- short description (first row) -->
              <p class="text-2xl text-neutral-50 dark:text-slate-100 text-center">
                {{ project.shortDescription }}
              </p>

              <!-- role (second row, smaller) -->
              <p class="text-sm leading-none font-semibold text-slate-50 dark:text-slate-400 text-center">
                Role: {{ project.role }}
              </p>
            </div>

            <!-- skills icons row -->
            <div
              v-if="Array.isArray(project.skills) && project.skills.length"
              class="flex flex-wrap justify-center gap-3 mt-6"
            >
              <template v-for="(skill, sIndex) in project.skills" :key="skill?.id ?? `${project.id}-skill-${sIndex}`">
                <div
                  v-if="skill && skill.icon"
                  class="skill-icon flex flex-col items-center gap-1"
                >
                  <div class="h-14 w-14 rounded-lg dark:bg-neutral-200 border border-neutral-300 dark:border-neutral-500 bg-neutral-50 p-2 flex items-center justify-center">
                <NuxtImg
                  provider="strapi"
                  :src="skill.icon.url"
                  :alt="skill.name || ''"
                  sizes="56px"
                  format="webp"
                  loading="lazy"
                  quality="90"
                  class="w-full h-full object-contain"
                  style="image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;"
                  draggable="false"
                />
                  </div>
                  <span class="text-[10px] text-neutral-50 dark:text-slate-300 text-center">
                    {{ skill.name }}
                  </span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation with modern carat buttons -->
      <div class="navigation">
        <button 
          type="button" 
          @click="prev"
          class="nav-button group
                 border-2 border-slate-300 bg-neutral-200 hover:bg-slate-100 hover:border-slate-400
                 dark:border-violet-500 dark:bg-slate-900 dark:hover:bg-slate-800 dark:hover:border-violet-400"
          aria-label="Previous project"
        >
          <svg 
            class="w-6 h-6 text-slate-800 dark:text-violet-500 group-hover:text-slate-600 dark:group-hover:text-violet-400 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          type="button" 
          @click="next"
          class="nav-button group
                 border-2 border-slate-300 bg-neutral-200 hover:bg-slate-100 hover:border-slate-400
                 dark:border-violet-500 dark:bg-slate-900 dark:hover:bg-slate-800 dark:hover:border-violet-400"
          aria-label="Next project"
        >
          <svg 
            class="w-6 h-6 text-slate-800 dark:text-violet-500 group-hover:text-slate-600 dark:group-hover:text-violet-400 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-container {
  position: relative;
  margin: 50px auto 0;
  width: 630px;
  height: 440px;
  perspective: 2000px;
}

.panel-container {
  position: absolute;
  top: 560px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

figure {
  display: block;
  position: absolute;
  width: 630px;
  height: auto;
  pointer-events: auto;
  z-index: 1; /* Default z-index for background items */
}

/* Active figure should be on top */
figure.show {
  z-index: 10; /* Higher z-index for the front item */
}

/* Hover effect on images - only for active carousel item */
figure.show .image-container:hover .project-image {
  box-shadow: 3px 3px 18px rgba(0, 0, 0, 0.6);
  transform: scale(1.05);
  cursor: pointer;
}

.floating-panel {
  position: absolute;
  pointer-events: auto;
  max-width: 630px;
}

.carousel {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
}

figure {
  display: block;
  position: absolute;
  width: 630px;
  height: auto;
  pointer-events: auto;
}

/* Disable pointer events on non-active figures */
figure.pointer-events-none {
  pointer-events: none;
}

/* Fixed size container for images */
.image-container {
  width: 630px;
  height: 440px;
  overflow: hidden;
  border-radius: 0.375rem;
}

/* Image fills container with object-cover */
.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.skill-icon {
  transition: transform 0.15s ease;
}

.skill-icon:hover {
  transform: scale(1.1);
}

.navigation {
  position: relative;
  width: 630px;
  margin: 160px auto 0;
  display: flex;
  justify-content: space-between;
}

.nav-button {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  position: relative;
  top: 25px;
}

.nav-button:hover {
  transform: scale(1.05);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .carousel-container {
    width: 360px;
    height: 252px;
    margin: 50px auto 0;
  }

  .panel-container {
    top: 350px;
  }

  .floating-panel {
    max-width: 360px;
    padding: 1rem 1.5rem;
    margin-top: 1.5rem;
  }

  .floating-panel p:first-child {
    font-size: 1.25rem;
  }

  figure {
    width: 360px;
  }

  .image-container {
    width: 360px;
    height: 252px;
  }

  .navigation {
    width: 450px;
    margin: 120px auto 0;
    top: 10px;
  }

  .nav-button {
    width: 40px;
    height: 40px;
  }

  .skill-icon > div {
    height: 2.5rem;
    width: 2.5rem;
  }
}

/* Even smaller screens */
@media (max-width: 480px) {
  .carousel-container {
    width: 90vw;
    max-width: 320px;
    height: calc(90vw * 0.7);
    max-height: 224px;
    margin: 30px auto 0;
  }

  .floating-panel {
    width: 90vw;
    max-width: 320px;
    padding: 0.75rem 1rem;
    margin-top: 1rem;
  }

  .floating-panel p:first-child {
    font-size: 1.2rem;
  }

  .floating-panel p:nth-child(2) {
    font-size: 0.75rem;
    font-weight: 400;
  }

  figure {
    width: 90vw;
    max-width: 320px;
  }

  .image-container {
    width: 90vw;
    max-width: 320px;
    height: calc(90vw * 0.7);
    max-height: 224px;
  }

  .navigation {
    width: 90vw;
    max-width: 320px;
    margin: 160px auto 70px;
    top: 20px;
   
  }

  .nav-button {
    width: 36px;
    height: 36px;
    top: 45px
  }

  .nav-button svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  .panel-container {
    top: 330px;
  }

  .skill-icon > div {
    height: 3.5rem;
    width: 3.5rem;
  }

  .skill-icon span {
    font-size: 0.75rem;
  }
}

/* Extra small screens (< 375px) */
@media (max-width: 374px) {
  .carousel-container {
    width: 85vw;
    height: calc(85vw * 0.7);
  }

  figure {
    width: 85vw;
  }

  .image-container {
    width: 85vw;
    height: calc(85vw * 0.7);
  }

  .floating-panel {
    width: 85vw;
  }

  .navigation {
    width: 85vw;
  }
}
</style>