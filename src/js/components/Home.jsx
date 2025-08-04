import React from "react";
import { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
    const [items, setItems] = useState("");
    const [tasks, setTasks] = useState([]);

    const addTask = (e) => {
        if (e.key === "Enter" && items.trim() !== "") {
            setTasks([...tasks, items.trim()]);
            setItems("");
        }
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center text-muted mb-4" style={{ fontSize: "3rem" }}>
                Todos
            </h1>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="What needs to be done?"
                value={items}
                onChange={(e) => setItems(e.target.value)}
                onKeyDown={addTask}
            />

            <ul className="list-group">
                {tasks.length === 0 ? (
                    <li className="list-group-item text-muted">No tasks, add tasks</li>
                ) : (
                    tasks.map((task, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center task-item"
                        >
                            {task}
                            <button
                                className="btn btn-danger btn-sm delete-btn"
                                onClick={() => deleteTask(index)}
                                style={{ display: "none" }}
                            >
                                X
                            </button>
                        </li>
                    ))
                )}
            </ul>

            <div className="text-muted mt-3">
                {tasks.length === 0
                    ? "There are no items left."
                    : `Item${tasks.length > 1 ? "s" : ""} left: ${tasks.length}`}
            </div>

            <style>
                {`
                    .task-item:hover .delete-btn {
                        display: inline-block !important;
                    }
                `}
            </style>
        </div>
    );
};

export default Home;