import { z } from 'zod'

// validate data from sign up.
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
// Validates login info
export const LoginFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string({message: "Password must be characters only"})
})

// collects error messages from login/signup validation
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
  
  //TODO: what goes in the payload?
  //SessionPayload for auth
  export type SessionPayload = {
    userId: 'id',
    role: 'role',
    token: 'token'    
  }

  // stores results from API calls. 
  export type ApiResult<T> = {
    success: true
    data: T
  } | {
    success: false
    error: string
  }

  // What data is returned from backend? 
  export type UserAuthResponse = {
    token: string //JWT 
    user: {
      id: string
      name: string
      email: string
      role?: string
    }
  }