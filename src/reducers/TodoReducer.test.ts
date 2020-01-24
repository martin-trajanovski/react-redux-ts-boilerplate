import { todoReducer } from './todoReducer';
import { addTodo, removeTodo, toggleTodo } from '../actions';
import { Todo } from 'src/interfaces';
import { initialTestingAppState } from 'src/config/setupTests';

const { todos } = initialTestingAppState;
const [initialTodo] = todos.items;

describe('Todo Reducer -> Test all actions', () => {
  test('When dispatching addTodo action with newTodo as parameter, it should be added into the state successfully', () => {
    const newTodo = { title: 'Meet friend for lunch' };

    const newState = todoReducer(todos, addTodo(newTodo as Todo));

    expect(newState.items.length).toBe(2);
    expect(newState.items[1].title).toBe(newTodo.title);
  });

  test('When dispatching removeTodo action with todo id as parameter, it should be removed from the state successfully', () => {
    const newState = todoReducer(todos, removeTodo(initialTodo.id));

    expect(newState.items.length).toBe(0);
    expect(newState.items).not.toContain(initialTodo);
  });

  test('When dispatching toggleTodo action with todo id as parameter, it should be completed successfully', () => {
    const newState = todoReducer(todos, toggleTodo(initialTodo.id));

    expect(newState.items[0].completed).toBe(true);
  });
});
