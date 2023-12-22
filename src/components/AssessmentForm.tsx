import clsx from "clsx";
import { FormEvent } from "react"

export interface AssessmentFormData {
    title: string,
    level: string,
    position: string,
    description: string,
    technologies: string
}

interface Props {
    onSubmit: (data: AssessmentFormData) => void
}

export default function AssessmentForm({ onSubmit }: Props) {
    const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const {
            title,
            level,
            position,
            description,
            technologies
        } = Object.fromEntries(new FormData(event.currentTarget))

        onSubmit({
            title,
            level,
            position,
            description,
            technologies
        } as AssessmentFormData)
    }

    const labelStyle = 'flex flex-col mt-3'
    const formFieldStyle = 'border border-slate-500 rounded-lg p-1 px-3 bg-zinc-700 text-base'
    const buttonStyle = 'rounded-lg py-2 px-3 bg-blue-800 mt-4 hover:bg-blue-900'

    return (
        <form onSubmit={onFormSubmit} className="flex flex-col w-full">
            <h2 className="self-center text-lg font-bold">Create skill assessment</h2>
            <label className={labelStyle}>
                Assessment title*
                <input type="text" name="title" required className={formFieldStyle} />
            </label>

            <label className={labelStyle}>
                Position
                <select name="position" required className={formFieldStyle}>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                </select>
            </label>

            <label className={labelStyle}>
                Level
                <select name="level" required className={formFieldStyle}>
                    <option value="Junior">Junior</option>
                    <option value="Midlevel">Midlevel</option>
                    <option value="Senior">Senior</option>
                    <option value="Specialist">Specialist</option>
                </select>
            </label>

            <label className={labelStyle}>
                Technologies*
                <input type="text" name="technologies" required className={formFieldStyle} />
            </label>

            <label className={labelStyle}>
                Challenge description*
                <textarea name="description" required className={clsx(formFieldStyle, 'resize-none')} rows={5}/>
            </label>

            <button type="submit" className={buttonStyle}>Submit</button>
        </form>
    )
}
