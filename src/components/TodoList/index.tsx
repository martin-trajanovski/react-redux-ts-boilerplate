import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoItem from '../TodoItem';
import { Todo } from 'src/interfaces';
import { AppState } from 'src/reducers';
import { fetchTodos } from 'src/actions';

const TodoList: React.FC = () => {
  const todos = useSelector((state: AppState) => state.todos.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const limitTo = 10;
    dispatch(fetchTodos(limitTo));
  }, [dispatch]);

  return (
    <div className="todo-list">
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
