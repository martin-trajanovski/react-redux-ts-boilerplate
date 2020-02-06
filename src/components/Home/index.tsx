import React from 'react';
import { authService } from 'src/services';

import AddTodo from '../AddTodo';
import TodoList from '../TodoList';

const Home: React.FC = () => {
  const logout = (): void => {
    authService.logout();
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h4 className="text-center">My lovely todo app</h4>
        <AddTodo />
        <TodoList />
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
