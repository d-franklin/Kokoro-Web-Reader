import { ProtocolWithReturn } from 'webext-bridge'
import { CountModel, HtmlModel } from '@/models/dataModel.ts'
import { messageType } from '@/models/messageType.ts'

declare module 'webext-bridge' {
  export interface ProtocolMap {
    [messageType.background]: { title: string }
    [messageType.content]: { title: string }
    [messageType.popup]: { title: string }
    // Data, Return
    [messageType.count]: ProtocolWithReturn<CountModel, CountModel>
    [messageType.getHtml]: ProtocolWithReturn<HtmlModel, HtmlModel>
  }
}
