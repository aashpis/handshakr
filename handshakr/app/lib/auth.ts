// auth.ts
import bcrypt from "bcryptjs"
import { SignupFormSchema, FormState, UserAuthResponse, ApiResult } from './definitions'
import { createSession, deleteSession } from './session'
import { redirect } from 'next/navigation'


// API endpoints
const API_ENDPOINTS = {
  signup: '/api/signup',
  signin: '/api/signin',
  signout: '/api/signout',
  checkEmail: '/api/check-email-for-account'
}



// check if email is available to use for signup
async function checkEmailAvailability(email: string): Promise<ApiResult<boolean>> {
  try {
    const response = await fetch(`${API_ENDPOINTS.checkEmail}?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      return {
        success: false,
        error: 'Failed to check email availability'
      }
    }

    const { available } = await response.json()
    return {
      success: true,
      data: available
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to check email availability'
    }
  }
}
// adds new user data to backend 
// 
async function registerNewUser(data: {
  name: string,
  email: string,
  password: string
}): Promise<ApiResult<UserAuthResponse>> { // type def. in definitions.tsx
  try {
    const response = await fetch(API_ENDPOINTS.signup, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || 'Failed to create account'
      };
    }

    const authResponse = await response.json();
    return {
      success: true,
      data: authResponse
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}

// Main Sign Up function
// Validates User Data
// Checks if Email is available
// Hashes password before storing
// POST data to back end
// Create Session
// redirect to user dashboard
export async function signUp(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, password } = validatedFields.data

  // 2. Check email availability
  const emailCheck = await checkEmailAvailability(email)
  if (!emailCheck.success) {
    return {
      message: emailCheck.error
    }
  }

  if (!emailCheck.data) {
    return {
      errors: {
        email: ['An account with this email already exists']
      }
    }
  }

  // 3. Hash password, 10 rounds of salt
  const hashedPassword = await bcrypt.hash(password, 10)

  // 4. Register new user, get new user data from backend
  const result = await registerNewUser({
    name,
    email,
    password: hashedPassword
  })

  if (!result.success) {
    return {
      message: result.error
    }
  }

  // 5. Create session. Get user id to create a session
  await createSession(result.data.user.id)

  // 6. Redirect to dashboard
  redirect('/dashboard')
}

// Signout function
// TODO: does anything need to be sent to the backend or is deleting the session enough?
export async function signout() {
  try {
    await fetch(API_ENDPOINTS.signout, {
      method: 'POST'
    })
    await deleteSession()
    redirect('/login')
  } catch (error) {
    console.error('Signout error:', error)
    // Still delete the session and redirect even if the API call fails
    await deleteSession()
    redirect('/')
  }
}