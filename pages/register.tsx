import React from "react"
import Router from "next/router"
import { useState } from "react";
import { hash } from 'bcryptjs';

export default function Register(req, res){
    const [name, setName] = useState("Michael Saiba");
    const [email, setEmail] = useState("michaelsaiba84@gmail.com");
    const [password, setPassword] = useState("password");

    const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
        const body = { name, email, password: await hash(password, 12) };
        const checkEmail = await fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if(checkEmail.status == 422){
            alert('Email already exists')
        }else{
            await Router.push("/");
        }
        } catch (error) {
        console.error(error);
        }
    };
 

    return (
        
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Register an account
                </h2>
                </div>
                <form onSubmit={submitData} className="mt-8 space-y-6">
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">

                    <div>
                    <label  className="sr-only">Full Name</label>
                    <input 
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    id="name" name="email" type="text"  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Full Name" />
                    </div>

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
                    id="password" name="password" type="password"  required className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                    </div>

                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    </div>

                    <div className="text-sm">
                    <a onClick={() => Router.push("/")} href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Login here
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
