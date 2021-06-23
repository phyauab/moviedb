import React, { useContext, useReducer } from "react";
import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../constants/action";
import reducer from "../reducer/app_reducer";

const AppContext = React.createContext();

const initialState = {
  isSidebarOpen: false,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const openSidebar = () => {
    dispatch({ type: OPEN_SIDEBAR });
  };
  const closeSidebar = () => {
    dispatch({ type: CLOSE_SIDEBAR });
  };
  return (
    <AppContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
