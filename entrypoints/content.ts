import { onMessage } from 'webext-bridge/content-script'
import { messageType } from '@/models/messageType.ts'

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    console.log('Hello content.')

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
