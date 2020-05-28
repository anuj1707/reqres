const initialState = {
  data: [],
  hasMore: true,
  isLogged: false,
  userAdded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        data: action.payload,
        userAdded: false,
      };
    case "HAS_NO_MORE_DATA":
      return {
        ...state,
        hasMore: false,
      };
    case "UPDATE_USER_LIST":
      return {
        ...state,
        data: action.payload,
      };
    case "ADD_USER_REQUEST":
      return {
        ...state,
        data: action.payload,
        userAdded: true,
      };
    case "ADD_USER_SUCCESS":
      return {
        ...state,
        userAdded: false,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLogged: action.payload,
        userAdded: false,
      };

    default:
      return state;
  }
};

export default reducer;
