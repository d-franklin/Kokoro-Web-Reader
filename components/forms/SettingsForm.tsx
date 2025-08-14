import { useState } from 'react'
import { storage } from '#imports'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtomValue } from 'jotai'
import { TableOfContents } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { onMessage } from 'webext-bridge/popup'
import { z } from 'zod'
import { Button } from '@/components/ui/button.tsx'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import { ScrollArea } from '@/components/ui/scroll-area.tsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx'
import { Slider } from '@/components/ui/slider.tsx'
import { showHelpAtom } from '@/lib/atoms.ts'
import { messageType } from '@/models/messageType.ts'

const formSchema = z.object({
  voice: z.string().min(1),
  language: z.string().min(1),
  server: z.url().min(1),
  volume: z.number().min(1).max(100),
})
type Schema = z.infer<typeof formSchema>
const formFields = formSchema.keyof().enum

const storageName = 'local:data'

const SettingsForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voice: '',
      language: '',
      server: '',
      volume: 10,
    },
  })

  const [showDescription, setShowDescription] = useState<boolean>(true)
  const [voices, setVoices] = useState<string[]>([])

  const updateFormValues = () =>
    storage.getItem<Schema>(storageName).then(value => {
      if (!value) return

      for (let key in formFields) {
        form.setValue(key as keyof Schema, value[key as keyof Schema])
      }
    })

  /*useEffect(() => {
    onMessage(messageType.popup, async message => {
      console.log('popup', message)
    })
  }, [])*/

  /*const onSendMessage = async () => {
    await sendMessage(messageType.background, {
      title: 'Hello from popup!',
    })

    const model = await sendMessage(messageType.count, {
      count: counter,
    })
    setCounter(model.count)

    let tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    })
    console.log(tabs)
    await sendMessage(
      'content',
      {
        title: 'Hello from popup!',
      },
      `content-script@${tabs[0].id}`,
    )

    // setCount(count => count + 1)
  }*/

  const onTestServer = async () => {
    const data = form.getValues()
    try {
      const res = await fetch(`${data.server}/v1/test`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await res.json()
      if (json.status === 'ok') {
        toast.success('Server connection successful.')

        const data = form.getValues()
        const res = await fetch(`${data.server}/v1/audio/voices`)
        const json = await res.json()
        setVoices(json.voices)

        await updateFormValues()
      } else {
        toast.error('Server connection failed.')
      }
    } catch {
      toast.error('Server connection failed.')
    }
  }

  const onSubmit = async (data: Schema) => {
    await storage.setItem<Schema>(storageName, data)
    toast.success('Configuration has been saved.')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ScrollArea className="h-full w-full px-4 py-4">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name={formFields.server}
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col justify-between gap-2">
                    <FormLabel>Server</FormLabel>
                    <div className="flex w-full max-w-sm items-center gap-2">
                      <FormControl>
                        <Input placeholder="ex: http://localhost:8880" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={onTestServer}
                        disabled={form.formState.isSubmitting}
                      >
                        Test Server
                      </Button>
                    </div>
                  </div>
                  <FormDescription className="text-right">The address of the Kokoro server</FormDescription>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={formFields.voice}
              disabled={true}
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col justify-between gap-2">
                    <FormLabel>Voice</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                        disabled={field.disabled}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Voice" />
                        </SelectTrigger>
                        <SelectContent>
                          {voices.map(voice => (
                            <SelectItem key={voice} value={voice}>
                              {voice}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormDescription className="text-right">The voice to use for generation</FormDescription>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={formFields.language}
              disabled={true}
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col justify-between gap-2">
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                        disabled={field.disabled}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Langauge" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Auto">Auto</SelectItem>
                          <SelectItem value="e">Spanish</SelectItem>
                          <SelectItem value="a">English</SelectItem>
                          <SelectItem value="f">French</SelectItem>
                          <SelectItem value="h">Hindi</SelectItem>
                          <SelectItem value="i">Italian</SelectItem>
                          <SelectItem value="p">Portuguese</SelectItem>
                          <SelectItem value="j">Japanese</SelectItem>
                          <SelectItem value="z">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormDescription className="text-right">
                    Optional language code to use for text processing
                  </FormDescription>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={formFields.volume}
              disabled={true}
              render={({ field: { value, onChange, disabled } }) => (
                <FormItem>
                  <div className="flex flex-col justify-between gap-4">
                    <FormLabel>Volume Multiplier</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={100}
                        step={1}
                        value={[value]}
                        defaultValue={[value]}
                        onValueChange={vals => {
                          onChange(vals[0])
                        }}
                        disabled={disabled}
                      />
                    </FormControl>
                  </div>
                  <FormDescription className="text-right">
                    A volume multiplier to multiply the output audio by
                  </FormDescription>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            {/*
              <Accordion type="single" collapsible>
                <AccordionItem value="advanced-options">
                  <AccordionTrigger>Advanced Options</AccordionTrigger>
                  <AccordionContent>
                    <div>asdasd</div>
                    <div>asdasd</div>
                    <div>asdasd</div>
                    <div>asdasd</div>
                    <div>asdasd</div>
                    <div>asdasd</div>
                    <div>asdasd</div>
                    <div>asdasd</div>
                    <div>asdasd</div>
                    <div>asdasd</div>
                    <div>asdasd</div>
                    <div>asdasd</div>
                    <div>asdasd</div>
                    <div>asdasd</div>
                    <div>asdasd</div>
                    <div>asdasd</div>
                    <div>asdasd</div>
                    <div>asdasd</div>
                    <div>asdasd</div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              */}
          </div>
        </ScrollArea>

        <div className="flex items-center justify-end gap-2 border-t-2 p-2">
          <Button type="submit" size="sm" disabled={form.formState.isSubmitting}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SettingsForm
