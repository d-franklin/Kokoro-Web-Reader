import { z } from 'zod'

export const formSchema = z.object({
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
export type Schema = z.infer<typeof formSchema>
export const formFields = formSchema.keyof().enum
