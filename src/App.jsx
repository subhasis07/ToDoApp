import { useState } from 'react'
import './App.css'

function App() {

  const[input, setInput]=useState("");

  const[tasks, setTasks]=useState([]);

  function handleAddTodo(){

    if(input.trim()===""){
      return;
    }
    const item={
      id:tasks.length+1,
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
      <input type='text' placeholder='Write your TODO' value={input} onChange={(e)=>setInput(e.target.value)}></input>
      <button onClick={()=>handleAddTodo()}>Add</button>

      <ul>
        {tasks.map((t)=>
          <li key={t.id}>
            <input type='checkbox' onChange={()=>toggleTask(t.id)}></input>
            <span className={t.completed ?'strike': ""}>{t.task}</span>
            <button onClick={()=>deleteTodo(t.id)}>Delete</button>
          </li>
        )}
      </ul>

    </>
  )
}
export default App;