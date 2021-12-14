import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials"
import prisma from "../../../lib/prisma";
import { hash } from 'bcryptjs';
// let userAccount = null;

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                        password: credentials.password
                    }
                })
                
                if (user !== null)
                {
                    userAccount = user;
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

// const options = {
//     cookie: {
//         secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production',
//     },
//     session: {
//         jwt: true,
//         maxAge: 30 * 24 * 60 * 60
//     },
//     providers: [
//         CredentialsProvider({
//             id: 'credentials',
//             name: "Credentials",
//             async authorize(credentials) {
//                 const user = await prisma.user.findFirst({
//                     where: {
//                         // email: 'michaelsaiba84@gmail.com',
//                         email: credentials.email,
//                         password: '$2a$12$PJB7oMAwM0hGNkX/TyiiWubJ/B6dz2vVP3derKAInwue5ZKRbjX/m'
//                         // password: await hash(credentials.password, 12)
//                         // password: credentials.password
//                     }
//                 })
                
//                 if (user !== null)
//                 {
//                     userAccount = user;
//                     return user;
//                 }
//                 else {
//                     return null;
//                 }
//             }
//         })
//     ],
//     pages: {
//       signIn: "/",
//     },
//     callbacks: {
//         async signIn(user, account, profile) {
//             if (typeof user.userId !== typeof undefined)
//             {
//                 if (user.isActive === '1')
//                 {
//                     return user;
//                 }
//                 else
//                 {
//                     return false;
//                 }
//             }
//             else
//             {
//                 return false;
//             }
//         },
//         async session(session, token) {
//             if (userAccount !== null)
//             {
//                 session.user = userAccount;
//             }
//             else if (typeof token.user !== typeof undefined && (typeof session.user === typeof undefined 
//                 || (typeof session.user !== typeof undefined && typeof session.user.userId === typeof undefined)))
//             {
//                 session.user = token.user;
//             }
//             else if (typeof token !== typeof undefined)
//             {
//                 session.token = token;
//             }
//             return session;
//         },
//         async jwt(token, user, account, profile, isNewUser) {
//             if (typeof user !== typeof undefined)
//             {
//                 token.user = user;
//             }
//             return token;
//         }
//     }
// }

// export default (req, res) => NextAuth(req, res, options)
