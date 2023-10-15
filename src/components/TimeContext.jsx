import React, { createContext} from 'react';

const timeValues = createContext({
    workTime: 25,
    funTime: 5
});

export default timeValues;