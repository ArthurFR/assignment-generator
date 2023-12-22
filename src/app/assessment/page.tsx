'use client'
import AssessmentForm, { AssessmentFormData } from "@/components/AssessmentForm"
import { useState } from "react"

export default function Assessment() {
    const [assessmentMarkdown, setAssessmentMarkdown] = useState('')
    const [isGettingAssessment, setIsGettingAssessment] = useState(false)

    const getAssessment = async (assessmentFormData: AssessmentFormData) => {
        setIsGettingAssessment(true)
        const body = JSON.stringify(assessmentFormData)
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
        } catch (e: any) {
            throw(e)
        }
    }

    const saveAssessment = async () => {

    }

    const buttonStyle = 'rounded-lg py-2 px-3 bg-blue-800 mt-4 hover:bg-blue-900'

    return (
        <main>
            <div className="w-full flex h-screen justify-center items-center">
                {!isGettingAssessment && !assessmentMarkdown &&
                    <div className="w-full max-w-md p-4 bg-zinc-800 rounded-lg h-fit">
                        <AssessmentForm onSubmit={getAssessment} />
                    </div>
                }

                {isGettingAssessment && !assessmentMarkdown && <span>Creating assessment...</span>}

                {assessmentMarkdown && (
                    <div className="w-5/6 h-full p-8 ">

                        <pre className="overflow-auto h-5/6 bg-zinc-800 rounded h-full">{assessmentMarkdown}</pre>
                        <div className="flex mt-4 justify-between">
                            <button className={buttonStyle} onClick={() => {
                                setAssessmentMarkdown('')
                            }}>Cancel</button>
                            <button className={buttonStyle} onClick={saveAssessment}>Save on Github</button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}
