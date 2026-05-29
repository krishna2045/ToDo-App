import React from 'react'

export default function TodoList({ todos, onDelete, onEdit }) {
    if (!todos || todos.length === 0) return <div className="empty">No todos yet</div>

    return (
        <div className="todo-list">
            {todos.map(t => (
                <div key={t.id} className="todo-row">
                    <div className="todo-main">
                        <div className="todo-title">{t.title}</div>
                        <div className="todo-desc">{t.description}</div>
                        <div className="todo-meta">{t.priority} {t.due && `• ${t.due}`}</div>
                    </div>
                    <div className="todo-actions">
                        <button className="btn secondary" onClick={() => onEdit(t)}>Edit</button>
                        <button className="btn danger" onClick={() => onDelete(t.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
