import { useAtomValue } from 'jotai'
import Header from '@/components/Header.tsx'
import Help from '@/components/Help.tsx'
import SettingsForm from '@/components/forms/SettingsForm.tsx'
import { Toaster } from '@/components/ui/sonner.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { showHelpAtom } from '@/lib/atoms.ts'

const App = () => {
  const showHelp = useAtomValue(showHelpAtom)

  return (
    <>
      <div className="h-120 w-100">
        <Header />
        <Tabs defaultValue="settings" className="h-full" value={showHelp ? 'how-to' : 'settings'}>
          {/*<TabsList>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="how-to">How To</TabsTrigger>
          </TabsList>*/}
          <TabsContent value="settings">
            <SettingsForm />
          </TabsContent>
          <TabsContent value="how-to">
            <Help />
          </TabsContent>
        </Tabs>
      </div>

      <Toaster position="top-center" richColors />
    </>
  )
}

export default App
