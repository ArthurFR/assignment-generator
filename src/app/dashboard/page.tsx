import { auth } from "auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Dasboard() {
    const session = await auth()
    if (!session) redirect('/')

    const res = await fetch('https://api.github.com/user/repos', { method:'GET', headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${session.accessToken}`
    }})
    const userRepos = await res.json()

    return (
        <main>
            <h1>Dashboard</h1>
            <Link href="/assessment">
                <button>Create Assessment</button>
            </Link>
        </main>
    )
}
