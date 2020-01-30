import faker from 'faker';
import { initialTestingAppState } from 'src/config/setupTests';
import { Todo } from 'src/interfaces';

import {
  addTodo,
  removeTodo,
  updateTodo,
  addTodoSuccess,
  addTodoFailed,
  removeTodoSuccess,
  updateTodoSuccess,
} from '../actions';
import { todoReducer } from './todoReducer';

const { todos } = initialTestingAppState;
const [initialTodo] = todos.items;

const fakeTodo: Todo = {
  _id: faker.random.uuid(),
  title: faker.random.words(),
  completed: false,
};

describe('Todo Reducer -> Test all actions', () => {
  test('When dispatching addTodo action with newTodo as parameter, it should enter saving state', () => {
    const newState = todoReducer(
      todos,
      addTodo({ title: fakeTodo.title } as Todo)
    );

    expect(newState.saving).toBeTruthy();
  });

  test('When dispatching addTodoSuccess action with fakeTodo as parameter, it should be added into the state successfully', () => {
    const newState = todoReducer(todos, addTodoSuccess(fakeTodo));

    expect(newState.items.length).toBe(2);
    expect(newState.items).toContain(fakeTodo);
  });

  test('When dispatching addTodoFailed action, it should enter into error state', () => {
    const newState = todoReducer(todos, addTodoFailed());

    expect(newState.error).toBeTruthy();
  });

  test('When dispatching removeTodo action with todo id as parameter, it should enter saving state', () => {
    const newState = todoReducer(todos, removeTodo(initialTodo._id));

    expect(newState.saving).toBeTruthy();
  });

  test('When dispatching removeTodoSuccess action with todo as parameter, it should be removed from the state successfully', () => {
    const newState = todoReducer(todos, removeTodoSuccess(initialTodo));

    expect(newState.items.length).toBe(0);
    expect(newState.items).not.toContain(initialTodo);
  });

  test('When dispatching updateTodo action with todo as parameter, it should enter saving state', () => {
    const newState = todoReducer(todos, updateTodo(initialTodo));

    expect(newState.saving).toBeTruthy();
  });

  test('When dispatching updateTodoSuccess action with todo as parameter, it should update the todo successfully', () => {
    const updatedTodo = { ...initialTodo, completed: !initialTodo.completed };

    const newState = todoReducer(todos, updateTodoSuccess(updatedTodo));

    expect(newState.items[0].completed).toBeTruthy();
  });
});
