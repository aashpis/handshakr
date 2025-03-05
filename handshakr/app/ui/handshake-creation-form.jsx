'use client'
 
import { createHandshake, connectAgreer } from '../lib/dal'
import { useActionState } from 'react'
 
export default function HandshakeCreationForm() {
  const [state, action, pending] = useActionState(createHandshake, undefined)
 
  return (
    <form action={action}>
      
      {/* add title */}
      <div className="mb-4">
        <label 
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="name">
          Handshake Name
        </label>
        <input 
        
        id="name" 
        name="name" 
        placeholder="My Handshake..." />
      </div>
      {state?.errors?.name && <p>{state.errors.name}</p>}
 
      {/* add compensation */}
      <div className="mb-4">
        <label 
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="compensation">Compensation</label>
        <input 
        id="compensation" 
        name="compensation" 
        placeholder="compensation" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
     
      {/* add terms of handshake */}
      <div className="mb-4">
        <label 
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="terms">Terms</label>
        <input 
        type="textarea" 
        id="terms" 
        name="terms" 
        placeholder="the terms of this handshake..." />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      {/* add date of handshake */}
      <div className="mb-4">
        <label 
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="date">Date of Execution</label>
        <input 
        
        type="date" 
        id="date" 
        name="date" 
        placeholder="compensation" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      {/* add agreerer to handshake
          TODO: how to connect agreerer? User Id
      */}
      <button 
      className="bg-blue-500 hover:bg-blue-700 text-white p-1  rounded focus:outline-none focus:shadow-outline"
      type="button" 
      onClick={ connectAgreer }>
        Add Agreerer to Shake
      </button>
      <div className="m-2">
        <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={pending} 
        type="submit">
          Create Handshake
        </button>
      </div>
    </form>
  )
}