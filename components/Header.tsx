import { MessageSquareText } from 'lucide-react'

const Header = () => {
  return (
    <div className="flex items-center gap-2 border-b-2 p-4 font-bold text-green-700">
      <MessageSquareText />
      <div className="text-sm">Kokoro Web Reader</div>
    </div>
  )
}

export default Header
