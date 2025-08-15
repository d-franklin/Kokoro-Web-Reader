import { MessageSquareText } from 'lucide-react'

const Header = () => {
  return (
    <div className="text-primary flex items-center gap-2 border-b-1 p-4 font-bold">
      <MessageSquareText />
      <div className="text-sm">Kokoro Web Reader</div>
    </div>
  )
}

export default Header
