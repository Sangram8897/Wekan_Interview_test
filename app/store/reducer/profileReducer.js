const initialState = {
    profile: null,
    error: null,
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'PROFILE_SUCCESS':
        return {
          ...state,
          profile: action.payload,
          error: null,
        };
      case 'PROFILE_FAILURE':
        return {
          ...state,
          profile: null,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default profileReducer;