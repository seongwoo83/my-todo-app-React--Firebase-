import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export default function App() {
  return(
    <main style={{textAlign: 'center', marginTop: '50px'}}>
      <h1>📝 Vite Todo List</h1>
      <TodoInput />
      <TodoList />
    </main>
  )
}


