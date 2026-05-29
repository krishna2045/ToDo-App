import React, { useState } from 'react'

export default function TodoEditor({ todo, onSave, onCancel }) {
    const [title, setTitle] = useState(todo.title)
    const [description, setDescription] = useState(todo.description)
    const [priority, setPriority] = useState(todo.priority || 'Normal')
    const [due, setDue] = useState(todo.due || '')

    function save() {
        onSave({ ...todo, title, description, priority, due })
    }

    return (
        <div className="editor-card">
            <div className="field-grid">
                <label>Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)} />

                <label>Description</label><br></br>
                <textarea value={description} onChange={e => setDescription(e.target.value)} />

                <label>Priority</label>
                <select value={priority} onChange={e => setPriority(e.target.value)}>
                    <option>Low</option>
                    <option>Normal</option>
                    <option>High</option>
                </select>

                <label>Due date</label>
                <input type="date" value={due} onChange={e => setDue(e.target.value)} />
            </div>

            <div className="actions editor-actions">
                <button className="btn muted" onClick={onCancel}>Cancel</button>
                <button className="btn success" onClick={save}>Save changes</button>
            </div>
        </div>
    )
}
