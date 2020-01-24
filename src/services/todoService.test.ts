import { todoService } from './todoService';

describe('Todos Service -> Get all todos with limitation', () => {
  test('When limitation is default, should fetch 10 todos successfully', async () => {
    const todosDefaultLimit = await todoService.getAll();

    expect(todosDefaultLimit.length).toBe(10);
  });

  test('When limitation is 5, should fetch 5 todos successfully ', async () => {
    const limitTo = 5;

    const todos = await todoService.getAll(limitTo);

    expect(todos.length).toBe(limitTo);
  });
});
