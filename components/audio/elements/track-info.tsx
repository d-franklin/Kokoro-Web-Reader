import React from 'react'
import { useAudioState } from '@omi3/audio/react'
import { MusicIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type AudioTrackArtworkProps = React.ComponentProps<'div'> & {
  iconClassName?: string
}

function AudioTrackArtwork({ className, iconClassName, ...props }: AudioTrackArtworkProps) {
  return (
    <div
      className={cn('bg-muted flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm', className)}
      {...props}
    >
      <MusicIcon className={cn('text-muted-foreground h-5 w-5', iconClassName)} />
    </div>
  )
}

type AudioTrackInfoProps = React.ComponentProps<'div'>

export function AudioTrackInfo({ className, ...props }: AudioTrackInfoProps) {
  const { isLoading, error, currentMusic } = useAudioState()

  if (isLoading) {
    return (
      <div
        className={cn('flex w-full items-center space-x-2 truncate', className)}
        {...props}
        data-state="loading"
        aria-live="polite"
        aria-busy="true"
      >
        <AudioTrackArtwork />
        <div className="space-y-1">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className={cn('text-destructive flex w-full items-center space-x-2 truncate', className)}
        {...props}
        data-state="error"
        role="alert"
      >
        <AudioTrackArtwork />
        <div className="space-y-1">
          <p className="text-sm font-medium">Error loading track</p>
          <p className="text-xs">{error.message || 'An unknown error occurred.'}</p>
        </div>
      </div>
    )
  }

  if (!currentMusic) {
    return (
      <div className={cn('flex w-full items-center space-x-2 truncate', className)} {...props} data-state="empty">
        <AudioTrackArtwork />
        <div className="space-y-1">
          <p className="text-sm font-medium">No track selected</p>
          <p className="text-muted-foreground text-xs">Please select a track</p>
        </div>
      </div>
    )
  }

  const itemScope = true
  const itemType = 'https://schema.org/MusicRecording'

  return (
    <div
      className={cn('flex w-full items-center space-x-2 truncate', className)}
      itemScope={itemScope}
      itemType={itemType}
      {...props}
      data-state="loaded"
    >
      {currentMusic.artwork ? (
        <figure className="aspect-square size-10 flex-shrink-0 overflow-hidden rounded-sm" itemProp="image">
          <img
            src={currentMusic.artwork.src}
            alt={`Artwork for ${currentMusic.title || 'track'}`}
            className="size-full object-cover"
          />
        </figure>
      ) : (
        <AudioTrackArtwork />
      )}
      <dl className="space-y-1 overflow-hidden">
        <div>
          <dt className="sr-only">Title</dt>
          <dd className="truncate text-sm font-medium" itemProp="name">
            {currentMusic.title || 'Unknown Title'}
          </dd>
        </div>
        <div>
          <dt className="sr-only">Artist</dt>
          <dd className="text-muted-foreground truncate text-xs" itemProp="byArtist">
            {currentMusic.artist || 'Unknown Artist'}
          </dd>
        </div>
      </dl>
    </div>
  )
}
