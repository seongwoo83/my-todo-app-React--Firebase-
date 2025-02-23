import { create } from 'zustand'
import { db } from '../../firebase'
import { collection, addDoc, doc, updateDoc, getDoc, deleteDoc, Timestamp } from 'firebase/firestore'

interface Todo {
    id: string; //할 일을 구별
    text: string;  // 할 일의 내용
    completed: boolean; // 완료 여부 확인
}

interface TodoStore{
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    moveToUp: (id: string) => void;
    moveToDown: (id: string) => void;
}


/**
    - create<TodoStore>: Zustand로 상태 저장소 생성
    - set(): 상태를 업데이트 하는 함수
    - todos: 초기 할 일 목록 빈 배열로 설정
 */
export const useTodoStore = create<TodoStore>((set) => ({
    todos: [],

    // 할 일 추가
    addTodo: async (text: string) => {
        try{
            const docRef = await addDoc (collection(db, 'todos'), {
                text: text,
                completed: false,
                createdAt: Timestamp.now(),
            });

            set((state) => ({
                todos: [...state.todos, {id: docRef.id, text, completed: false}]
            }));
        }catch(e){
            console.error('Error adding document: ', e);
        }
    },


    // 할 일 완료 여부 변경
    toggleTodo: async (id: string) => {
        try{
            const todoRef = doc(db, 'todos', id);
            
            const docSnap = await getDoc(todoRef);
            if(docSnap.exists()){
                const currentCompleted = docSnap.data().completed;

                await updateDoc(todoRef, {
                    completed: !currentCompleted,
                });

                set((state) => ({
                    todos: state.todos.map((todo) => todo.id === id ? { ...todo, completed: !currentCompleted.completed } : todo )
                }));
            }else{
                console.log('No document');
            }
        }catch(e){
            console.error("Error updating document: ", e)
        }
    },

    // 할 일 목록 제거
    removeTodo: async (id) => {
        try{
            const todoRef = doc(db, 'todos', id);

            await deleteDoc(todoRef);
            set((state) => ({
                todos: state.todos.filter((todo) => todo.id !== id),
            }));
            
        }catch(e){
            console.log('Error removing document: ', e);
        }


    },

    // 할 일 목록 순서 위로 이동
    moveToUp: async (id: string) => {
        try{
            const currentTodos = useTodoStore.getState().todos;
            const todoIndex = currentTodos.findIndex((todo) => todo.id === id);

            if(todoIndex > 0){
                const updateTodos = [...currentTodos];
                const [movedTodo] = updateTodos.splice(todoIndex, 1);
                updateTodos.splice(todoIndex-1, 0, movedTodo);

                useTodoStore.setState({todos: updateTodos});
            }

        }catch(e){
            console.error("Error moving todo up: ", e)
        }
    },

    // 할 일 목록 순서 아래로 이동
    moveToDown: async (id: string ) => {
        try{
            const currentTodos = useTodoStore.getState().todos;
            const todoIndex = currentTodos.findIndex((todo) => todo.id === id);

            if(todoIndex < currentTodos.length-1){
                const updateTodos = [...currentTodos];
                const [movedTodo] = updateTodos.splice(todoIndex, 1);
                updateTodos.splice(todoIndex+1, 0, movedTodo);

                useTodoStore.setState({todos: updateTodos});
            }
        }catch(e){
            console.log("Error moving todo down: ", e);
        }
    }

}))