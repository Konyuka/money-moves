import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useSession, getSession } from "next-auth/react"
import Link from 'next/link'
import { GetServerSideProps  } from "next"
import prisma from '../lib/prisma';
import Router from "next/router"


// export const getStaticProps: GetStaticProps = async () => {
//   const users = await prisma.user.findMany({
//     select: {
//       id: true,
//       name: true,
//     },
//   });
//   return { props: { users} };
// };

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: {} };
  }
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  
  const accountUser = await prisma.user.findUnique({
    where: {
      // email: { email: session.user.email },
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
      USD: true, 
      EUR: true,
      NGN: true
    },
  });


  return {
    props: { accountUser, users },
  };
};

interface Props {
  accountUser,
  users
}

const New: React.FC<Props> = (props: { accountUser, users }) => {
  const { data: session, status } = useSession()

    if (status === "loading") {
      return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
      return <p>Access Denied! Please <span className="font-bold text-green-600"> <Link href="/"><a>Login </a></Link> </span> </p>
    }

    const otherUsers = props.users.filter(obj => obj.id !== session.id);
    const user = session.user.name   
    const senderId = session.id   
    // console.log(session.user)
    
    const [amount, setAmount] = useState(0);
    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrency, setTargetCurrency] = useState("");
    const [receiverId, setReceiverId] = useState(null);
    const [rate, setRate] = useState(0);

    const checkRates = async () =>{
        if(targetCurrency === sourceCurrency){
          const rates = 1
          setRate(rates)
          return;
        }
        const res = await fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=0e8e9aa0-5ea0-11ec-b7f9-853f0cb3f3c3&base_currency=${sourceCurrency}`)
        const data = await res.json()
        const fxs = data.data
        const rates = fxs[`${targetCurrency}`]
        setRate(rates)
    }

    useEffect(() => {
      checkRates();  
    },
    [sourceCurrency, targetCurrency])

    const updateReceiverBalance = async () => {
        const bodyData = { 
          receiverId,
          targetCurrency,
          toReceive:rate*amount 
        };
        await fetch(`${window.location.origin}/api/transaction/receiverbalance/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        });       
    }

    const updateSenderBalance = async () => {
        // console.log(body)
        // console.log(postData.toReceive)
        // console.log(postData.receiverId)
        const initialBalance = props.accountUser[sourceCurrency]
        const newBalance = initialBalance - amount

        const body = { 
          newBalance,
          sourceCurrency,
        };
        await fetch(`${window.location.origin}/api/transaction/senderbalance/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });        
    }

    const submitData = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      
        if(senderId && receiverId && sourceCurrency && targetCurrency && amount && rate){
          
          if(amount>props.accountUser[sourceCurrency]){
            alert('Insufficient Balance!')
            return;
          }else{

            try {
              const body = { 
                senderId,
                receiverId,
                sourceCurrency,
                targetCurrency,
                amount,
                rate,
                toReceive:rate*amount 
              };
              await fetch(`${window.location.origin}/api/transaction/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              });
              alert('done')
              await updateReceiverBalance();
              await updateSenderBalance();
              await Router.push("/transactions");
            } catch (error) {
              console.error(error);
            }
          }
        }else{
          alert('Provide all required data')
        }  
        
    };

  return (
    <Layout>
      
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between">
      <h1 className="text-2xl font-semibold text-gray-900">Transaction Details</h1>
    </div>
    <div className="hidden sm:block" aria-hidden="true">
      <div className="py-5">
        <div className="border-t border-gray-200"></div>
      </div>
    </div>

    <div className="mt-1 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6 p-6">
        <div className="mt-5 md:mt-0 md:col-span-3">
          <form onSubmit={submitData}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">

                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Sender name</label>
                    <input required value={user} disabled type="text" name="first-name" id="first-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Receiver Name</label>
                    <select required onChange={(e) => setReceiverId(e.target.value)} id="country" name="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option selected disabled>Select User</option>
                      {
                        otherUsers.map((user)=>(
                          <option key={user.id} value={user.id}>{user.name}</option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Source Currency</label>
                    <select required onChange={(e) => setSourceCurrency(e.target.value)} id="country" name="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option selected disabled>Select Currency</option>
                      <option value="USD">Dollars</option>
                      <option value="EUR">Euro</option>
                      <option value="NGN">Naira</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Target Currency</label>
                    <select required onChange={(e) => {
                        // checkRates()
                        setTargetCurrency(e.target.value)
                      }} 
                      id="country" name="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option selected disabled>Select Currency</option>
                      <option value="USD">Dollars</option>
                      <option value="EUR">Euro</option>
                      <option value="NGN">Naira</option>
                    </select>
                  </div>

                  <div className="col-span-6 pb-8">
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input required onChange={(e) => setAmount(parseInt(e.target.value))} value={amount} type="number" name="street-address" id="street-address" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Sent in <span className="text-indigo-600">{sourceCurrency}</span></label>
                    <input value={amount} disabled type="text" name="city" id="city" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Exchange Rates</label>
                    <input value={rate} disabled type="text" name="postal-code" id="postal-code"  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Received in <span className="text-indigo-600">{targetCurrency}</span></label>
                    <input value={amount*rate} disabled type="text" name="postal-code" id="postal-code"  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Proceed
                </button>
              </div>
            </div>
          </form>
          {/* <button onClick={updateReceiverBalance} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Update Balance
          </button> */}
        </div>
      </div>
    </div>

    <div className="hidden sm:block" aria-hidden="true">
      <div className="py-5">
        <div className="border-t border-gray-200"></div>
      </div>
    </div>
      
    </Layout>
  );
};

export default New;