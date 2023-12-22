'use client'

import { useRouter } from "next/navigation"
import Button from "./Button"

export default function CreateGitHubRepo() {
    const router = useRouter()

    const createRepo = async () => {
        const res = await fetch('api/github/repo', {
            method: 'POST',
        })

        if (res.status === 200) router.refresh()
    }

    return (
        <div className="flex flex-col">
            <span>You dont have a GitHub repository to save the assessments.</span>
            <Button onClick={createRepo}>Click here to create repo</Button>
        </div>
    )
}