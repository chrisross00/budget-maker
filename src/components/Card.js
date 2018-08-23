import React from 'react';

export const Card = (WrappedFormComponent) => {
  return (props) => (
    <div className="content-container shadow">
      <WrappedFormComponent {...props} />
    </div>
  )
}

export default Card;
