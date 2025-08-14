import { defineConfig } from 'wxt'
import tailwindcss from '@tailwindcss/vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    // These permissions are required for "webext-dynamic-content-scripts" and
    // "webext-permission-toggle" to work.
    permissions: ['storage', 'scripting', 'activeTab', 'contextMenus'],

    // @ts-ignore: Valid MV3 key for chrome
    optional_host_permissions: ['*://*/*'],
  },
})
