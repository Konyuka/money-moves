import Router from "next/router"
import { useState, useEffect  } from "react";
import { GetStaticProps } from "next"
import { useSession } from "next-auth/react"
import React from "react"
import Layout from "../components/Layout";
import Link from 'next/link'



export default function Transactions(){
    const { data: session, status } = useSession()

    if (status === "loading") {
      return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
      return <p>Access Denied! Please <span className="font-bold text-green-600"> <Link href="/"><a>Login </a></Link> </span> </p>
    }

    return (
  
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between pb-4">
          <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
          <span className="font-normal">USD: <span className="text-indigo-600 font-bold">1000.00</span> </span>
          <span className="font-normal">EUR: <span className="text-indigo-600 font-bold">0.00</span> </span>
          <span className="font-normal">NGN: <span className="text-indigo-600 font-bold">0.00</span> </span> 
          <button onClick={() => Router.push("/new")} type="button" className="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            New Transaction
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            From
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            To
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Value
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Currency
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            CreatedAT
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            UpdatedAt
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            1
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Jane Cooper
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Michael Saiba
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            1000USD
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            USD
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Regional Paradigm Technician
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            jane.cooper@example.com
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Layout>

    )

}
