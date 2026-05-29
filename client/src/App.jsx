import React, { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import TodoEditor from './TodoEditor'

const API = 'http://localhost:4000/todos'
const pages = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'create', label: 'Create Todo' },
    { key: 'manage', label: 'Manage Todos' },
    { key: 'about', label: 'About App' }
]

export default function App() {
    const [todos, setTodos] = useState([])
    const [editingTodo, setEditingTodo] = useState(null)
    const [page, setPage] = useState('dashboard')

    useEffect(() => {
        fetch(API).then(r => r.json()).then(setTodos).catch(() => setTodos([]))
    }, [])

    function addTodo(todo) {
        fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(todo) })
            .then(r => r.json())
            .then(newTodo => setTodos(t => [newTodo, ...t]))
    }

    function removeTodo(id) {
        fetch(`${API}/${id}`, { method: 'DELETE' }).then(() => setTodos(t => t.filter(x => x.id !== id)))
    }

    function updateTodo(todo) {
        fetch(`${API}/${todo.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        })
            .then(r => r.json())
            .then(updated => setTodos(t => t.map(item => item.id === updated.id ? updated : item)))
            .finally(() => setEditingTodo(null))
    }

    const completedCount = todos.filter(t => t.completed).length
    const pendingCount = todos.length - completedCount

    return (
        <div className="app-root">
            <nav className="navbar">
                <div className="brand">Todo App</div>
                <div className="nav-links">
                    {pages.map(item => (
                        <button
                            key={item.key}
                            className={`tab ${page === item.key ? 'active' : ''}`}
                            onClick={() => {
                                setPage(item.key)
                                setEditingTodo(null)
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </nav>

            <main className="page-content">
                {page === 'dashboard' && (
                    <section className="page-panel">
                        <div className="dashboard-grid">
                            <div className="stat-card">
                                <span className="stat-label">Total Todos</span>
                                <strong>{todos.length}</strong>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Pending</span>
                                <strong>{pendingCount}</strong>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Completed</span>
                                <strong>{completedCount}</strong>
                            </div>
                            <div className="stat-card highlight">
                                <span className="stat-label">Next action</span>
                                <strong>{todos[0]?.title ?? 'Create your first todo'}</strong>
                            </div>
                        </div>
                        <div className="hero-card">
                            <h2>Welcome to your responsive todo app</h2>
                            <p>This application is structured across four content-driven pages: dashboard, create, manage, and about. Tap each tab to explore its page.</p>
                        </div>
                    </section>
                )}

                {page === 'create' && (
                    <section className="page-panel">
                        <div className="section-head">
                            <h2>Create a new todo</h2>
                            <span className="badge">4-step form</span>
                        </div>
                        <TodoForm onCreate={addTodo} />
                    </section>
                )}

                {page === 'manage' && (
                    <section className="page-panel">
                        <div className="section-head">
                            <h2>Manage your list</h2>
                            <span className="badge">Edit or remove tasks</span>
                        </div>
                        {editingTodo && (
                            <div className="editor-section">
                                <h3>Edit item</h3>
                                <TodoEditor todo={editingTodo} onSave={updateTodo} onCancel={() => setEditingTodo(null)} />
                            </div>
                        )}
                        <TodoList todos={todos} onDelete={removeTodo} onEdit={setEditingTodo} />
                    </section>
                )}

                {page === 'about' && (
                    <section className="page-panel">
                        <div className="hero-card">
                            <h2>Responsive design built for any screen</h2>
                            <p>The app uses flexible layout, modern cards, and stacked mobile views so your todo experience stays clean on desktop, tablet, and phone.</p>
                            <ul>
                                <li>Page-driven navigation for clear content flow</li>
                                <li>Card-based layout with strong visual hierarchy</li>
                                <li>Mobile-friendly controls and readable typography</li>
                            </ul>
                        </div>
                    </section>
                )}
            </main>

            <footer className="footer">
                <span>&copy; 2024 TodoFlow. All rights reserved.</span>
                <div className="social-links">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦 Twitter</a>
                    <a href="https://github.com/krishna2045" target="_blank" rel="noopener noreferrer">🐙 GitHub</a>
                    <a href="https://www.linkedin.com/in/krishna1911?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a>
                </div>
            </footer>
        </div>
    )
}
