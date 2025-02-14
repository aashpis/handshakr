'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

``
export default function LoginForm() {
  const router = useRouter();
  const testUsername = "foo"
  const testPassword = "bar"
  // const [username, setUserName] = React.useState('')
  // const [password, setPassword] = React.useState('')
  const [validLogin, setValidLogin] = React.useState(true)

  const handleSumbit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get("username")
    const password = formData.get("password")

    const loginInfo = {
      username,
      password
    }
    console.log(loginInfo)
    if (username === testUsername && password === testPassword) {
      router.push('/dashboard');
    } else {
      setValidLogin(prev => !prev)
    }

  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="w-full max-w-xs">
        <div className='relative'>
          <h1 className="absolute text-md font-bold text-gray-700 bottom-0 left-1/2 -translate-x-1/2 ">
            HandShakr</h1>
          <Image
            src="/handshake.jpg"
            width={1250}
            height={625}
            alt="handshake"
            className="w-full"
          />
        </div>
        <form className="bg-white px-8 pt-6 pb-8 mb-4" onSubmit={handleSumbit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="password"
              required
              minLength={1} //TODO: update this for proper password
            />
          </div>
          {!validLogin && (
            <p className='text-red-500 mb-4'>Login not valid!</p>
          )}
          <div className="flex items-center justify-between">
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="google.com"
            >
              Forgot Password?
            </Link>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};
