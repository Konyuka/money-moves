import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {
                const user = {
                    /* add function to get user */
                }
                return user
            },
            credentials: {
                domain: {
                    label: "Domain",
                    type: "text ",
                    placeholder: "CORPNET",
                    value: "CORPNET",
                },
                username: { label: "Username", type: "text ", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            // credentials: {
            //     username: { label: "Username", type: "text", placeholder: "jsmith" },
            //     password: { label: "Password", type: "password" }
            // },
            
            // async authorize(credentials, req) {
            //     const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

            //     if (user) {
            //         // Any object returned will be saved in `user` property of the JWT
            //         return user
            //     } else {
            //         // If you return null or false then the credentials will be rejected
            //         return null
            //         // You can also Reject this callback with an Error or with a URL:
            //         // throw new Error('error message') // Redirect to error page
            //         // throw '/path/to/redirect'        // Redirect to a URL
            //     }
            // }
        })
    ]
}

export default NextAuth(authOptions)
