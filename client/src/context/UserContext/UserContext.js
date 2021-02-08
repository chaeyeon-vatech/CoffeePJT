import React, { useReducer } from "react";

const initialState = {
  id: null,
  update: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "change":
      return { ...state, id: action.target };
    case "update":
      return { ...state, update: state.update + 1 };
    case "remove":
      return null;
    default:
      return state;
  }
};

const UserContext = React.createContext();
const UserContextConsumer = UserContext.Consumer;

const UserContextProvider = props => {
  const [userContext, dispatchUser] = useReducer(reducer, initialState);
  const value = { userContext: userContext, dispatchUser: dispatchUser };

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export { UserContext, UserContextConsumer };
