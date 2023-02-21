import React, {useState, useRef, useEffect} from 'react';
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import '../css/style.css';
import { Draggable } from 'react-beautiful-dnd';


type Props = {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({index, todo, todos, setTodos}: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo); 
    //todo content in the edit box when we edit

    const handleDone = (id: number) => {
        setTodos(
            todos.map(t =>
                t.id === id ? {...t, isDone: !t.isDone } : t
            )
        );
    }; // handleDone()

    const handleDelete = (id: number) => {
        setTodos(todos.filter( t => t.id !== id));
    }; // handleDelete

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map(t => (
                t.id === id ? {...t, todo: editTodo} : t
            ))
        );
        setEdit(false);

    }; // handleEdit

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);
    // when edit change, will focus on the input


  return (
    <Draggable
        draggableId={todo.id.toString()}
        index={index}
    >
        {(provided) => (
            <form 
                className="todos__single" 
                onSubmit={e => handleEdit(e, todo.id)}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                {
                    edit?(
                    <input  
                        ref={inputRef}
                        value={editTodo}
                        onChange={e => setEditTodo(e.target.value)}
                        className="todos__single--test"
                    />
                    )
                    :
                    todo.isDone ? (
                        <s className="todos__single--text">
                            {todo.todo}
                        </s> // strike tag
                    ) : (
                        <span className="todos__single--text">
                            {todo.todo}
                        </span>
                    )

                }
                
                <div>
                    <span 
                        className="icon"
                        onClick={() => {
                            if(!edit && !todo.isDone){
                                setEdit(!edit);
                            }
                        }}
                    >
                        <AiFillEdit />
                    </span>
                    <span className="icon" onClick={() => handleDelete(todo.id)}>
                        <AiFillDelete />
                    </span>
                    <span className="icon" onClick={() => handleDone(todo.id)}>
                        <MdDone />
                    </span>
                </div>

            </form>
        )}
    </Draggable>
  )
}

export default SingleTodo
