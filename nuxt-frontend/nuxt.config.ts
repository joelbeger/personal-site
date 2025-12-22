// nuxt.config.ts
export default defineNuxtConfig({
  // https://nuxt.com/docs/api/configuration/nuxt-config
  compatibilityDate: '2025-07-15',
  
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Joel Beger - Frontend Developer',
      meta: [
        { name: 'author', content: 'Joel Beger' },
        { name: 'keywords', content: 'Joel Beger, Frontend Developer, Web Developer, React, Vue, Nuxt, Shopify' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preload', as: 'font', type: 'font/ttf', href: '/fonts/RemachineScript.ttf', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'font', type: 'font/ttf', href: '/fonts/Montserrat-Regular.ttf', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'font', type: 'font/ttf', href: '/fonts/Montserrat-Bold.ttf', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'font', type: 'font/ttf', href: '/fonts/Roboto-Regular.ttf', crossorigin: 'anonymous' },
      ]
    }
  },

  devtools: {
    enabled: true,
  },

  pages: true,

  css: ['~/assets/css/tailwind.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
      '@nuxtjs/sitemap',
      '@nuxt/image'
  ],

  sitemap: {
    sources: [
        '/api/__sitemap__/urls'
      ]
  },
   image: {
    strapi: {
      baseURL: process.env.NUXT_PUBLIC_STRAPI_URL || 'https://api.joelbeger.com'
    }
  },
  runtimeConfig: {
    public: {
      strapiUrl: process.env.STRAPI_URL || 'https://api.joelbeger.com',
      siteUrl: process.env.SITE_URL || 'https://joelbeger.com', // Change to your production domain when deploying
    },
  },
})