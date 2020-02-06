import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from 'src/interfaces';

import { updateTodo, removeTodo } from '../../actions';
import './TodoItem.scss';

type TodoItemProps = {
  todo: Todo;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const todoClass = todo.completed ? 'completed' : '';
  const dispatch = useDispatch();

  const handleToggleClick = (): void => {
    const updatedTodo = { ...todo, completed: !todo.completed };

    dispatch(updateTodo(updatedTodo));
  };

  const handleRemoveClick = (): void => {
    dispatch(removeTodo(todo._id));
  };

  return (
    <div data-testid="todo-item" className={`todo-item ${todoClass}`}>
      <span className="todo-item-text" onClick={handleToggleClick}>
        {todo.title}
      </span>
      <FontAwesomeIcon
        className="float-right"
        color="#dc3545"
        icon="trash"
        onClick={handleRemoveClick}
      />
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
