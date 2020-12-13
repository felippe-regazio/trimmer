import Reducer from './reducer'
import React, {createContext, useReducer} from 'react'

/* eslint-disable-next-line */
const initialState: any = {
  ffmpeg: {},
  supported: true,
  ffmpegLoaded: false,
};

/* eslint-disable-next-line */
const Store = ({ children }): JSX.Element => {
  const [ state, dispatch ] = useReducer(Reducer, initialState);
  
  return (
    <Context.Provider value={[ state, dispatch ]}>
      {children}
    </Context.Provider>
  );
};
  
export const Context = createContext(initialState);
export default Store;