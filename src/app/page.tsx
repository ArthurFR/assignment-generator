import { auth, signIn } from "./auth"
export default async function Home() {
  const session = await auth()
  console.log(session)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {session && <span>logado</span>}

        {!session && <form action={async () => {
          "use server"
          await signIn("github")
        }}>
          <button>Login</button>
        </form>}
      </div>
    </main>
  )
}
