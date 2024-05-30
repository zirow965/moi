'use client'
import { login } from '@/utils/FirebaseHelper'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function Home() {

  const router = useRouter()
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const validateEmail = () => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailRef.current);

  function handleLogin() {
    if (validateEmail()) {
      login(emailRef.current, passwordRef.current).then(async () => {
        await router.push('/home')
      }).catch(error => {
        if (error.code === 'auth/wrong-password') {
          Swal.fire({
            title: 'Wrong password',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        } else {
          Swal.fire({
            title: 'User not found',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      })
    } else {
      Swal.fire({
        title: 'Enter a valid Email!',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center justify-center p-4 md:p-6">
          <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md border-blue-800 border-2">
            <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
              MOI
            </div>
            <div className="relative mt-10 h-px bg-black">
              <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                <span className="bg-white px-4 text-xs text-black rounded-lg uppercase">Login to your account</span>
              </div>
            </div>
            <div className="mt-10">
              <div className="flex flex-col mb-6">
                <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide font-bold">E-Mail Address:</label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                    </svg>
                  </div>
                  <input id="email" type="email" name="email" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="E-Mail Address" onChange={((e) => emailRef.current = e.target.value)} />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide font-bold">Password:</label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </span>
                  </div>
                  <input id="password" type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password" onChange={((e) => passwordRef.current = e.target.value)} />
                </div>
              </div>
              <div className="flex w-full">
                <button onClick={handleLogin} className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                  <span className="mr-2 uppercase">Login</span>
                  <span>
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
