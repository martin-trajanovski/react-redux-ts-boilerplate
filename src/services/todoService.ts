import { Todo } from 'src/interfaces';
import axiosInstance from 'src/axios';

const getAll = async (limit = 10): Promise<Todo[]> => {
  try {
    const { data } = await axiosInstance.get(`/todos?_limit=${limit}`);

    return data;
  } catch (error) {
    throw error;
  }
};

export const todoService = {
  getAll,
};
