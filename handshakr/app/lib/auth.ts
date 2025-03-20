import { UserRegisterFormSchema, FormState, UserAuthResponse, ApiResult, API, LoginFormSchema } from './definitions'
import { createSession, deleteSession } from './session'
import { redirect } from 'next/navigation'


export async function checkEmailAvailability(email: string): Promise<ApiResult<boolean>> {
  try {
    const response = await fetch(`${API.CHECK_EMAIL}?email=${encodeURIComponent(email)}`, { //may need to update URI comp part
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include" //May not have credentials yet
    });

    if (!response.ok) {
      return { success: false, error: 'Failed to check email availability' };
    }

    const { available } = await response.json();
    return { success: true, data: available };
  } catch (error) {
    return { success: false, error: 'Failed to check email availability' };
  }
}

export async function createUser(data: {
  username: string,
  password: string,
  email: string
}): Promise<ApiResult<UserAuthResponse>> {
  try {
    const response = await fetch(API.REGISTER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include", //TODO: do we have crednetials yet? 
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message || 'Failed to create account' };
    }

    const authResponse = await response.json();
    return { success: true, data: authResponse };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' };
  }
}


// auth user data for login
export async function authLoginData(data: {
  username: string,
  password: string
}): Promise<ApiResult<UserAuthResponse>> {
  try {
    const response = await fetch(API.LOGIN, {
      method: 'POST', // ✅ Fix: Should be POST
      headers: { 'Content-Type': 'application/json' },
      credentials: "include", // stores JWT and CSRF cookies
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message || 'Failed to login' };
    }

    const authResponse = await response.json();
    return { success: true, data: authResponse };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// Main Sign Up function
// Validates User Data
// Checks if Email is available
// Hashes password before storing
// POST data to back end
// Create Session
// redirect to user dashboard
export async function registerUser(state: FormState, formData: FormData) {
  const validatedFields = UserRegisterFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { username, email, password } = validatedFields.data;

  const result = await createUser({ username, email, password });

  if (!result.success) {
    return { message: result.error };
  }

  console.log("User successfully created");

  redirect('/dashboard');
}



export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { username, password } = validatedFields.data;

  const result = await authLoginData({ username, password });

  if (!result.success) {
    return { message: result.error };
  }

  console.log("User successfully logged in"); //FOR TESTING ONLY

  redirect('/dashboard');
}


  

// Signout function
// calls backend to clear Tokens
// deletes local cookies storing tokens
// redirect to login
export async function signout() {
  try {
    await fetch(API.SIGNOUT, {
      method: 'POST',
      credentials: "include" 
    });

    await deleteSession();
    redirect('/login');
  } catch (error) {
    console.error('Signout error:', error);
    await deleteSession();
    redirect('/');
  }
}
