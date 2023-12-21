import NextAuth, { Session } from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers: { GET, POST }, auth, signIn } = NextAuth({
    providers: [
        GitHub({
            authorization: { params: { scope: "read:user user:email public_repo"}},
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
              token.accessToken = account.access_token
            }
            console.log('jwt', account)
            return token
        },
        async session({ session, token }) {
          session.accessToken = token.accessToken
          return session as Session
        }
    }
})
