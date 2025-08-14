import { useAtomValue } from 'jotai'
import Header from '@/components/Header.tsx'
import Help from '@/components/Help.tsx'
import SettingsForm from '@/components/forms/SettingsForm.tsx'
import { Toaster } from '@/components/ui/sonner.tsx'
import { showHelpAtom } from '@/lib/atoms.ts'

const App = () => {
  const showHelp = useAtomValue(showHelpAtom)

  return (
    <div className="h-120 w-100 overflow-hidden">
      {/* TODO: ^^^ Fix this horrible overflow hack */}

      <Header />

      {!showHelp && <SettingsForm />}
      {showHelp && <Help />}

      <Toaster position="top-center" richColors />
    </div>
  )
}

export default App
