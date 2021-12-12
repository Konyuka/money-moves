import prisma from "../../../lib/prisma";

export default async function Handle(req, res) {
  const { name, email, password } = req.body;

  const user = await prisma.user.findUnique({
  where: {
    email: email,
    },
  })
  if (user) {
        res.status(422).json({ message: 'User already exists' });
        return;
  }

  const result = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  res.json(result);
}