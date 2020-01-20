import { todoReducer } from './todoReducer';
import { addTodo, removeTodo, toggleTodo } from '../actions';
import { Todo } from 'src/interfaces';
import { initialTestingAppState } from 'src/config/setupTests';

const { todos } = initialTestingAppState;
const [initialTodo] = todos.items;

test('should add todo successfully', () => {
  const newTodo = { title: 'Meet friend for lunch' };
  const newState = todoReducer(todos, addTodo(newTodo as Todo));

  expect(newState.items.length).toBe(2);
  expect(newState.items[1].title).toBe(newTodo.title);
});

test('should remove todo successfully', () => {
  const newState = todoReducer(
    initialTestingAppState.todos,
    removeTodo(initialTodo.id)
  );

  expect(newState.items.length).toBe(0);
  expect(newState.items).not.toContain(initialTodo);
});

test('should complete todo successfully', () => {
  const newState = todoReducer(todos, toggleTodo(initialTodo.id));

  expect(newState.items[0].completed).toBe(true);
});
