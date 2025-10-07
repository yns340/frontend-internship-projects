import ToDoItem from "./ToDoItem.jsx"

export default function ToDoList({todos, setTodos}){
   const sortedTodos = todos
      .slice()
      .sort((a,b) => Number(a.isDone) - Number(b.isDone))

   return (
   <div>
    {sortedTodos.map(item => (
            <ToDoItem key={item.name} item = {item} todos={todos} setTodos={setTodos}/> //props göndermelisin
        ))}
   </div>
   )
}