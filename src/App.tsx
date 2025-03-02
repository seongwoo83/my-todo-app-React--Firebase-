import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./styles/App.css";
import "./styles/main.scss"

export default function App() {
  return(
    // TODO UI개선하기
    <main style={{textAlign: 'center', marginTop: '50px'}}>
      <h1 className="ext-3xl font-bold underline">📝 Vite Todo List</h1>
      <TodoInput />
      <TodoList />
    </main>
  )
}


