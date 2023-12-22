import Button from "@/components/Button"
import CreateGitHubRepo from "@/components/CreateGitHubRepo"
import H1 from "@/components/typography/H1"
import { auth } from "auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Dasboard() {
    const session = await auth()
    if (!session) redirect('/')

    let hasRepo = false
    try {
        const res = await fetch(`https://api.github.com/repos/${session.user?.name}/assessments-${session.user?.name}`, { method:'GET', headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${session.accessToken}`
        }})

        if (res.status === 200) hasRepo = true
    } catch (e) {
        throw(e)
    }

    return (
        <main className="w-full h-[calc(100vh-56px)] px-12 pt-8">
            <H1>Dashboard</H1>

            <div className="w-full flex justify-center">
                {hasRepo ? (
                    <Link href="/assessment">
                        <Button>Create Assessment</Button>
                    </Link>
                ) : (
                    <CreateGitHubRepo />
                )}
            </div>
        </main>
    )
}
