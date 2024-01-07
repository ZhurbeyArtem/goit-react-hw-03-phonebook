import React from 'react';
import { Button } from 'styles/btn';

const FeedbackOptions = ({ funcRate, options }) => {
  return (
    <div>
      {options.map(item => (
        <Button type="button" key={item} onClick={() => funcRate(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
};

export default FeedbackOptions;
