import { JSX } from "react";
import { useTodoStore } from "../store/todoStore";

export default function TodoList(): JSX.Element {
    const { todos, toggleTodo, removeTodo, moveToUp, moveToDown } = useTodoStore();

    return (
        <ul>
            {
                todos.map((todo)=>(
                    <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}>
                        <button onClick={()=> moveToUp(todo.id)}>Up</button>
                        <button onClick={()=> moveToDown(todo.id)}>Down</button>
                        {todo.text}
                        <button onClick={()=> toggleTodo(todo.id)}>Complete</button>
                        <button onClick={()=> removeTodo(todo.id)}>Delete</button>
                    </li>
                ))
            }
        </ul>
    )
}