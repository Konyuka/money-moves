import { getSession } from "next-auth/react"
import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { 
    senderId,
    receiverId,
    sourceCurrency,
    targetCurrency,
    amount,
    rate,
    toReceive
   } = req.body;

  const session = await getSession({ req });
  const result = await prisma.transaction.create({
    data: {
      sender: { connect: { id: senderId } },
      receiver: {connect: { id: parseInt(receiverId)}}, 
      sendCurrency:sourceCurrency,
      receiveCurrency: targetCurrency,
      rate: rate,
      amount: amount,
      toReceive: toReceive
    },
  });
  res.json(result);
}