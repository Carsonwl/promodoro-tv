import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import { TimeContext, TimeContextChanger } from "./TimeContext";

function Range() {
  const [value, setValue] = useState(25);
  const timeValues = useContext(TimeContext);
  const settimeValues = useContext(TimeContextChanger);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    // newValue - 0 insures that value is stored as an int instead of a string. 
    // TODO: add type casting to avoid messy workarounds
    settimeValues({ ...timeValues, workTime: newValue - 0, funTime: 30 - newValue });
  };

  return (
    <>
      <h2 className='p-2'>
        Focus Time: {timeValues.workTime} | Break Time: {timeValues.funTime}
      </h2>
      <Form.Range
        min={0}
        max={30}
        defaultValue={value}
        onChange={handleChange}
        className='mb-3'
      />
    </>
  );
}

export default Range;
