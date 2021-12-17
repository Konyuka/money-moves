import React from "react";
import Router from "next/router"
import { GetServerSideProps } from "next"
import { useSession, getSession } from "next-auth/react"
import prisma from "../lib/prisma";


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return;
  }
  const userData = await prisma.user.findMany({
    // where: {
    //   id: { id: session.id},
    // }
    select: {
      id: true,
      name: true,
      USD: true, 
      EUR: true,
      NGN: true
    }
  })
  const users =  JSON.parse(JSON.stringify(userData))

  return {
    props: { users, userData },
  };
};

const Header: React.FC = (props) => {
  const { data: session, status } = useSession()
  // console.log(session.id)
  console.log(props.users)
  console.log(props.userData)


  // const user = props.users.filter(obj => obj.id === session.id );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between pb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
        {/* <span className="font-normal">USD: <span className="text-indigo-600 font-bold">{user[0].USD}</span> </span>
        <span className="font-normal">EUR: <span className="text-indigo-600 font-bold">{user[0].EUR}</span> </span>
        <span className="font-normal">NGN: <span className="text-indigo-600 font-bold">{user[0].NGN}</span> </span>  */}
        <button onClick={() => Router.push("/new")} type="button" className="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          New Transaction
        </button>
      </div>
  );
};

export default Header;
