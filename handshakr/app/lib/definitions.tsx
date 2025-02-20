import { z } from 'zod'

// valid data from sign up.
export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})

//TODO: decide if login with username or just email
export const LoginFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string({message: "Password must be characters only"})
})
 
export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
  
  // The payload should contain the minimum, unique user data that'll 
  // be used in subsequent requests, such as the user's ID, role, etc. 
  // It should not contain personally identifiable information like phone number, email address, credit card information, etc, or sensitive data like passwords.

  export type SessionPayload = {
    userID: 'id',
    role: 'role',
    token: 'token'    
  }

  export type ApiResult<T> = {
    success: true
    data: T
  } | {
    success: false
    error: string
  }

  export type AuthResponse = {
    token: string //JWT 
    user: {
      id: string
      name: string
      email: string
      role?: string
    }
  }