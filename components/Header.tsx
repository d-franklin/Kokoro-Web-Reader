import { useAtom } from 'jotai'
import { CircleQuestionMark, Speech } from 'lucide-react'
import { showHelpAtom } from '@/lib/atoms.ts'

const Header = () => {
  const [showHelp, setShowHelp] = useAtom(showHelpAtom)

  return (
    <div className="flex items-center justify-between gap-2 border-b-2 p-4 font-bold text-green-700">
      <Speech />
      <div className="text-sm">Kokoro Web Reader</div>
      <CircleQuestionMark
        className={`cursor-pointer ${showHelp ? 'text-primary' : 'text-accent'}`}
        onClick={() => setShowHelp(!showHelp)}
      />
    </div>
  )
}

export default Header
