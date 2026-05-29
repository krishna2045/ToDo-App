import React, { useState } from 'react'

export default function TodoForm({ onCreate }) {
    const [step, setStep] = useState(1)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [priority, setPriority] = useState('Normal')
    const [due, setDue] = useState('')

    function next() { setStep(s => Math.min(4, s + 1)) }
    function prev() { setStep(s => Math.max(1, s - 1)) }

    function submit() {
        const todo = { title, description: desc, priority, due, completed: false }
        onCreate(todo)
        setTitle(''); setDesc(''); setPriority('Normal'); setDue(''); setStep(1)
    }

    return (
        <div className="form">
            <div className="steps">Step {step} / 4</div>

            {step === 1 && (
                <div className="field">
                    <label>Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Todo title" />
                </div>
            )}

            {step === 2 && (
                <div className="field">
                    <label>Description</label>
                    <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Details..." />
                </div>
            )}

            {step === 3 && (
                <div className="field">
                    <label>Priority & Due</label>
                    <select value={priority} onChange={e => setPriority(e.target.value)}>
                        <option>Low</option>
                        <option>Normal</option>
                        <option>High</option>
                    </select>
                    <input type="date" value={due} onChange={e => setDue(e.target.value)} />
                </div>
            )}

            {step === 4 && (
                <div className="field">
                    <label>Confirm</label>
                    <div className="confirm">
                        <strong>{title || '(no title)'}</strong>
                        <p>{desc}</p>
                        <small>{priority} {due && `• due ${due}`}</small>
                    </div>
                </div>
            )}

            <div className="actions">
                {step > 1 && <button onClick={prev} className="btn muted">Back</button>}
                {step < 4 && <button onClick={next} className="btn primary">Next</button>}
                {step === 4 && <button onClick={submit} className="btn success">Create Todo</button>}
            </div>
        </div>
    )
}
