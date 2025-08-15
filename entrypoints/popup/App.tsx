import { useAtom } from 'jotai'
import Header from '@/components/Header.tsx'
import Help from '@/components/Help.tsx'
import Player from '@/components/Player.tsx'
import Settings from '@/components/Settings.tsx'
import { Toaster } from '@/components/ui/sonner.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { activeTabAtom } from '@/lib/atoms.ts'
import { TabEnum } from '@/lib/tabs.ts'

const App = () => {
  const [activeTab, setActiveTab] = useAtom<TabEnum>(activeTabAtom) // useState could be used here instead since the atom is reloaded on popup open

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
        <TabsContent value={TabEnum.Player.toString()}>
          <Player />
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
