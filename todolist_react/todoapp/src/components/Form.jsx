import { useState } from "react";
import styles from "./form.module.css"

export default function Form({todos, setTodos}){
    //const [todo, setTodo] = useState(""); OBJE KULLAN
    const[todo, setTodo] = useState({name:"", isDone:false})
    
    function handleSubmit(e){
        e.preventDefault();
        setTodos([...todos,todo])//üzerine ekler listenin
        setTodo({name:"", isDone:false})//içeriyi sıfırlar
    }

    return(
        <form className = {styles.todoForm} onSubmit={handleSubmit}>
            <input 
            onChange={(e) => setTodo({name:e.target.value, isDone: false})}
            value = {todo.name} 
            type="text" 
            placeholder="Enter a todo item..."/>
            <button type="submit">Add</button>
        </form> 
    )
}