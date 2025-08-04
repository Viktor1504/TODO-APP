import { z } from 'zod/v4'

export const loginSchema = z.object({
  email: z.email({ message: 'Некорректный адрес электронной почты!' }),
  password: z
    .string()
    .min(1, { message: 'Пароль обязателен для заполнения!' })
    .min(3, { message: 'Пароль должен содержать минимум 3 символа!' }),
  rememberMe: z.boolean().optional(),
  captcha: z.string().optional(),
})

export type LoginInputs = z.infer<typeof loginSchema>
