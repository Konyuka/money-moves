import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials"
import prisma from "../../../lib/prisma";
import { hash } from 'bcryptjs';
// let userAccount = null;

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      // credentials: {
      //   username: {
      //     label: "Email",
      //     type: "text",
      //     placeholder: "johndoe@test.com",
      //   },
      //   password: { label: "Password", type: "password" },
      // },
      async authorize(credentials) {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                        password: credentials.password
                    }
                })
                
                if (user !== null)
                {
                    // userAccount = user;
                    return user;
                }
                else {
                    return null;
                }
      }
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
  pages: {
    signIn: "auth/sigin",
  },
});
