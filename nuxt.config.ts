// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  app: {
    head: {
      title: 'Stack Deals',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Stack Deals - Find the best real estate investment opportunities' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Stack Deals' },
        { property: 'og:description', content: 'Stack Deals - Find the best real estate investment opportunities' },
        { property: 'og:image', content: 'https://stackdeals.netlify.app/logo.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:url', content: 'https://stackdeals.netlify.app' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Stack Deals' },
        { name: 'twitter:description', content: 'Stack Deals - Find the best real estate investment opportunities' },
        { name: 'twitter:image', content: 'https://stackdeals.netlify.app/logo.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  vue: {  
    compilerOptions: {
      isCustomElement: (tag) => ['mapbox-search-box'].includes(tag),
    },
  },
  runtimeConfig: {
    public: {
        MAPBOX_API_TOKEN: process.env.MAPBOX_API_TOKEN,
        ZILLOW_API_KEY: process.env.ZILLOW_API_KEY,
        REAL_ESTATE_API_KEY: process.env.REAL_ESTATE_API_KEY,
        GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
        GOOGLE_SHEETS_API_CREDENTIALS: process.env.GOOGLE_SHEETS_API_CREDENTIALS,
        SEND_GRID_API_KEY: process.env.SEND_GRID_API_KEY,
        apiBaseUrl: process.env.API_BASE_URL || 'https://shark-app-gfe6f.ondigitalocean.app'
    }
}
})
