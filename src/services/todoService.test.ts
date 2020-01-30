import nock from 'nock';

import { todoService } from './todoService';

// NOTE: Using type assertion because env variables are defined as (string | undefined) and that is not acceptable for nock url(string | RegExp | Url).
const todosApi = nock(process.env.REACT_APP_API_ENDPOINT as string);

const nockReply = (limitTo: number): void => {
  const todos = new Array(limitTo).fill(0).map((e, i) => {
    return {
      _id: i.toString(),
      title: `Test todo ${i}`,
      completed: false,
    };
  });

  todosApi.get(`/todos?limit=${limitTo}`).reply(
    200,
    {
      todos,
    },
    { 'Access-Control-Allow-Origin': '*' }
  );
};

afterAll(() => {
  nock.cleanAll();
});

describe('Todos Service -> Get all todos with limitation', () => {
  test('When limitation is default, should fetch 10 todos successfully', async () => {
    const limitTo = 10;
    nockReply(limitTo);

    const todosDefaultLimit = await todoService.getAll();

    expect(todosDefaultLimit.length).toBe(limitTo);
  });

  test('When limitation is 5, should fetch 5 todos successfully ', async () => {
    const limitTo = 5;
    nockReply(limitTo);

    const returnedTodos = await todoService.getAll(limitTo);

    expect(returnedTodos.length).toBe(limitTo);
  });
});
