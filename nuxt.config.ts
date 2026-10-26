import { experienceMedia } from './utils/portfolio'

const experienceIds = Object.keys(experienceMedia)
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const siteName = 'Douglas C Martins'
const siteTitle = 'Douglas C Martins | Desenvolvedor Full Stack — DCMARTINS.CO'
const siteDescription = 'Douglas C Martins — Desenvolvedor Full Stack que constrói produtos digitais escaláveis com Laravel, PHP e Vue.js. Experiência em pagamentos, e-commerce, APIs e arquitetura de software.'
const shareImage = `${siteUrl}/images/hero-bg.webp`
const shareImageAlt = 'Fundo abstrato do portfólio de Douglas C Martins'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl,
      rumEndpoint: process.env.NUXT_PUBLIC_RUM_ENDPOINT || '',
    },
  },
  typescript: {
    strict: true,
  },
  devtools: { enabled: false },
  css: ['@/assets/css/main.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: siteTitle,
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'pt-BR' },
      meta: [
        { name: 'description', content: siteDescription },
        { name: 'author', content: siteName },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:site_name', content: siteName },
        { property: 'og:locale', content: 'pt_BR' },
        { property: 'og:title', content: siteTitle },
        { property: 'og:description', content: siteDescription },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: siteUrl },
        { property: 'og:image', content: shareImage },
        { property: 'og:image:alt', content: shareImageAlt },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: siteTitle },
        { name: 'twitter:description', content: siteDescription },
        { name: 'twitter:image', content: shareImage },
        { name: 'twitter:image:alt', content: shareImageAlt },
      ],
      link: [
        { rel: 'canonical', href: siteUrl },
        { rel: 'icon', href: '/favicon.png' },
        {
          rel: 'preload',
          href: '/fonts/ibm-plex-mono-latin-400.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
        {
          rel: 'preload',
          href: '/fonts/raleway-latin-800.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
      ],
      style: [
        {
          children: `
           html{scroll-behavior:smooth;}
            body {
              font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              margin: 0 !important;
              box-sizing: border-box !important;
              background: #080808;
              color: #ffffff;
            }`
        },
      ],
    },
  },
  compatibilityDate: '2025-02-03',
  modules: ['@nuxt/image'],
  image: {
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    provider: 'ipx',
    presets: {
      custom: {
        modifiers: {
          format: 'webp',
          quality: '80',
          fit: 'cover'
        }
      }
    },
    ipx: {
      maxAge: 31536000,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=31536000, immutable'
      },
      sharp: {
        failOnError: false
      }
    },
  },
  vite: {
    cacheDir: '.nuxt/vite',
    server: {
      watch: {
        usePolling: process.env.CHOKIDAR_USEPOLLING === 'true',
      },
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      reportCompressedSize: true,
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', ...experienceIds.map(id => `/experience/${id}`)],
    },
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    routeRules: {
      '/_ipx/**': {
        headers: {
          'cache-control': 'public, max-age=31536000, immutable',
        },
      },
      '/_nuxt/**': {
        headers: {
          'cache-control': 'public, max-age=31536000, immutable',
        },
      },
    },
  },
  postcss: {
    plugins: {
      cssnano: process.env.NODE_ENV === 'production' ? { preset: 'default' } : false,
    },
  },
});