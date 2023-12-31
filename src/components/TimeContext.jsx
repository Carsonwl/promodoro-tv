import React, { createContext, useState } from "react"; //https://blog.logrocket.com/react-context-api-deep-dive-examples/

// Create two context:
// TimeContext: to query the context state
// TimeContextChanger: to update the context state
const TimeContext = createContext(undefined);
const TimeContextChanger = createContext(undefined);

function TimeProvider({ children }) {
    const [timeValues, settimeValues] = useState({
      workTime: 25,
      funTime: 5,
      //* currWork determines if the video playing should be the work video or not.
      currWork: true,
    });
  
    return (
      <TimeContext.Provider value={timeValues}>
        <TimeContextChanger.Provider value={settimeValues}>
          {children}
        </TimeContextChanger.Provider>
      </TimeContext.Provider>
    );
  }
  
  export { TimeProvider, TimeContext, TimeContextChanger };