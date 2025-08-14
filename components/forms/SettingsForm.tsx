import { useState } from 'react'
import { storage } from '#imports'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.tsx'
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
import { Switch } from '@/components/ui/switch.tsx'

const formSchema = z.object({
  server: z.url().min(1),
  voice: z.string().min(1),
  lang_code: z.string().min(1),
  volume_multiplier: z.number().min(1).max(10),
  speed: z.number().min(0.25).max(4),
  normalization_options_normalize: z.boolean(),
  normalization_options_unit_normalization: z.boolean(),
  normalization_options_url_normalization: z.boolean(),
  normalization_options_email_normalization: z.boolean(),
  normalization_options_optional_pluralization_normalization: z.boolean(),
  normalization_options_phone_normalization: z.boolean(),
  normalization_options_replace_remaining_symbols: z.boolean(),
})
type Schema = z.infer<typeof formSchema>
const formFields = formSchema.keyof().enum

const storageName = 'local:data'

const removeTrailingSlash = (url: string): string => (url.endsWith('/') ? url.slice(0, -1) : url)

const SettingsForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      server: '',
      voice: 'af_heart',
      lang_code: 'Auto',
      volume_multiplier: 1,
      speed: 1,
      normalization_options_normalize: true,
      normalization_options_unit_normalization: false,
      normalization_options_url_normalization: true,
      normalization_options_email_normalization: true,
      normalization_options_optional_pluralization_normalization: true,
      normalization_options_phone_normalization: true,
      normalization_options_replace_remaining_symbols: true,
    },
  })

  const [voices, setVoices] = useState<string[]>([])
  const [enableForm, setEnableForm] = useState<boolean>(false)

  const updateFormValues = () =>
    storage.getItem<Schema>(storageName).then(value => {
      if (!value) return

      // TODO: Fix this
      /*for (let key in formFields) {
        form.setValue(key as keyof Schema, value[key as keyof Schema])
      }*/
    })

  const onTestServer = async () => {
    const data = form.getValues()
    const server = removeTrailingSlash(data.server)
    form.setValue(formFields.server, server)

    try {
      const res = await fetch(`${server}/v1/test`, {
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

        setEnableForm(true)
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        {/* TODO: Fix this horrible height hack */}
        <ScrollArea className="h-93 px-4">
          <div className="my-4 flex flex-col gap-4">
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
              disabled={!enableForm}
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
              name={formFields.lang_code}
              disabled={!enableForm}
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

            <Accordion type="single" collapsible>
              <AccordionItem value="advanced-options">
                <AccordionTrigger className="text-sidebar-foreground cursor-pointer">Advanced Options</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 py-4">
                  <FormField
                    control={form.control}
                    name={formFields.volume_multiplier}
                    disabled={!enableForm}
                    render={({ field: { value, onChange, disabled } }) => (
                      <FormItem>
                        <div className="flex flex-col justify-between gap-4">
                          <FormLabel className="flex justify-between">
                            <div>Volume Multiplier</div>
                            <div>{value}</div>
                          </FormLabel>
                          <FormControl>
                            <Slider
                              min={1}
                              max={10}
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
                        <FormDescription className="text-right">A volume multiplier</FormDescription>
                        <FormMessage className="text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={formFields.speed}
                    disabled={!enableForm}
                    render={({ field: { value, onChange, disabled } }) => (
                      <FormItem>
                        <div className="flex flex-col justify-between gap-4">
                          <FormLabel className="flex justify-between">
                            <div>Playback Speed</div>
                            <div>{value}</div>
                          </FormLabel>
                          <FormControl>
                            <Slider
                              min={0.25}
                              max={4}
                              step={0.25}
                              value={[value]}
                              defaultValue={[value]}
                              onValueChange={vals => {
                                onChange(vals[0])
                              }}
                              disabled={disabled}
                            />
                          </FormControl>
                        </div>
                        <FormDescription className="text-right">The speed of the generated audio</FormDescription>
                        <FormMessage className="text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={formFields.normalization_options_normalize}
                    disabled={!enableForm}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-row justify-between gap-2">
                          <FormLabel>Normalize</FormLabel>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} disabled={field.disabled} />
                          </FormControl>
                        </div>
                        <FormDescription className="text-right">
                          Normalizes text to make it easier to pronounce
                        </FormDescription>
                        <FormMessage className="text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={formFields.normalization_options_unit_normalization}
                    disabled={!enableForm}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-row justify-between gap-2">
                          <FormLabel>Unit Normalization</FormLabel>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} disabled={field.disabled} />
                          </FormControl>
                        </div>
                        <FormDescription className="text-right">
                          Transforms units like 10KB to 10 kilobytes
                        </FormDescription>
                        <FormMessage className="text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={formFields.normalization_options_url_normalization}
                    disabled={!enableForm}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-row justify-between gap-2">
                          <FormLabel>Url Normalization</FormLabel>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} disabled={field.disabled} />
                          </FormControl>
                        </div>
                        <FormDescription className="text-right">Changes urls so they can be pronounced</FormDescription>
                        <FormMessage className="text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={formFields.normalization_options_email_normalization}
                    disabled={!enableForm}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-row justify-between gap-2">
                          <FormLabel>Email Normalization</FormLabel>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} disabled={field.disabled} />
                          </FormControl>
                        </div>
                        <FormDescription className="text-right">
                          Changes emails so they can be pronounced
                        </FormDescription>
                        <FormMessage className="text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={formFields.normalization_options_phone_normalization}
                    disabled={!enableForm}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-row justify-between gap-2">
                          <FormLabel>Phone Normalization</FormLabel>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} disabled={field.disabled} />
                          </FormControl>
                        </div>
                        <FormDescription className="text-right">
                          Changes phone numbers so they can be pronounced
                        </FormDescription>
                        <FormMessage className="text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={formFields.normalization_options_replace_remaining_symbols}
                    disabled={!enableForm}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-row justify-between gap-2">
                          <FormLabel>Replace Remaining Symbols</FormLabel>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} disabled={field.disabled} />
                          </FormControl>
                        </div>
                        <FormDescription className="text-right">
                          Replaces the remaining symbols with their words
                        </FormDescription>
                        <FormMessage className="text-destructive" />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>

        <div className="flex items-center justify-end gap-2 border-t-2 p-2">
          <Button type="submit" size="sm" disabled={form.formState.isSubmitting} className="cursor-pointer">
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SettingsForm
