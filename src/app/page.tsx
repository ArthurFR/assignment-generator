import { redirect } from "next/navigation"
import { auth, signIn } from "auth"
import Button from "@/components/Button"
import H1 from "@/components/typography/H1"

export default async function Home() {
  const session = await auth()
  if (session) redirect('/dashboard')
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="rounded-lg bg-zinc-800 w-fit p-6 max-w-xl flex flex-col">
        <H1>Welcome to the skill assessment creator!</H1>
        <span className="mt-4">With the help of AI you will be able to create technical challenges for your open positions.</span>

        <form className="mt-4 w-full" action={async () => {
          "use server"
          await signIn("github")
        }}>
          <Button className="w-full">Sign in with GitHub</Button>
        </form>
      </div>
    </main>
  )
}
