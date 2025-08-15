import React from 'react'
import Header from '@/components/Header.tsx'
import Help from '@/components/Help.tsx'
import Link from '@/components/Link.tsx'
import Player from '@/components/Player.tsx'
import Settings from '@/components/Settings.tsx'
import { ScrollArea } from '@/components/ui/scroll-area.tsx'
import { Toaster } from '@/components/ui/sonner.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { TabEnum } from '@/lib/tabs.ts'

const App = () => {
  const [activeTab, setActiveTab] = useState<TabEnum>(TabEnum.Previous) // useState could be used here instead since the atom is reloaded on popup open

  const onValueChange = (value: string) => setActiveTab(TabEnum[value as keyof typeof TabEnum])

  return (
    <div className="h-120 w-100 overflow-hidden">
      {/* TODO: Fix this horrible overflow hack ^^^ */}

      <Header />

      <Tabs
        defaultValue={activeTab.toString()}
        value={activeTab.toString()}
        onValueChange={onValueChange}
        className="w-full gap-0"
      >
        <TabsList className="w-full rounded-none border-none bg-transparent p-0">
          {Object.values(TabEnum).map(name => (
            <TabsTrigger
              key={name}
              value={name}
              className="data-[state=active]:after:bg-primary relative cursor-pointer flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
        {/*<TabsContent value={TabEnum.Player.toString()}>
          <Player />
        </TabsContent>*/}
        <TabsContent value={TabEnum.Previous.toString()}>
          <div>Previous Webpage TTS</div>

          <ScrollArea className="h-40 w-full gap-2 px-2">
            <div className="flex flex-row justify-between gap-1">
              <div>Messaging – WXT</div>
              <div className="text-primary cursor-pointer">Play</div>
              <Link href="https://wxt.dev/guide/essentials/messaging.html">Website</Link>
            </div>
            <div className="flex flex-row justify-between gap-1">
              <div>Messaging – WXT</div>
              <div>Messaging – WXT</div>
            </div>
            <div className="flex flex-row justify-between gap-1">
              <div>Messaging – WXT</div>
              <div>Messaging – WXT</div>
            </div>
            <div className="flex flex-row justify-between gap-1">
              <div>Messaging – WXT</div>
              <div>Messaging – WXT</div>
            </div>
            <div className="flex flex-row justify-between gap-1">
              <div>Messaging – WXT</div>
              <div>Messaging – WXT</div>
            </div>
            <div className="flex flex-row justify-between gap-1">
              <div>Messaging – WXT</div>
              <div>Messaging – WXT</div>
            </div>
            <div className="flex flex-row justify-between gap-1">
              <div>Messaging – WXT</div>
              <div>Messaging – WXT</div>
            </div>
            <div className="flex flex-row justify-between gap-1">
              <div>Messaging – WXT</div>
              <div>Messaging – WXT</div>
            </div>
            <div className="flex flex-row justify-between gap-1">
              <div>Messaging – WXT</div>
              <div>Messaging – WXT</div>
            </div>
            <div className="flex flex-row justify-between gap-1">
              <div>Messaging – WXT</div>
              <div>Messaging – WXT</div>
            </div>
            <div className="flex flex-row justify-between gap-1">
              <div>Messaging – WXT</div>
              <div>Messaging – WXT</div>
            </div>
            <div className="flex flex-row justify-between gap-1">
              <div>Messaging – WXT</div>
              <div>Messaging – WXT</div>
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value={TabEnum.Settings.toString()}>
          <Settings />
        </TabsContent>
        <TabsContent value={TabEnum.Help.toString()}>
          <Help />
        </TabsContent>
      </Tabs>

      <Toaster position="top-center" richColors />
    </div>
  )
}

export default App
