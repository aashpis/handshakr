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

// get user profile data

import {API_ENDPOINTS, ApiResult,   } from './definitions'

  // check if email is available to use for signup
async function getUserProfile(): Promise<ApiResult<boolean>> {
    try {
      const response = await fetch(API_ENDPOINTS.userProfile, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      if (!response.ok) {
        return {
          success: false,
          error: 'Failed to get user profile data'
        }
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

// edit user profile data
export function editUser(){

}

// show which handshakes have not been completed
export function getPendingHandshakes(){

}


// get encrypted handshake history data
// each handshake must be decrypted by user to view
export function getHandshakeHistory(){

}

// decrypt a past handshake
export function decryptHandshake(){

}

export function createHandshake(){

}

// connect agreerer to new handshake
export function connectAgreer(){

}

export function acceptHandshake(){

}