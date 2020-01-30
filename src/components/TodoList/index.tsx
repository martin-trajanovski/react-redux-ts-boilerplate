import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos } from 'src/actions';
import { Todo } from 'src/interfaces';
import { AppState } from 'src/reducers';

import TodoItem from '../TodoItem';

const TodoList: React.FC = () => {
  const todoState = useSelector((state: AppState) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const limitTo = 10;
    dispatch(fetchTodos(limitTo));
  }, [dispatch]);

  if (todoState.loading) {
    return (
      <div className="todo-list">
        <div>Loading...</div>
      </div>
    );
  }

  const todoItems = todoState.items.map((todo: Todo) => (
    <TodoItem key={todo._id} todo={todo} />
  ));

  return <div className="todo-list">{todoItems}</div>;
};

export default TodoList;
