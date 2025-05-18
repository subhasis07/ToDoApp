import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const[input, setInput]=useState("");

  const[tasks, setTasks]=useState(()=>{
    const savedToDo=localStorage.getItem("todos");
    return savedToDo?JSON.parse(savedToDo):[];
  });

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(tasks));
  },[tasks])

  function handleAddTodo(){

    if(input.trim()===""){
      return;
    }
    const item={
      id:Date.now(),
      task:input.trim(),
      completed:false      
    }

    setTasks(prev=>[...prev, item]);
    setInput("")
  }

  function toggleTask(id){
    setTasks(
      tasks.map(t=>{
        if(t.id===id){
          return{
            ...t,
            completed:!t.completed
          }
        }else{
          return t;
        }
      })
    )
  }

  function deleteTodo(id){
    setTasks(
      tasks.filter(
        (t)=>(t.id!==id)
      )
    )
  }

  return(
    <>
      <input 
        type='text' 
        placeholder='Write your TODO' 
        value={input} 
        onChange={(e)=>setInput(e.target.value)}
        onKeyDown={(e)=>{
          if(e.key==='Enter'){
            handleAddTodo();
          }
        }}
      >

      </input>
      <button  disabled={!input.trim()} onClick={()=>handleAddTodo()}>Add</button>

      <ul>
        {tasks.map((t)=>
          <li key={t.id}>
            <input 
              type='checkbox' 
              checked={t.completed}
              onChange={()=>toggleTask(t.id)}
            >

            </input>
            <span 
              className={t.completed ?'strike': ""}
            >{t.task}</span>
            <button onClick={()=>deleteTodo(t.id)}>Delete</button>
          </li>
        )}
      </ul>

    </>
  )
}
export default App;