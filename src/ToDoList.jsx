import React, { useState} from 'react';

function ToDoList() {
const [task,setTask]= useState([]);
const [newTask,setNewTask]= useState("");

function handleInputChange(event){
setNewTask(event.target.value);
}
function addTask(){
  if(newTask.trim()!==""){ 
setTask(t=> [...task,newTask]);
setNewTask("");
  }


}
function deleteTask(index){
  const updatedTasks = task.filter((_,i)=>i!== index);
  setTask(updatedTasks);

}
function moveTaskUp(index){
  if(index>0){
    const updatedTasks = [...task];
    [updatedTasks[index-1],updatedTasks[index]]=[updatedTasks[index],updatedTasks[index-1]];
    setTask(updatedTasks);
  }


}
function moveTaskDown(index){
  if(index<task.length-1){
    const updatedTasks = [...task];
    [updatedTasks[index+1],updatedTasks[index]]=[updatedTasks[index],updatedTasks[index+1]];
    setTask(updatedTasks);
  }

}

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
<ol>
  {
    task.map((task,index)=>
      <li key={index}>
        <span className="text">{task}</span>
<button className="delete-button"
onClick={()=>deleteTask(index)}>
  DELETE
  </button>
  <button className="move-button"
onClick={()=>moveTaskUp(index)}>
  ☝🏻
  </button>
  <button className="move-button"
onClick={()=>moveTaskDown(index)}>
  👇🏻
  </button>

      </li>

    )}
</ol>
</div>);
}
export default ToDoList