// Data Access layer 
// Verifies Auth of requests from client isde

import 'server-only'
 
import { cookies } from 'next/headers'
import { decrypt } from './session'
import { cache} from 'react'
import { redirect } from 'next/navigation'
 

// if verified: stores isAuth and userId in cache
// else: redirect to home page
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId) {
    redirect('/')
  }
 
  return { isAuth: true, userId: session.userId } //TODO: decide what needs to be stored in the cache
})

export function getUserData(userId)