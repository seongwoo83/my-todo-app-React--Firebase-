import { JSX, useState } from "react"
import { useTodoStore } from "../store/todoStore";

export default function TodoInput(): JSX.Element {
    const [text, setText] = useState<string>('');
    const { addTodo } = useTodoStore();

    const handleAddTodo = (): void => {
        if(text.trim() !== ''){
            addTodo(text);
            setText('');
        }
    };

    return (
        <div>
            <input type="text" value={text} onChange={(e)=> setText(e.target.value)} placeholder="뭐라도 좀 해라;;"/>
            <button onClick={handleAddTodo}>추가</button>
        </div>
    )
}