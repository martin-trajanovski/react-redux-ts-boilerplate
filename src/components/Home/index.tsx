import React from 'react';

import AddTodo from '../AddTodo';
import Logout from '../Logout';
import TodoList from '../TodoList';

const Home: React.FC = () => {
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h4 className="text-center">My lovely todo app</h4>
        <AddTodo />
        <TodoList />
        <Logout />
      </div>
    </div>
  );
};

export default Home;
