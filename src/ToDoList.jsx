
import React, { useState } from 'react';

function ToDoList() {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [activeTab, setActiveTab] = useState("todo");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  // ADD TASK
  function addTask() {
    if (newTask.trim() !== "") {

      const newTaskObject = {
        id: Date.now(),
        title: newTask,
        completed: false,
        completedAt: null
      };

      setTasks(prev => [...prev, newTaskObject]);
      setNewTask("");
    }
  }

  // DELETE TASK
  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  // MARK AS COMPLETED
  function markCompleted(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              completed: true,
              completedAt: new Date().toISOString()
            }
          : task
      )
    );
  }

  // RESTORE TASK
  function restoreTask(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              completed: false,
              completedAt: null
            }
          : task
      )
    );
  }

  // MOVE TASK UP
  function moveTaskUp(index) {
    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    if (index > 0) {
      const updatedTasks = [...pendingTasks];

      [updatedTasks[index - 1], updatedTasks[index]] =
      [updatedTasks[index], updatedTasks[index - 1]];

      setTasks([...updatedTasks, ...completedTasks]);
    }
  }

  // MOVE TASK DOWN
  function moveTaskDown(index) {
    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    if (index < pendingTasks.length - 1) {
      const updatedTasks = [...pendingTasks];

      [updatedTasks[index + 1], updatedTasks[index]] =
      [updatedTasks[index], updatedTasks[index + 1]];

      setTasks([...updatedTasks, ...completedTasks]);
    }
  }

  // FILTER TASKS
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="todo-list">

      <h1>To Do List</h1>

   
      <div>
        <input
          type="text"
          placeholder="Enter a new Task"
          value={newTask}
          onChange={handleInputChange}
        />

        <button className="add-button" onClick={addTask}>
          ADD
        </button>
      </div>

      <div>
        <button
          className="move-button"
          onClick={() => setActiveTab("todo")}
          style={{
            backgroundColor: activeTab === "todo" ? "green" : "turquoise"
          }}
        >
          TO DO ({pendingTasks.length})
        </button>

        <button
          className="move-button"
          onClick={() => setActiveTab("completed")}
          style={{
            backgroundColor: activeTab === "completed" ? "green" : "turquoise"
          }}
        >
          COMPLETED ({completedTasks.length})
        </button>
      </div>

      {activeTab === "todo" && (
        <ol>
          {pendingTasks.map((task, index) => (
            <li key={task.id}>

              <span className="text">
                {task.title}
              </span>

              <button
                className="move-button"
                onClick={() => markCompleted(task.id)}
              >
                DONE
              </button>

              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
              >
                DELETE
              </button>

              <button
                className="move-button"
                onClick={() => moveTaskUp(index)}
              >
                ☝🏻
              </button>

              <button
                className="move-button"
                onClick={() => moveTaskDown(index)}
              >
                👇🏻
              </button>

            </li>
          ))}
        </ol>
      )}

      {/* COMPLETED TAB */}
      {activeTab === "completed" && (
        <ol>
          {completedTasks.map(task => (
            <li key={task.id}>

              <span
                className="text"
                style={{ textDecoration: "line-through" }}
              >
                {task.title}
              </span>

              <span>
                Completed at: {
                  new Date(task.completedAt).toLocaleString()
                }
              </span>

              <button
                className="move-button"
                onClick={() => restoreTask(task.id)}
              >
                RESTORE ↩
              </button>

              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
              >
                DELETE
              </button>

            </li>
          ))}
        </ol>
      )}

    </div>
  );
}

export default ToDoList;
