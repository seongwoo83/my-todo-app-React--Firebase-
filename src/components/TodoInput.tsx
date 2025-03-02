import { JSX, useState } from "react"
import { useTodoStore } from "../store/todoStore";
import styled from "styled-components";

const StyledInput = styled.input`
    width: 50%;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    transition: all 0.3s ease-in-out;

    &:focus {
        border-color: #6366f1;
        box-shadow: 0 0 5px rgba(99, 102, 241, 0.5);
    }
`


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
            <StyledInput type="text" value={text} onChange={(e)=> setText(e.target.value)} placeholder="뭐라도 좀 해라;;"/>
            <button onClick={handleAddTodo}>추가</button>
        </div>
    )
}