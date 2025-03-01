'use client'
 
import { createHandshake, connectAgreer } from '../lib/dal'
import { useActionState } from 'react'
 
export default function HandshakeCreationForm() {
  const [state, action, pending] = useActionState(createHandshake, undefined)
 
  return (
    <form action={action}>
      
      {/* add title */}
      <div>
        <label htmlFor="name">Handshake Name</label>
        <input id="name" name="name" placeholder="My Handshake..." />
      </div>
      {state?.errors?.name && <p>{state.errors.name}</p>}
 
      {/* add compensation */}
      <div>
        <label htmlFor="compensation">Compensation</label>
        <input id="compensation" name="compensation" placeholder="compensation" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
     
      {/* add terms of handshake */}
      <div>
        <label htmlFor="terms">Terms</label>
        <input type="textarea" id="terms" name="terms" placeholder="the terms of this handshake..." />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      {/* add date of handshake */}
      <div>
        <label htmlFor="date">Date of Execution</label>
        <input type="date" id="date" name="date" placeholder="compensation" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      {/* add agreerer to handshake
          TODO: how to connect agreerer? User Id
      */}
      <button type="button" onClick={ connectAgreer }>Add Agreerer to Shake</button>
      
      <button disabled={pending} type="submit">
        Create Handshake
      </button>
    </form>
  )
}