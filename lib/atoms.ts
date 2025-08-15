import { atom } from 'jotai'
import { TabEnum } from '@/lib/tabs.ts'

export const activeTabAtom = atom<TabEnum>(TabEnum.Player)
