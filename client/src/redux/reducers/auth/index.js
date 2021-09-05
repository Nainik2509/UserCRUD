const initialState = {
  data: {},
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default AuthReducer;
