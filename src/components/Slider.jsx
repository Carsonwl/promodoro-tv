import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import { TimeContext, TimeContextChanger } from "./TimeContext";

function Range({ workTime: initialWorkTime, funTime: initialFunTime }) {
  const [value, setValue] = useState(25);
  //   const [workTime, setWorkTime] = useState(initialWorkTime || 25);
  //   const [funTime, setFunTime] = useState(initialFunTime || 5);
  const timeValues = useContext(TimeContext);
  const settimeValues = useContext(TimeContextChanger);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    settimeValues({ workTime: newValue, funTime: 30 - newValue });
  };

  return (
    <>
      <Form.Label>{timeValues.workTime}</Form.Label>
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
