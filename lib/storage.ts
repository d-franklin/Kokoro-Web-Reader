import { storage } from '#imports'
import { Schema } from '@/lib/form.ts'

const storageDataName = 'local:data'
const storageVoicesName = 'local:voices'

export const getVoicesStorage = async () => {
  return await storage.getItem<string[]>(storageVoicesName)
}
export const setVoicesStorage = async (voices: string[]) => {
  await storage.setItem<string[]>(storageVoicesName, voices)
}

export const getDataStorage = async () => {
  return await storage.getItem<Schema>(storageDataName)
}
export const setDataStorage = async (data: Schema) => {
  await storage.setItem<Schema>(storageDataName, data)
}
