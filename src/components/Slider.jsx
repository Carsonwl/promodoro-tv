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
    settimeValues({ workTime: newValue - 0, funTime: 30 - newValue }); // workTime - 0 insures that value is an int
  };

  return (
    <>
      <Form.Label>Time Split</Form.Label>
      <Form.Range
        min={0}
        max={30}
        defaultValue={value}
        onChange={handleChange}
      />
      <h2>
        Focus Time: {timeValues.workTime} | Fun Time: {timeValues.funTime}
      </h2>
    </>
  );
}

export default Range;
