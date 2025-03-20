/**
 * Contains all custom defined types 
 * 
 */


import { z } from 'zod'

// API endpoints
export const API = {
  BASE: 'http://localhost:8080/',
  REGISTER: '/handshakr/auth/register',
  LOGIN: '/handshakr/auth/login', 
  SIGNOUT: '/handshakr/auth/signout',
  CHECK_EMAIL: '/handshakr/auth/check-email-for-account',
  USER_PROFILE: '/handshakr/auth/user-profile',
  HANDSHAKE: {
    CREATE: '/handshakr/auth/create-handshake',
    DELETE: '/handshakr/auth/delte-handshake',
    ACTIVE: '/handshakr/auth/active-handshake',
    HISTORY: '/handshakr/auth/history-handshake',
    PENDING: '/handshakr/auth/pending-handshake',
  },
  REFRESH_TOKEN: '/handshakr/auth/refresh-token',
  JWT_TOKEN: '/handshakr/auth/jwt-token',
  CSRF_TOKEN: '/handshakr/auth/csrf_token',
}

/**********  SCHEMA DEFINTIONS  *******************
 * Schema are zod objects that validates user input into forms
 * Schema only validate inputs based on specifications and does NOT authenticate data 
*/

// validate user registration-form input 
// returns error messages to be displayed in form
export const UserRegisterFormSchema = z.object({
  username: z
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

// validate login-form input 
// returns error messages to be displayed in form
export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  password: z.string({ message: "Password is required" })
})

// validate handshake-creation-form input
// returns error messages to be displayed in form
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

/********** TYPE DEFINTIONS  *******************
* custom type defintions  
*/

// collects error messages to be displayed
// if no errors messages, it is set as undefined 
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
// TODO: define contents of payload 
export type SessionPayload = {
  userId: string
  token: string
  expiresAt: string
  [key: string]: any // For any additional claims
}

//payload for login auth
export type LoginPayload = {
  username: string
  password: string
}

//payload for register auth
export type RegisterPayload ={
  username: string
  password: string
  email: string
}

// stores results from API calls. 
export type ApiResult<T> = {
  success: true
  data: T
} | {
  success: false
  error: string
}

// Contains User Authentication Response data
// TODO: define data is returned from backend auth endpoints
export type UserAuthResponse = {
  token: string // JWT 
  user: {
    id: string
    name: string
    email: string
    role?: string
  }
}

