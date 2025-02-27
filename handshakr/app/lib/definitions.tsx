import { z } from 'zod'

// API endpoints
export const API_ENDPOINTS = {
  signup: '/api/signup',
  signin: '/api/signin',
  signout: '/api/signout',
  checkEmail: '/api/check-email-for-account',
  userProfile: '/api/user-profile',
  createHandshake: '/api/create-handshake',
  refreshToken: '/api/refresh-token',
}

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

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string({ message: "Password is required" })
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
  
// SessionPayload for JWT
export type SessionPayload = {
  userId: string
  token: string
  expiresAt: string
  [key: string]: any // For any additional claims
}

// stores results from API calls. 
export type ApiResult<T> = {
  success: true
  data: T
} | {
  success: false
  error: string
}

// What data is returned from backend auth endpoints
export type UserAuthResponse = {
  token: string // JWT 
  user: {
    id: string
    name: string
    email: string
    role?: string
  }
}

export const HandshakeFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters long.' })
    .trim(),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long.' })
    .trim(),
  agreerEmail: z
    .string()
    .email({ message: 'Please enter a valid email.' })
    .trim(),
})