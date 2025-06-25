import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="text-center py-5">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p className="mt-2 text-muted">{message}</p>
    </div>
  );
};

export default Loading;
