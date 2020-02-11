import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="text-center">
      <div className="spinner-grow text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
