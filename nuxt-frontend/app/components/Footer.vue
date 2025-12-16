<template>
  <footer class="border-t border-slate-200 dark:border-slate-700 mt-20">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <!-- Copyright/Name -->
        <p class="text-sm text-slate-600 dark:text-slate-400">
          © 2025 Joel Beger. Built with Nuxt 4 & Strapi.
        </p>
        
        <!-- Social/Contact Links -->
        <div class="flex gap-6">
          <a 
            href="https://www.linkedin.com/in/jtbeger/" 
            target="_blank"
            class="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="jtbeger@email.com"
            class="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>