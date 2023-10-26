import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "💳 CesPay",
  base: '/cordova-codeeshop-cespay/',
  description: "Cordova Payment Method Integration with In-App Browser",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Examples', link: '/examples' }      
    ],

    sidebar: [
      {
        text: 'Reference',
        items: [
          { text: 'What is CesPay?', link: 'what-is-cespay' },
          { text: 'Getting Started', link: 'getting-started' },          
          { text: 'Examples', link: 'examples' }
        ]
      },
      {
        text: 'API',
        items: [
          { text: 'Props', link: '/api/props' }          
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/codeeshop-oc/cordova-codeeshop-cespay' }
    ]
  }
})
