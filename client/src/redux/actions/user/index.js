import API from "../../api";

export const userData = params => {
  return async dispatch => {
    // params.counter = true;
    await API.post("/api/v1/user/map/list", { params }).then(response => {
      if (response.data)
        if (response.data.code === 200) {
          let rowData = response.data.data;
          dispatch({
            type: "GET_USER_DATA",
            data: rowData,
            // totalPages: response.data.count / params.perPage,
            // count: response.data.count,
            // params
          });
        }
    });
  };
};

export const addUser = (body) => {
  return async (dispatch) => {
    return await API.post(`api/v1/auth/register`, body).then(
      async (response) => {
        try {
          if (response) {
            dispatch({ type: "ADD_USER_DATA", body });
            dispatch(userData());
            return true;
          } else {
            return false;
          }
        } catch (err) {
          return false;
        }
      }
    );
  };
};