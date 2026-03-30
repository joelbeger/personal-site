<template>
  <div class="mt-16">
    <div class="p-8 rounded-2xl bg-white/5 dark:bg-slate-800/30 border border-slate-200/20 dark:border-slate-700/30 text-center">
      <h2 class="text-2xl font-heading font-semibold mb-3">
        Like what you see?
      </h2>
      <p class="text-slate-200 dark:text-slate-300 mb-6">
        Let's discuss how Joel Beger can help with your next project.
      </p>
      <NuxtLink
        to="/contact"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-lg
               bg-slate-600 hover:bg-slate-500 text-white font-medium
               transition-colors duration-200"
      >
        Get in Touch
      </NuxtLink>
    </div>

    <div class="mt-4 text-center">
      <p class="text-sm text-slate-400 dark:text-slate-500 mb-1">Or connect directly:</p>
      <div class="flex justify-center gap-6">
        <a
          href="https://www.linkedin.com/in/jtbeger/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-slate-300 hover:text-white dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="mailto:jtbeger@email.com"
          class="text-sm text-slate-300 hover:text-white dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          Email
        </a>
      </div>
    </div>
  </div>
</template>
