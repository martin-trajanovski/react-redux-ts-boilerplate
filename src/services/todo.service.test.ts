import axiosInstance from '../axios';
import { todoService } from './todo.service';

/**
 * NOTE: Mock axios instance and assign typed mock to new variable(so typescript won't complain when we call `mockImplementationOnce` on get).
 * Let's make unit testing great again with Jest!
 */
jest.mock('../axios');
const mockedAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

const mockedReply = (limitTo: number): void => {
  const todos = new Array(limitTo).fill(0).map((e, i) => {
    return {
      _id: i.toString(),
      title: `Test todo ${i}`,
      completed: false,
    };
  });

  mockedAxiosInstance.get.mockImplementationOnce(() =>
    Promise.resolve({ data: { todos } })
  );
};

afterAll(() => {
  jest.clearAllMocks();
});

describe('Todos Service -> Get all todos with limitation', () => {
  test('When limitation is default, should fetch 10 todos successfully', async () => {
    const limitTo = 10;
    mockedReply(limitTo);

    const todosDefaultLimit = await todoService.getAll();

    expect(todosDefaultLimit.length).toBe(limitTo);
  });

  test('When limitation is 5, should fetch 5 todos successfully ', async () => {
    const limitTo = 5;
    mockedReply(limitTo);

    const returnedTodos = await todoService.getAll(limitTo);

    expect(returnedTodos.length).toBe(limitTo);
  });
});
