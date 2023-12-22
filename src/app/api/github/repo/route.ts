import { NextResponse } from "next/server"
import { auth } from "auth" 

export async function POST() {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

    const body = JSON.stringify({
        name: `assessments-${session.user?.name}`
    })

    try {
        const res = await fetch(`https://api.github.com/user/repos`, { method:'POST', headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": 'application/json',
        }, body})

        const response = await res.json()
        return NextResponse.json({ response }, { status: 200 })
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
