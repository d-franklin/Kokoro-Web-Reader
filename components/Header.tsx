import { useAtom } from 'jotai'
import { CircleQuestionMark, MessageSquareText, Speech } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx'
import { showHelpAtom } from '@/lib/atoms.ts'

const Header = () => {
  const [showHelp, setShowHelp] = useAtom(showHelpAtom)

  return (
    <div className="flex items-center justify-between gap-2 border-b-2 p-4 font-bold text-green-700">
      <MessageSquareText />
      <div className="text-sm">Kokoro Web Reader</div>

      <Tooltip>
        <TooltipTrigger>
          <CircleQuestionMark
            className={`cursor-pointer ${showHelp ? 'text-primary' : 'text-accent'}`}
            onClick={() => setShowHelp(!showHelp)}
          />
        </TooltipTrigger>
        {!showHelp && (
          <TooltipContent>
            <p>View Help</p>
          </TooltipContent>
        )}
      </Tooltip>
    </div>
  )
}

export default Header
