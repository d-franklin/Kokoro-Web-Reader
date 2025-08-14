/*
import { UseControllerProps, useController } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'

type FormValues = {
  placeholder: string
  description: string
  showDescription: boolean
}

const TextInput = (props: UseControllerProps<FormValues>) => {
  const { field, fieldState } = useController(props)

  return (
    <FormField
      {...field}
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between gap-2">
            <FormLabel>Server</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </div>
          {/!*{props.showDescription && <FormDescription>{props.description}</FormDescription>}*!/}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default TextInput
*/
