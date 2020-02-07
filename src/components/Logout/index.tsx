import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { authService } from 'src/services';

const Logout: React.FC = () => {
  const logout = (): void => {
    authService.logout();
  };

  return (
    <button className="btn btn-light" onClick={logout}>
      Logout
      <FontAwesomeIcon
        data-testid="logout-icon"
        className="ml-1"
        icon="sign-out-alt"
      />
    </button>
  );
};

export default Logout;
