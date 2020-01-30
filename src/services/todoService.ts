import axiosInstance from 'src/axios';
import { Todo } from 'src/interfaces';

const getAll = async (limit = 10): Promise<Todo[]> => {
  try {
    const { data } = await axiosInstance.get(`/todos?limit=${limit}`);

    return data.todos;
  } catch (error) {
    throw error;
  }
};

const create = async (todo: Todo): Promise<Todo> => {
  try {
    const { data } = await axiosInstance.post('/todos', todo);

    return data.todo;
  } catch (error) {
    throw error;
  }
};

const update = async (todo: Todo): Promise<Todo> => {
  try {
    const { data } = await axiosInstance.put('/todos', todo);

    return data.todo;
  } catch (error) {
    throw error;
  }
};

const remove = async (_id: string): Promise<Todo> => {
  try {
    const { data } = await axiosInstance.delete(`/todos/${_id}`);

    return data.todo;
  } catch (error) {
    throw error;
  }
};

export const todoService = {
  getAll,
  create,
  update,
  remove,
};
