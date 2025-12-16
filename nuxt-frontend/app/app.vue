<script setup lang="ts">
const colorMode = useState<'light' | 'dark'>('colorMode', () => 'dark')

const isDark = computed(() => colorMode.value === 'dark')

const toggleColorMode = () => {
  colorMode.value = isDark.value ? 'light' : 'dark'
}

// read saved preference on first load
onMounted(() => {
  const stored = localStorage.getItem('color-mode')
  if (stored === 'light' || stored === 'dark') {
    colorMode.value = stored
  }
})

// save preference whenever it changes
watch(colorMode, (mode) => {
  localStorage.setItem('color-mode', mode)
})
</script>

<template>
  <!-- Wrap the entire app in theme toggle -->
  <div :class="{ dark: isDark }">
    <div
      class="min-h-screen 
             bg-sky-500 text-sky-50 
             dark:bg-slate-950 dark:text-slate-50"
    >
      <Header />
      <NuxtPage />
      <Footer />
    </div>
  </div>
</template>
