import React from "react";

var LayoutStateContext = React.createContext();
var LayoutDispatchContext = React.createContext();

//store bara rikhtan hame dakhelesh

function layoutReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_DRAWER":
      return { ...state, drawerOpen: !state.drawerOpen };
    case "SET_LOGIN_STATE":
      return { ...state, loginState: action.payload };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function LayoutProvider({ children }) {
  var [state, dispatch] = React.useReducer(layoutReducer, {
    drawerOpen: false,
    loginState: false,
  });
  return (
    <LayoutStateContext.Provider value={state}>
      <LayoutDispatchContext.Provider value={dispatch}>
        {children}
      </LayoutDispatchContext.Provider>
    </LayoutStateContext.Provider>
  );
}

function useLayoutState() {
  var context = React.useContext(LayoutStateContext);
  if (context === undefined) {
    throw new Error("useLayoutState must be used within a LayoutProvider");
  }
  return context;
}

function useLayoutDispatch() {
  var context = React.useContext(LayoutDispatchContext);
  if (context === undefined) {
    throw new Error("useLayoutDispatch must be used within a LayoutProvider");
  }
  return context;
}

export {
  LayoutProvider,
  useLayoutState,
  useLayoutDispatch,
  toggleDrawer,
  setLoginState,
};

// ###########################_SetStates_################################
function toggleDrawer(dispatch) {
  dispatch({
    type: "TOGGLE_DRAWER",
  });
}
function setLoginState(dispatch, bool) {
  dispatch({
    type: "SET_LOGIN_STATE",
    payload: bool,
  });
}
