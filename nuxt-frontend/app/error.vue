<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <main class="min-h-screen flex items-center justify-center px-4">
    <div class="text-center space-y-6 max-w-md">
      <h1 class="text-6xl font-bold text-slate-800 dark:text-slate-100">
        {{ error?.statusCode || '404' }}
      </h1>
      
      <h2 class="text-2xl font-semibold text-slate-700 dark:text-slate-200">
        Page Not Found
      </h2>
      
      <p class="text-slate-600 dark:text-slate-400">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      
      <button
        @click="handleError"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-lg
               bg-slate-700 hover:bg-slate-600 text-white
               dark:bg-slate-600 dark:hover:bg-slate-500
               transition-colors duration-200"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </button>
    </div>
  </main>
</template>