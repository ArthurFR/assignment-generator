import { auth } from "auth"
import { redirect } from "next/navigation"

export default async function Dasboard() {
    const session = await auth()
    if (!session) redirect('/');

    const res = await fetch('https://api.github.com/user/repos', { method:'GET', headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${session.accessToken}`
    }})
    const userRepos = await res.json()

    return (
        <main>
            Dashboard
        </main>
    )
}
