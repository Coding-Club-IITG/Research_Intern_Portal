import React from 'react';

const Htmlrender = ({ description}) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
};

export default Htmlrender;
