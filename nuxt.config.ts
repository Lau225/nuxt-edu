// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app:{
    head:{
      titleTemplate:"%s - 编程大王",
      title:"课堂",
      charset:'utf-8',
      htmlAttrs:{
        lang:'zh-cn'
      },
      meta:[
        {name:"description",content:"课堂描述"},
        {name:"keywords",content:"课堂关键词"}
      ],
      script:[],
      link:[]
    }
  },
  css:[
    "~/assets/main.css"
  ],
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer'
          ]
        : ['@juggle/resize-observer']
  },
  modules: [
    'nuxt-windicss',
  ],
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/formatInTimeZone']
          : []
    }
  },
  imports:{
    dirs:["apis"]
  }
})