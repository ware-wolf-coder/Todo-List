import { useState } from 'react';
import './index.css';

const Todo = (props) => {
    const {todoList, setTodoTasks, todoId, todoText} = props;
    const [isChecked, setIsChecked] = useState(false);
    const [text, setText] = useState(todoText);

    function handleTodoText() {
        const newTodoText = prompt("Change Task:", todoText);

        if(newTodoText === "" || newTodoText === null) {
            return;
        } else{
            const updateTodoList = todoList.map((task) => {
                    if(todoId === task.id) {
                        setText(newTodoText);
                        console.log(task.id, todoId);
                        return {...task, taskText: newTodoText};
                    }
                    return {...task};
                }
            );
            setTodoTasks(updateTodoList);
            return todoList;
        }
    }

    const handleDelete = () => {
        setTodoTasks(todoList.filter(task => task.id !== todoId));
        
        // const currentTasks = todoList.filter(task => 
        //     task.id !== todoId
        // );

        // setTodoTasks(currentTasks);
        // return currentTasks;
    };


    const checkboxName = "todo";

    return (
        <div className='Todo-row' key={todoId}>
            <div className='Todo-content'>
                <input 
                    type="checkbox" 
                    name={checkboxName} 
                    checked={isChecked} 
                    onChange={()=>{setIsChecked(!isChecked)}} />

                <label className={isChecked ? "Todo-done" : "Todo-text"} onClick={handleTodoText}>{text}</label>
            </div>
            <button type='button' className='delete-btn' onClick={handleDelete}>Delete</button>
        </div>    
    );
};

export default Todo;