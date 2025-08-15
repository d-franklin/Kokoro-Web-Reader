import type { ContentScriptContext } from '#imports'
import ReactDOM from 'react-dom/client'
import { onMessage } from 'webext-bridge/content-script'
import '@/assets/tailwind.css'
import { PlayerInjectWrapper } from '@/components/Player.tsx'
import { messageType } from '@/models/messageType.ts'

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const ui = await injectPlayerUi(ctx)
    ui.mount()

    onMessage(messageType.content, ({ data }) => {
      console.log('content', data)
    })

    onMessage(messageType.getHtml, ({ data }) => {
      console.log('getHtml', data)

      return {
        html: document.documentElement.outerHTML,
      }
    })
  },
})

const injectPlayerUi = (ctx: ContentScriptContext) => {
  return createShadowRootUi(ctx, {
    name: 'player-shadow-root',
    position: 'inline',
    anchor: 'body',
    append: 'first',
    onMount: container => {
      // Set dark mode
      container.classList.add('dark')

      // Container is a body, and React warns when creating a root on the body, so create a wrapper div
      const app = document.createElement('div')
      app.style.zIndex = '9999' // Set a high z-index
      app.style.position = 'fixed'
      // app.style.top = '0'
      // app.style.left = '0'
      // app.style.right = '0'
      container.append(app)

      // Create a root on the UI container and render a component
      const root = ReactDOM.createRoot(app)
      root.render(<PlayerInjectWrapper />)
      return root
    },
    onRemove: root => {
      // Unmount the root when the UI is removed
      root?.unmount()
    },
  })
}
