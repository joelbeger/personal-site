<script setup lang="ts">
const route = useRoute()
const colorMode = useState<'light' | 'dark'>('colorMode', () => 'dark')
const isDark = computed(() => colorMode.value === 'dark')
const isMobileMenuOpen = ref(false)

const toggleColorMode = () => {
  colorMode.value = isDark.value ? 'light' : 'dark'
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Track if user has scrolled past hero section
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Lock body scroll when menu is open
watch(isMobileMenuOpen, (open) => {
  if (process.server) return
  document.body.style.overflow = open ? 'hidden' : ''
})

// Handle logo click
const handleLogoClick = (e: Event) => {
  if (route.path === '/') {
    e.preventDefault()
    scrollToSection('top')
  }
}

const scrollToSection = (id: string) => {
  closeMobileMenu()
  
  nextTick(() => {
    const el = document.getElementById(id)
    if (!el) return

    const header = document.querySelector('header')
    const offset = header ? (header as HTMLElement).offsetHeight : 0
    const y = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  })
}
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-slate-100/95 backdrop-blur-sm shadow-md dark:bg-slate-900/95'
        : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <!-- Logo -->
      <NuxtLink
        :to="route.path === '/' ? '#top' : '/'"
        class="text-5xl md:text-7xl font-siteName tracking-tight
               text-slate-50 dark:text-slate-50
               hover:opacity-80 transition-opacity"
        :class="[isScrolled && 'text-slate-900 dark:text-slate-50']"
        @click="handleLogoClick"
      >
        Joel Beger
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-4 md:gap-6 text-sm" aria-label="Main navigation">
        
        <a v-for="item in [
            { id: 'top', label: 'About me' },
            { id: 'projects', label: 'Projects' },
            { id: 'skills', label: 'Skills' },
            { id: 'contact', label: 'Contact me' }
          ]"
          :key="item.id"
          :href="`#${item.id}`"
          class="text-xl transition-opacity hover:opacity-80"
          :class="[
            isScrolled
              ? 'text-slate-900 dark:text-slate-200'
              : 'text-slate-50 dark:text-slate-50'
          ]"
          @click.prevent="scrollToSection(item.id)"
        >
          {{ item.label }}
        </a>

        <!-- Desktop theme toggle -->
        <div class="relative">
          <button
            type="button"
            @click="toggleColorMode"
            class="relative inline-flex items-center h-7 w-16 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            :class="[
              isScrolled
                ? isDark ? 'bg-slate-700' : 'bg-slate-300'
                : isDark ? 'bg-slate-800/80' : 'bg-white/30'
            ]"
            aria-label="Toggle color mode"
          >
            <NuxtImg src="/icons/sun2.png" alt="" class="absolute left-1.5 w-6 h-6" />
            <NuxtImg src="/icons/moon2.png" alt="" class="absolute right-1.5 w-6 h-6" />
            <span
              class="relative inline-block h-[26px] w-[26px] transform rounded-full bg-white transition-transform duration-200 ease-in-out shadow-md"
              :class="isDark ? 'translate-x-8' : 'translate-x-1'"
            ></span>
          </button>
          <span
            class="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 text-[10px] whitespace-nowrap transition-colors"
            :class="[
              isScrolled
                ? 'text-slate-900/70 dark:text-slate-200/70'
                : 'text-slate-50/70 dark:text-slate-200/70'
            ]"
          >
            {{ isDark ? 'Dark' : 'Light' }}
          </span>
        </div>
      </nav>

      <!-- Mobile hamburger -->
      <button
        @click="toggleMobileMenu"
        class="md:hidden p-2 rounded-lg"
        :class="[
          isScrolled
            ? 'text-slate-900 dark:text-slate-200'
            : 'text-slate-50 dark:text-slate-200'
        ]"
        aria-label="Toggle menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile menu - using Teleport to render outside header -->
    <Teleport to="body">
      <Transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden fixed inset-0 z-[100]"
        >
          <!-- Overlay -->
          <div 
            class="absolute inset-0 bg-black/50"
            @click="closeMobileMenu"
          ></div>
          
          <!-- Menu panel -->
          <Transition
            appear
            enter-active-class="duration-300 ease-out"
            enter-from-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="duration-200 ease-in"
            leave-from-class="translate-x-0"
            leave-to-class="translate-x-full"
          >
            <div 
              v-if="isMobileMenuOpen"
              class="absolute top-0 right-0 bottom-0 w-64 bg-slate-100 dark:bg-slate-900 shadow-xl"
            >
              <!-- Close button -->
              <button
                @click="closeMobileMenu"
                class="absolute top-4 right-4 p-2 rounded-lg text-slate-900 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close menu"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <nav class="flex flex-col p-6 pt-16 gap-6" aria-label="Mobile navigation">
                
                 <a v-for="item in [
                    { id: 'top', label: 'About me' },
                    { id: 'projects', label: 'Projects' },
                    { id: 'skills', label: 'Skills' },
                    { id: 'contact', label: 'Contact me' }
                  ]"
                  :key="item.id"
                  :href="`#${item.id}`"
                  class="text-xl font-medium text-slate-900 dark:text-slate-200"
                  @click.prevent="scrollToSection(item.id)"
                >
                  {{ item.label }}
                </a>

                <!-- Mobile theme toggle -->
                <button
                  type="button"
                  @click="toggleColorMode"
                  class="relative inline-flex items-center h-7 w-16 rounded-full bg-slate-300 dark:bg-slate-700"
                  aria-label="Toggle color mode"
                >
                  <NuxtImg src="/icons/sun2.png" alt="" class="absolute left-1.5 w-6 h-6" />
                  <NuxtImg src="/icons/moon2.png" alt="" class="absolute right-1.5 w-6 h-6" />
                  <span
                    class="relative inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-md"
                    :class="isDark ? 'translate-x-8' : 'translate-x-1'"
                  ></span>
                </button>
              </nav>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>