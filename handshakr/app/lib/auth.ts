// functions related to user authentication are here

import { SignupFormSchema, FormState } from './definitions'
import { createSession } from './session'

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  
  // TODO: check if an account exists for email
  // show error message if true
  const userAlreadyExist = (email:string) => {
    //if !checkEmailForAccount
      // return false 
  // return true
  }



  //Prepare data for insertion into database
  const { name, email, password } = validatedFields.data
  // Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10)

  // 3. Insert the user into the database or call an Auth Library's API
  
  const requestOptions = {
    method: 'POST',
    headers: { 
        'Content-Type': '',
        'Authorization': 'application/json' // TODO: add authorization
    },
    body: JSON.stringify({ 
      title: 'React POST Request Example' 
    
    })
};



  //place holder code ****
  const data = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning({ id: users.id })

  const user = data[0]

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }
  // **********

  // Current steps:
  // 4. Create user session
  await createSession(user.id)
  // 5. Redirect user
  redirect('/dashboard') //TODO: replace placeholder route
}





export async function signout() { }
