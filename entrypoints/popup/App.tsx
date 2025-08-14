import { useState } from 'react'
import { storage } from '#imports'
import { zodResolver } from '@hookform/resolvers/zod'
import { Info, Speech } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { onMessage, sendMessage } from 'webext-bridge/popup'
import { z } from 'zod'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.tsx'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import { ScrollArea } from '@/components/ui/scroll-area.tsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx'
import { Switch } from '@/components/ui/switch.tsx'
import { messageType } from '@/models/messageType.ts'

const formSchema = z.object({
  voice: z.string().min(1),
  language: z.string().min(1),
  server: z.url().min(1),
})
type Schema = z.infer<typeof formSchema>
const formFields = formSchema.keyof().enum

const App = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voice: '',
      language: '',
      server: '',
    },
  })

  const [showHelp, setShowHelp] = useState<boolean>(false)
  const [voices, setVoices] = useState<string[]>([])

  useEffect(() => {
    console.log('Hello popup!')

    onMessage(messageType.popup, async message => {
      console.log('popup', message)
    })

    fetch('http://localhost:8880/v1/audio/voices').then(async res => {
      const json = await res.json()
      console.log('json', json)
      setVoices(json.voices)
    })

    storage.getItem('local:voice').then(value => {
      console.log('local:voice', value)
    })
  }, [])

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

  const onSave = async (data: Schema) => {
    console.log('data', data)
    await storage.setItem(`local:${formFields.voice}`, data.voice)
    await storage.setItem(`local:${formFields.language}`, data.language)
    await storage.setItem(`local:${formFields.server}`, data.server)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)}>
        <div className="w-100 h-120">
          <div className="border-b-2 p-4 font-bold text-green-700 flex items-center justify-between gap-2">
            <Speech />
            <div className="text-sm">Kokoro Web Reader</div>
            <Info className={`cursor-pointer ${showHelp ? 'text-amber-800' : 'text-gray-600'}`} onClick={() => setShowHelp(!showHelp)} />
          </div>

          <ScrollArea className="w-full h-full px-4 py-2">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name={formFields.server}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between gap-2">
                      <FormLabel>Server</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: http://localhost:8880" {...field} />
                      </FormControl>
                    </div>
                    {showHelp && <FormDescription>The address of the Kokoro server</FormDescription>}
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              <div className="flex justify-between gap-2">
                <Label>Voice</Label>
                <Select>
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
              </div>

              <div className="flex justify-between gap-2">
                <Label>Language</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Language" />
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
              </div>

              <div className="flex justify-between gap-2">
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
                <Switch id="airplane-mode" />
              </div>

              <div className="flex justify-between gap-2">
                <Label htmlFor="server">Server</Label>
                <Input id="server" type="text" placeholder="ex: http://localhost:8880" />
              </div>

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
            </div>
          </ScrollArea>

          <div className="p-2 border-t-2 flex items-center justify-end gap-2">
            <div className="text-gray-600">Saved</div>
            <Button type="submit" size="sm" disabled={false}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default App
