import { NextRequest, NextResponse } from "next/server"
import { auth } from "auth" 

export async function POST(req: NextRequest) {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

    try {
        const { assessment } = await req.json()

        const res = await fetch('https://api.github.com/user/repos', { method:'GET', headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${session.accessToken}`
        }})
        const userRepos = await res.json()

        return NextResponse.json({ assessment }, { status: 200 })
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
