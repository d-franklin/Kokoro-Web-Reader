import { Pause, Play } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area.tsx'

const Player = () => {
  return (
    <ScrollArea className="h-dvw px-4">
      <Play />
      <Pause />
      <div className="bg-zinc-700">a</div>
      <div>a</div>
      <div>a</div>
      <div>a</div>
      <audio autoPlay={true} loop={true} controls={true} style={{ width: '100%' }} onEnded={() => console.log('ended')}>
        <source src="http://localhost:8880/v1/download/tmpeq42vwsm.mp3" type="audio/mpeg" />
        {/*<source src="background-music.ogg" type="audio/ogg" />*/}
        Your browser does not support the audio element.
      </audio>
    </ScrollArea>
  )
}

export default Player
