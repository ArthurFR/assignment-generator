import { NextRequest, NextResponse } from "next/server"
import { auth } from "auth" 

export async function POST(req: NextRequest) {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

    try {
        const { assessment, name } = await req.json()
        const assessmentName = `${name}-${(new Date()).toISOString().substring(0, 10)}`

        const ref = await fetch(`https://api.github.com/repos/${session.user?.name}/assessments-${session.user?.name}/git/ref/heads/main`,
        {
            method:'GET',
            headers: {
                Accept: 'application/vnd.github+json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.accessToken}`,
            }
        })

        const { object: { sha } }  = await ref.json()

        const createRefBody = {
            ref: `refs/heads/${assessmentName}`,
            sha
        }

        await fetch(`https://api.github.com/repos/${session.user?.name}/assessments-${session.user?.name}/git/refs`,
        {
            method:'POST',
            headers: {
                Accept: 'application/vnd.github+json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.accessToken}`,
            },
            body: JSON.stringify(createRefBody)
        })

        const body = JSON.stringify({
            message: `New assesment created: ${assessmentName}`,
            branch: assessmentName,
            content: btoa(assessment)
        })

        const response = await fetch(`https://api.github.com/repos/${session.user?.name}/assessments-${session.user?.name}/contents/${assessmentName}.md`,
            {
                method:'PUT',
                headers: {
                    Accept: 'application/vnd.github+json',
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessToken}`,
                },
                body
        })

        const res = await response.json()
        
        return NextResponse.json({ res }, { status: 200 })
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
