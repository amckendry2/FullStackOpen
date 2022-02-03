import React, { createContext, useContext, useReducer } from "react";
import { Action, State, initialState } from "./reducer";


export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  initialState: State;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, initialState, children }: StateProviderProps): JSX.Element => {
  const [contextReducer, contextInitialState] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[contextReducer, contextInitialState]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
