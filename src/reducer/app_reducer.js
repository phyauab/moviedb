import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../constants/action";

const app_reducer = (state, action) => {
  if (action.type === OPEN_SIDEBAR) {
    return { ...state, isSidebarOpen: true };
  }

  if (action.type === CLOSE_SIDEBAR) {
    return { ...state, isSidebarOpen: false };
  }
  return state;
};

export default app_reducer;
