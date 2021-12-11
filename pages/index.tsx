import React from "react"
import Link from "next/link"
import { useState } from "react";

// const submitData = async (e: React.SyntheticEvent) => {
//     e.preventDefault();
//     try {
//       const body = { title, content };
//       await fetch("https://michael-saiba-head-start.vercel.app/api/post/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });
//       await Router.push("/drafts");
//     } catch (error) {
//       console.error(error);
//     }
// };

const submitData = () =>{
  alert('check')
}

export default function Login(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
      
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          

          <div className="mt-8">
            <div>

              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Login Section
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <form onSubmit={submitData} className="space-y-6">
                <div>
                  <label  className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input onChange={(e) => setEmail(e.target.value)} value={email} id="email" name="email" type="email"  required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input onChange={(e) => setPassword(e.target.value)} value={password}  id="password" name="password" type="password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                  </div>

                  <div className="text-sm">
                    <Link href="/register">
                      <a className="font-medium text-indigo-600 hover:text-indigo-500">Register Here</a> 
                    </Link>
                  </div>
                </div>

                <div>
                  <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="" />
      </div>
    </div>

  )

}
