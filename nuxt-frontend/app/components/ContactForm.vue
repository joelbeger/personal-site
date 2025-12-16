<script setup lang="ts">
const formData = ref({
  name: '',
  email: '',
  company: '',
  message: '',
  botcheck: '' // honeypot field for spam protection
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
  // Check honeypot - if filled, it's a bot
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
        access_key: 'b99b64e5-b5af-4b7f-ac5f-0a22a4e95626', // Replace with your actual key
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
      
      // Reset success message after 5 seconds
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
  <section id="contact" class="max-w-3xl mx-auto px-4 py-20 scroll-mt-32">
    <h2 class="text-4xl font-heading font-semibold mb-3 text-center">
      Let's Work Together
    </h2>
    <p class="text-center mb-8 text-slate-800 dark:text-slate-300">
      Have a project in mind? Fill out the form below and I'll get back to you soon.
    </p>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Name -->
      <div>
        <label 
          for="name" 
          class="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-200"
        >
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

      <!-- Email -->
      <div>
        <label 
          for="email" 
          class="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-200"
        >
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

      <!-- Company (optional) -->
      <div>
        <label 
          for="company" 
          class="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-200"
        >
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

      <!-- Message -->
      <div>
        <label 
          for="message" 
          class="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-200"
        >
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

      <!-- Honeypot (hidden field for spam protection) -->
      <input
        v-model="formData.botcheck"
        type="checkbox"
        name="botcheck"
        class="hidden"
        style="display: none;"
      />

      <!-- Success Message -->
      <div
        v-if="submitStatus === 'success'"
        class="p-4 rounded-lg bg-green-100 dark:bg-green-900/30 
               border border-green-300 dark:border-green-700"
      >
        <p class="text-green-800 dark:text-green-200 text-sm">
          ✓ Thanks for reaching out! I'll get back to you soon.
        </p>
      </div>

      <!-- Error Message -->
      <div
        v-if="submitStatus === 'error'"
        class="p-4 rounded-lg bg-red-100 dark:bg-red-900/30 
               border border-red-300 dark:border-red-700"
      >
        <p class="text-red-800 dark:text-red-200 text-sm">
          {{ errorMessage }}
        </p>
      </div>

      <!-- Submit Button -->
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
  </section>
</template>