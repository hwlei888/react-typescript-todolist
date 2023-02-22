import React, { useState } from 'react';
import './App.css';
import InputFeild from './components/InputFeild';
import TodoList from './components/TodoList';
import { Todo } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'


const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo) {
      setTodos([...todos, {id: Date.now(), todo, isDone: false }]);
      setTodo('');
    }
  };

  // console.log('todos', todos);

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const {source, destination} = result;
    // if destination === null
    if(!destination) return;
    // if still in the same box
    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
    return;

    // when we manipulate active variable, 
    //we are going to provide it to setTodo, more neat way
    let add,
    active = todos,
    complete = completedTodos;

    // take away from the source
    if (source.droppableId === 'TodosList'){
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // add to the destination
    if(destination.droppableId === 'TodosList'){
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);



  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
      <span className="heading">Taskify</span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList 
          todos={todos} 
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          />


      </div>
    </DragDropContext>
  );
}

export default App;
