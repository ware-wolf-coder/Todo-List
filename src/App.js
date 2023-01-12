import { useEffect, useState } from 'react';
import './App.css';
import Todo from './components/todo';

function App() {

  const [showTaskInput, setShowTaskInput] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [todoTasks, setTodoTasks] = useState([]);

  useEffect(() => {
    const tasks = localStorage.getItem("TODO_TASKS");
    if(tasks !== null) {
      setTodoTasks(JSON.parse(tasks));
      console.log(todoTasks);
    }  
  }, []);

  useEffect(() => {
    localStorage.setItem("TODO_TASKS", JSON.stringify(todoTasks));
  }, [todoTasks]);

  const handleClick = () => {
    setShowTaskInput(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(newTask) {
      setTodoTasks([...todoTasks, {
        id: new Date().getTime().toString(),
        taskText: newTask
      }]);
      setNewTask("");

      setShowTaskInput(false);
    } else {
      alert("Cannot create empty task!");
    }
  };

  const taskInput = <div className='Task-input-container'>
                      <input className='Task-input' type='text' id='taskContent' name='taskContent' value={newTask} onChange={(e)=>{setNewTask(e.target.value)}}/>  
                      <button className='Task-submit' type='submit' onClick={handleSubmit}>Done</button>
                    </div>;

  return (
    <>
      <div className='App-title'>
        <h1>Todo-List Web App</h1>
      </div>

      <div className='App-container'>
        {showTaskInput && taskInput}
        {todoTasks.map((todoTask) => {
          return (
            <Todo key={todoTask.id} todoId={todoTask.id} todoList={todoTasks} setTodoTasks={setTodoTasks} todoText={todoTask.taskText} />
          );
        })}
        <button type='submit' className='create-task-btn' onClick={handleClick}>Create Task</button> 
      </div>
    </>
  );
}

export default App;
