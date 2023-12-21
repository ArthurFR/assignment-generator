import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
export const { handlers: { GET, POST }, auth, signIn } = NextAuth({
    providers: [
        GitHub({
            authorization: { params: { scope: "read:user user:email public_repo"}},
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
              token.accessToken = account.access_token
            }
            console.log('jwt', account)
            return token
        },
        async session({ session, token, user }) {
          // Send properties to the client, like an access_token from a provider.
          console.log('sessions', session)
          session.accessToken = token.accessToken
          return session
        }
    }
})
