import { getSession } from "next-auth/react"
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
        
        const session = await getSession({ req });

        const { 
          newBalance,
          sourceCurrency,
        } = req.body;

        const result = await prisma.user.update({
        where: {
          email: session.user.email,
        },
        data: {
          [sourceCurrency]: newBalance,
        },
      }) 
  res.json(result);
}