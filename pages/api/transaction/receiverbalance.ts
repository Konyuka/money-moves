import { getSession } from "next-auth/react"
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
        const session = await getSession({ req });
        const { 
          receiverId,
          targetCurrency,
          toReceive
        } = req.body;
        const balance = await prisma.user.findUnique({
          where: {
            id: parseInt(receiverId),
          },
          select: {
            [targetCurrency]: true,
          },
        })
        
        const newBalance = balance[targetCurrency] + toReceive
        console.log(newBalance)
        const result = await prisma.user.update({
        where: {
          id: parseInt(receiverId),
        },
        data: {
          [targetCurrency]: newBalance,
        },
      }) 
      res.json(result);
}