import React from 'react'
import { AudioProvider, useAudio, useAudioTime } from '@omi3/audio/react'
import { formatDuration, formatSecondsToISO8601 } from '@omi3/utils'
import { Pause, Play, Repeat, StepBack, StepForward, Volume, Volume1, Volume2, VolumeX } from 'lucide-react'
import Link from '@/components/Link.tsx'
import { Button } from '@/components/ui/button.tsx'
import { ScrollArea } from '@/components/ui/scroll-area.tsx'
import { Slider } from '@/components/ui/slider.tsx'

const AudioPlayer = () => {
  const { currentTime, duration } = useAudioTime()

  const [previousVolume, setPreviousVolume] = useState(1)

  const {
    isPlaying,
    playbackState,
    play,
    pause,
    load,
    isLoading,
    seek,
    error,
    isEngineInitialized,
    setVolume,
    volume,
    isMuted,
    currentMusic,
    isBuffering,
    analyserNode,
    engine,
  } = useAudio()

  useEffect(() => {
    if (error) console.error('Error loading audio:', error)
  }, [error])

  useEffect(() => {
    if (!isLoading && currentMusic?.url !== undefined) play()
  }, [isLoading, currentMusic?.url])

  const onLoadClick = () => {
    load({ url: 'http://localhost:8880/v1/download/tmpzlahwvw9.mp3' })
  }

  const onMute = () => {
    setPreviousVolume(volume)
    setVolume(0)
  }

  const formattedCurrentTime = formatDuration(currentTime)
  // const formattedRemainingTime = formatDuration(Math.max(0, duration - currentTime))
  const formattedRemainingTime = formatDuration(duration)

  const isoCurrentTime = formatSecondsToISO8601(currentTime)
  // const isoRemainingTime = formatSecondsToISO8601(Math.max(0, duration - currentTime))
  const isoRemainingTime = formatSecondsToISO8601(duration)

  return (
    <div className="bg-background m-4 w-xl rounded-lg p-4 shadow-lg">
      <div className="my-4 flex flex-col items-center justify-between gap-4">
        <div className="flex flex-row items-center justify-between gap-12">
          <StepBack />
          <div>
            {!isPlaying && (
              <Button
                onClick={() => play()}
                size="sm"
                className="h-16 w-16 rounded-full"
                disabled={!isEngineInitialized || currentMusic?.url === undefined}
              >
                <Play size={80} className="fill-white" />
              </Button>
            )}
            {isPlaying && (
              <Button
                onClick={() => pause()}
                size="icon"
                className="h-16 w-16 rounded-full"
                disabled={!isEngineInitialized}
              >
                <Pause className="fill-white" />
              </Button>
            )}
          </div>
          <StepForward />
        </div>

        <div className="flex w-full flex-row items-center gap-4 px-2">
          <div className="flex flex-row gap-2">
            <time dateTime={isoCurrentTime}>{formattedCurrentTime}</time>
            {' / '}
            <time dateTime={isoRemainingTime}>{formattedRemainingTime}</time>
          </div>
          <Slider
            value={[currentTime]}
            step={0.01}
            min={0}
            max={duration}
            onValueChange={(value: number[]) => seek(value[0])}
          />
        </div>

        <div className="flex w-full flex-row items-center gap-4 px-2">
          {volume <= 0 && <VolumeX onClick={() => setVolume(previousVolume)} />}
          {volume > 0 && volume <= 0.33 && <Volume onClick={onMute} />}
          {volume > 0.33 && volume <= 0.66 && <Volume1 onClick={onMute} />}
          {volume > 0.66 && <Volume2 onClick={onMute} />}
          <Slider
            value={[volume]}
            onValueChange={(value: number[]) => setVolume(value[0])}
            step={0.01}
            min={0}
            max={1}
          />
          {/*<div className="w-8 text-center">{Math.round(volume * 100)}</div>*/}
        </div>

        {currentMusic?.url === undefined && <Button onClick={() => onLoadClick()}>Load</Button>}
      </div>
    </div>
  )
}

const Player = () => {
  return (
    <AudioProvider>
      <AudioPlayer />
    </AudioProvider>
  )
}

export const PlayerInjectWrapper = () => {
  return <Player />
}

export default Player
