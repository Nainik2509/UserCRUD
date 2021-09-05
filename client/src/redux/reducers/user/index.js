const initialState = {
  userList: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_DATA":
      return {
        ...state,
        userList: action.data,
      };
    default:
      return state;
  }
};

export default UserReducer;
