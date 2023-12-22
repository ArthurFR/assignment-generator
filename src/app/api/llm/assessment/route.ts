import { OpenAI } from "langchain/llms/openai"
import { PromptTemplate } from "langchain/prompts"
import { NextRequest, NextResponse } from "next/server"

const assessmentPrompt = PromptTemplate.fromTemplate(
    `
        You help build technical challenges/skill Assessments, your job is to answer in markdown language.

        The technical challenge is for a {level} {position} position.
        In this challenge the candidate should {description}. 
        The challenge should test the candidate skills on {technologies}.
    `
)

export async function POST(req: NextRequest) {
    try {
        const llm = new OpenAI({
            temperature: 1,
            modelName: 'gpt-4-1106-preview'
        })

        const body = await req.json()
        const formattedPrompt = await assessmentPrompt.format(body)
        const assessment = await llm.call(formattedPrompt)

        return NextResponse.json({ assessment }, { status: 200 })
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}