<script setup lang="ts">
const { setPageSeo } = useSeo()

setPageSeo({
  title: 'Contact Joel Beger | Hire a Frontend Developer',
  description: 'Get in touch with Joel Beger for your next web development project. Specializing in frontend development, Shopify, HubSpot, Webflow, WordPress, and performance optimization.',
  path: '/contact',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Joel Beger',
    description: 'Get in touch with Joel Beger for web development projects.',
    mainEntity: {
      '@type': 'Person',
      name: 'Joel Beger',
      url: 'https://joelbeger.com',
    }
  }
})

const formData = ref({
  name: '',
  email: '',
  company: '',
  message: '',
  botcheck: ''
})

const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    company: '',
    message: '',
    botcheck: ''
  }
}

const handleSubmit = async () => {
  if (formData.value.botcheck) {
    return
  }

  isSubmitting.value = true
  submitStatus.value = 'idle'
  errorMessage.value = ''

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: 'b99b64e5-b5af-4b7f-ac5f-0a22a4e95626',
        name: formData.value.name,
        email: formData.value.email,
        company: formData.value.company,
        message: formData.value.message,
        subject: `New Dev Request from ${formData.value.name}`,
      })
    })

    const result = await response.json()

    if (result.success) {
      submitStatus.value = 'success'
      resetForm()
      setTimeout(() => {
        submitStatus.value = 'idle'
      }, 5000)
    } else {
      submitStatus.value = 'error'
      errorMessage.value = 'Something went wrong. Please try again.'
    }
  } catch (error) {
    submitStatus.value = 'error'
    errorMessage.value = 'Failed to send message. Please try again.'
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="min-h-screen">
    <section class="max-w-7xl mx-auto px-4 py-20 scroll-mt-32">
      <h1 class="text-4xl md:text-5xl font-heading font-bold mb-3 text-center">
        Contact Joel Beger
      </h1>
      <p class="text-center mb-10 text-lg text-slate-200 dark:text-slate-300">
        Have a project in mind? Joel Beger is available for freelance and contract web development work.
        Fill out the form below and I'll get back to you soon.
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-200">
            Name *
          </label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            required
            class="w-full px-4 py-3 rounded-lg border
                   border-slate-200 bg-white text-slate-900
                   dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100
                   focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400
                   transition"
            placeholder="Your name"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-200">
            Email *
          </label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            class="w-full px-4 py-3 rounded-lg border
                   border-slate-200 bg-white text-slate-900
                   dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100
                   focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400
                   transition"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label for="company" class="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-200">
            Company (optional)
          </label>
          <input
            id="company"
            v-model="formData.company"
            type="text"
            class="w-full px-4 py-3 rounded-lg border
                   border-slate-200 bg-white text-slate-900
                   dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100
                   focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400
                   transition"
            placeholder="Your company"
          />
        </div>

        <div>
          <label for="message" class="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-200">
            Project Details *
          </label>
          <textarea
            id="message"
            v-model="formData.message"
            required
            rows="6"
            class="w-full px-4 py-3 rounded-lg border
                   border-slate-200 bg-white text-slate-900
                   dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100
                   focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400
                   transition resize-none"
            placeholder="Tell me about your project..."
          ></textarea>
        </div>

        <input
          v-model="formData.botcheck"
          type="checkbox"
          name="botcheck"
          class="hidden"
          style="display: none;"
        />

        <div
          v-if="submitStatus === 'success'"
          class="p-4 rounded-lg bg-green-100 dark:bg-green-900/30
                 border border-green-300 dark:border-green-700"
        >
          <p class="text-green-800 dark:text-green-200 text-sm">
            Thanks for reaching out! I'll get back to you soon.
          </p>
        </div>

        <div
          v-if="submitStatus === 'error'"
          class="p-4 rounded-lg bg-red-100 dark:bg-red-900/30
                 border border-red-300 dark:border-red-700"
        >
          <p class="text-red-800 dark:text-red-200 text-sm">
            {{ errorMessage }}
          </p>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full px-6 py-3 rounded-lg font-medium
                 bg-slate-600 text-white hover:bg-slate-700
                 dark:bg-slate-500 dark:hover:bg-slate-600
                 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-colors"
        >
          {{ isSubmitting ? 'Sending...' : 'Send Message' }}
        </button>
      </form>

      <!-- Alternative contact -->
      <div class="mt-12 text-center">
        <p class="text-slate-300 dark:text-slate-400 mb-2">Or connect directly:</p>
        <div class="flex justify-center gap-6">
          <a
            href="https://www.linkedin.com/in/jtbeger/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-slate-200 hover:text-white dark:text-slate-300 dark:hover:text-slate-100 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:jtbeger@email.com"
            class="text-slate-200 hover:text-white dark:text-slate-300 dark:hover:text-slate-100 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
