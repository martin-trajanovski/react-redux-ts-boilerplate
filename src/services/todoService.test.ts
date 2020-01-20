import { todoService } from './todoService';

test('should fetch todos successfully', async () => {
  const todosDefaultLimit = await todoService.getAll();

  expect(todosDefaultLimit.length).toBe(10);

  const limitTo = 5;
  const todos = await todoService.getAll(limitTo);

  expect(todos.length).toBe(limitTo);
});
