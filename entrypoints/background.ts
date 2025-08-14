import { onMessage, sendMessage } from 'webext-bridge/background'
import { messageType } from '@/models/messageType.ts'

const contentMenuName = 'read-webpage-menu'

const readWebPage = async (info: globalThis.Browser.contextMenus.OnClickData, tab: globalThis.Browser.tabs.Tab | undefined) => {
  console.log('Context menu item clicked!', info, tab)

  if (!tab) return

  const model = await sendMessage(messageType.getHtml, { html: 'asd' }, `content-script@${tab.id}`)
  console.log('model', model)
}

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id })

  browser.contextMenus.create({
    id: contentMenuName,
    title: 'Send to Kokoro',
    contexts: ['page', 'selection'],
  })

  browser.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === contentMenuName) {
      await readWebPage(info, tab)
    }
  })

  onMessage(messageType.background, message => {
    // Handle the message
    console.log('background background', message)

    // return {
    //   data: 'Response from background script',
    // }

    // const returnData = await sendMessage('bar', {
    //   /* ... */
    // })

    /*await sendMessage('popup', {
      title: 'Hello from background!',
    })*/
  })

  onMessage(messageType.count, message => {
    console.log('background count', message)

    // must return CountModel because ProtocolMap says so
    return {
      count: message.data.count + 1,
    }
  })
})
