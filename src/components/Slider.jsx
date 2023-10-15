import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

function Range({ workTime: initialWorkTime, funTime: initialFunTime }) {
  const [value, setValue] = useState(25);
  const [workTime, setWorkTime] = useState(initialWorkTime || 25);
  const [funTime, setFunTime] = useState(initialFunTime || 5);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    setWorkTime(newValue);
    setFunTime(30 - newValue);
  };

  return (
    <>
      <Form.Label>Range</Form.Label>
      <Form.Range
        min={0}
        max={30}
        defaultValue={value}
        onChange={handleChange}
      />
      <h2>Focus Time: {value} | Fun Time: {funTime}</h2>
    </>
  );
}

export default Range;
