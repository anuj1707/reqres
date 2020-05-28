const fetchData = (payload) => ({ type: "FETCH_DATA_SUCCESS", payload });
const hasNoMoreData = () => ({ type: "HAS_NO_MORE_DATA" });
const updateUserList = (payload) => ({ type: "UPDATE_USER_LIST", payload });
const addUserRequest = (payload) => ({ type: "ADD_USER_REQUEST", payload });
const addUserSuccess = () => ({ type: "ADD_USER_SUCCESS" });
const loginSuccess = (payload) => ({ type: "LOGIN_SUCCESS", payload });

export {
  fetchData,
  hasNoMoreData,
  updateUserList,
  loginSuccess,
  addUserRequest,
  addUserSuccess,
};
