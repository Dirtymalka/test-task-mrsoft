import React from 'react';

const ErrorIndicator = () => {
  return (
    <div className="card text-white bg-danger mb-5" style={{maxWidth: '18rem', margin: '70px auto'}}>
      <div className="card-body">
        <h5 className="card-title">Error</h5>
        <p className="card-text">Something went wrong. Try to reload the page.</p>
      </div>
    </div>
  );
};

export default ErrorIndicator;
