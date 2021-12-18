import Router from "next/router"
import { useState, useEffect  } from "react";
import { GetServerSideProps  } from "next"
import { useSession, getSession } from "next-auth/react"
import React from "react"
import Layout from "../components/Layout";
import prisma from '../lib/prisma';


import Link from 'next/link'


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: {} };
  }

  const data = await prisma.transaction.findMany({
  });
  const transactions =  JSON.parse(JSON.stringify(data))
  const userTransactions = transactions.filter(obj => obj.senderId === session.id );

  const userData = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      USD: true, 
      EUR: true,
      NGN: true
    },
  });
  const users =  JSON.parse(JSON.stringify(userData))
  

  return { props: { userTransactions, users } };
};


export default function Transactions(props: { userTransactions, users }){
    const { data: session, status } = useSession()
    if (status === "loading") {
      return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
      return <p>Access Denied! Please <span className="font-bold text-green-600"> <Link href="/"><a>Login </a></Link> </span> </p>
    }

    // const userTransactions = props.userTransactions.filter(obj => obj.senderId === session.id );
    const user = props.users.filter(obj => obj.id === session.id );
    
    console.log(props.userTransactions)


    return (
  
      <Layout>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between pb-4">
          <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
          <span className="font-normal">USD: <span className="text-indigo-600 font-bold">{user[0].USD}</span> </span>
          <span className="font-normal">EUR: <span className="text-indigo-600 font-bold">{user[0].EUR}</span> </span>
          <span className="font-normal">NGN: <span className="text-indigo-600 font-bold">{user[0].NGN}</span> </span> 
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
                            Send Currency
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Receive Currency
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Received Funds
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            UpdatedAt
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {
                          props.userTransactions.map((transaction)=>(
                            <tr key={transaction.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {transaction.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {transaction.senderId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {transaction.receiverId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {transaction.amount}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {transaction.sendCurrency}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {transaction.receiveCurrency}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {transaction.toReceive}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {transaction.createdAt}
                              </td>
                            </tr>
                          ))
                        }
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
