'use client'
import AssessmentForm, { AssessmentFormData } from "@/components/AssessmentForm"
import Button from "@/components/Button"
import H1 from "@/components/typography/H1"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Assessment() {
    const [assessmentMarkdown, setAssessmentMarkdown] = useState('')
    const [assessmentName, setAssessmentName] = useState('')
    const [isGettingAssessment, setIsGettingAssessment] = useState(false)
    const router = useRouter()

    const getAssessment = async (assessmentFormData: AssessmentFormData) => {
        setIsGettingAssessment(true)
        const body = JSON.stringify(assessmentFormData)
        const assessmentTitle = `${assessmentFormData.level}-${assessmentFormData.position}-${assessmentFormData.title.replaceAll(' ', '-')}`
        try {

            const response = await fetch('api/llm/assessment', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body
            })
    
            const { assessment } = await response.json()
            setIsGettingAssessment(false)
            setAssessmentMarkdown(assessment)
            setAssessmentName(assessmentTitle.toLowerCase())
        } catch (e: any) {
            throw(e)
        }
    }

    const saveAssessment = async () => {
        const body = JSON.stringify({ assessment: assessmentMarkdown, name: assessmentName })
        try {
            await fetch('api/github/assessment', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body
            })
    
            router.push('/dashboard')
        } catch (e: any) {
            throw(e)
        }
    }

    return (
        <main className="w-full h-[calc(100vh-56px)] px-12 pt-8">
            <H1>Assessment</H1>

            <div className="w-full flex h-5/6 justify-center mt-8">
                {!isGettingAssessment && !assessmentMarkdown &&
                    <div className="w-full max-w-md p-4 bg-zinc-800 rounded-lg h-fit">
                        <AssessmentForm onSubmit={getAssessment} />
                    </div>
                }

                {isGettingAssessment && !assessmentMarkdown && <span>Creating assessment...</span>}

                {assessmentMarkdown && (
                    <div className="w-5/6 h-full">

                        <pre className="overflow-auto h-2/3 bg-zinc-800 rounded p-4">{assessmentMarkdown}</pre>
                        <div className="flex mt-4 justify-between">
                            <Button onClick={() => {
                                setAssessmentMarkdown('')
                            }}>Cancel</Button>
                            <Button onClick={saveAssessment}>Save on Github</Button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}
