import styles from "./Footer.module.css"

export default function Footer({completedTodos, totalTodos}){
    return (
    <div className={styles.footer}>
        <div>Completed Todos: {completedTodos}</div>
        <div>Total Todos: {totalTodos}</div>
    </div>
    )
}