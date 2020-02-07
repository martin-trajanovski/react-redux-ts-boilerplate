import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="text-center mt-3">
      <h3>
        Not found{' '}
        <span aria-label="worried-emoji" role="img">
          😟
        </span>
      </h3>
    </div>
  );
};

export default Spinner;
