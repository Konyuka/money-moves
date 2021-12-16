import React from "react"
import Router from "next/router"
import { useState } from "react";
import { useSession, signIn } from "next-auth/react"
import { hash } from 'bcryptjs';

export default function Login(){

    const { data: session } = useSession();
    const [email, setEmail] = useState("michaelsaiba84@gmail.com");
    const [password, setPassword] = useState("password");

    console.log("session", session);

    const login = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        await signIn("credentials", {
            email, password, callbackUrl: `${window.location.origin}/dashboard`, redirect: false }
        ).then(function(result){
            console.log(result)
            if (result.error !== null)
            {
                if (result.status === 401)
                {
                    // setLoginError("Your username/password combination was incorrect. Please try again");
                    alert('Credentials Are Incorrect')
                    console.log(result)
                }
                else
                {
                    // setLoginError(result.error);
                    Router.push("/dashboard");
                }
            }
            else
            {
                Router.push('/');
            }
        });
    }


  return (
    
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div>
            <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
            </h2>
            </div>
            <form onSubmit={login} className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">

                <div>
                <label  className="sr-only">Email address</label>
                <input  
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email-address" name="email" type="email"  required className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                </div>

                <div>
                <label  className="sr-only">Password</label>
                <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password" name="password" type="password"  required className="mt-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                </div>

            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                </div>

                <div className="text-sm">
                <a onClick={() => Router.push("/register")} href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Register here
                </a>
                </div>
            </div>

            <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign in
                </button>
            </div>
            </form>
        </div>
    </div>

  )

}
