const fetchData = (payload) => ({ type: "FETCH_DATA_SUCCESS", payload });
const hasNoMoreData = () => ({ type: "HAS_NO_MORE_DATA" });
const loadMoreData = (payload) => ({ type: "LOAD_MORE_DATA", payload });
const deleteUser = (payload) => ({ type: "DELETE_USER", payload });
const addUserRequest = (payload) => ({ type: "ADD_USER_REQUEST", payload });
const addUserSuccess = () => ({ type: "ADD_USER_SUCCESS" });
const loginSuccess = (payload) => ({ type: "LOGIN_SUCCESS", payload });

export {
  fetchData,
  hasNoMoreData,
  loadMoreData,
  deleteUser,
  loginSuccess,
  addUserRequest,
  addUserSuccess,
};
