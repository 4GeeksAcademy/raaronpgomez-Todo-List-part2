import React, { useState, useEffect } from "react";

const Home = () => {
    
    const [items, setItems] = useState(""); 
    const [tasks, setTasks] = useState([]); 
    
    const username = "raaronpgomez"; 
    const API_URL = `https://playground.4geeks.com/todo`;

    const getTodos = () => {
        fetch(`${API_URL}/users/${username}`)
            .then(resp => {
                if (resp.status === 404) {
                    createUser();
                    return null;
                }
                if (!resp.ok) throw new Error("Error al cargar las tareas");
                return resp.json();
            })
            .then(data => {
                if (data) {
                    setTasks(data.todos);
                }
            })
            .catch(error => console.error(error));
    };

    
    const createUser = () => {
        fetch(`${API_URL}/users/${username}`, { method: "POST" })
            .then(resp => {
                if (!resp.ok) throw new Error("Error al crear usuario");
                return resp.json();
            })
            .then(() => getTodos()) 
            .catch(error => console.error(error));
    };

    const addTask = (e) => {
        if (e.key === "Enter" && items.trim() !== "") {
            const newTask = { label: items.trim(), is_done: false };
            fetch(`${API_URL}/todos/${username}`, {
                method: "POST",
                body: JSON.stringify(newTask),
                headers: { "Content-Type": "application/json" }
            })
            .then(resp => {
                if (!resp.ok) throw new Error("Error al añadir la tarea");
                return resp.json();
            })
            .then(() => {
                setItems(""); 
                getTodos();
            })
            .catch(error => console.error(error));
        }
    };

    const deleteTask = (taskId) => {
        fetch(`${API_URL}/todos/${taskId}`, { method: "DELETE" })
            .then(resp => {
                if (!resp.ok && resp.status !== 204) {
                    throw new Error("Error al eliminar la tarea");
                }
                getTodos(); 
            })
            .catch(error => console.error(error));
    };

    const clearAllTasks = () => {
        fetch(`${API_URL}/users/${username}`, { method: "DELETE" })
            .then(resp => {
                if (!resp.ok && resp.status !== 204) {
                    throw new Error("Error al limpiar las tareas");
                }

                createUser();
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div className="container mt-5" style={{maxWidth: "600px"}}>
            <h1 className="text-center text-muted mb-4" style={{ fontSize: "5rem", fontWeight: "100" }}>
                todos
            </h1>

            <div className="card shadow">
                <input
                    type="text"
                    className="form-control form-control-lg border-0"
                    placeholder="What needs to be done?"
                    value={items}
                    onChange={(e) => setItems(e.target.value)}
                    onKeyDown={addTask}
                />
                <ul className="list-group list-group-flush">
                    {tasks.length === 0 ? (
                        <li className="list-group-item text-muted">No tasks, add a task</li>
                    ) : (
                        tasks.map((task) => (
                            <li
                                key={task.id}
                                className="list-group-item d-flex justify-content-between align-items-center task-item"
                            >
                                {task.label} {}
                                <button
                                    className="btn btn-sm delete-btn"
                                    onClick={() => deleteTask(task.id)} 
                                >
                                    &times; {}
                                </button>
                            </li>
                        ))
                    )}
                </ul>
                <div className="card-footer text-muted d-flex justify-content-between align-items-center">
                    <span>
                        {tasks.length} item{tasks.length !== 1 ? "s" : ""} left
                    </span>
                    <button className="btn btn-outline-danger btn-sm" onClick={clearAllTasks}>
                        Clear All Tasks
                    </button>
                </div>
            </div>
            
            {}
            <style>
                {`
                    .task-item .delete-btn {
                        visibility: hidden;
                        opacity: 0;
                        transition: opacity 0.2s ease-in-out;
                    }
                    .task-item:hover .delete-btn {
                        visibility: visible;
                        opacity: 1;
                    }
                `}
            </style>
        </div>
    );
};

export default Home;
