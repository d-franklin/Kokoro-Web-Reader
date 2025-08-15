import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    // These permissions are required for "webext-dynamic-content-scripts" and "webext-permission-toggle" to work.
    permissions: ['storage', 'scripting', 'activeTab', 'contextMenus', 'sidePanel'],

    // @ts-ignore: Valid MV3 key for chrome
    // optional_host_permissions: ['*://*/*'],
  },
  webExt: {
    startUrls: [
      'http://localhost:8880/web/',
      'https://wxt.dev/guide/essentials/messaging.html',
      'http://localhost:8880/docs',
    ],
  },
})
