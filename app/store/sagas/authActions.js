
export const loginRequest = (username, password) => ({
    type: 'LOGIN_REQUEST',
    payload: { username, password },
  });
  
  export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
  });
  
  export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
  });
  
  export const logoutRequest = () => ({
    type: 'LOGOUT_REQUEST',
  });
  
  export const logoutSuccess = () => ({
    type: 'LOGOUT_SUCCESS',
  });
  
  export const logoutFailure = (error) => ({
    type: 'LOGOUT_FAILURE',
    payload: error,
  });