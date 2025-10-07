import styles from "./todoitem.module.css"

export default function ToDoItem({item, todos, setTodos}){ //Destructing a prop
    function handleDelete(item){
        console.log("Deleted !!!")
        setTodos(todos.filter((todo) => todo!==item))
    }

    function handleClick(name){
        const newArray = todos.map((todo)=>todo.name === name ? {...todo, isDone:!todo.isDone} : todo)
        setTodos(newArray)
    }

    const className = item.isDone ? styles.completed : ""

    return (
    <div className={styles.item}>
        <div className={className} onClick={()=>handleClick(item.name)}>{item.name}</div>
        <div>|</div>
        <svg onClick={()=>handleDelete(item)} xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#1f1f1f"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>
    </div>
    )

}