export const loginRequest = (email, password, uuid) => ({
  type: "LOGIN_REQUEST",
  payload: { email, password, uuid },
});

export const loginSuccess = (currentUser) => ({
  type: "LOGIN_SUCCESS",
  payload: currentUser,
});

export const loginFailure = (errorMessage) => ({
  type: "LOGIN_FAILURE",
  payload: errorMessage,
});
export const logoutRequest = (currentUser) => ({
  type: "LOGOUT_REQUEST",
  payload: currentUser,
});

export const logoutSuccess = (currentUser) => ({
  type: "LOGOUT_SUCCESS",
  payload: currentUser,
});
export const logoutFailure = (errorMessage) => ({
  type: "LOGOUT_Failure",
  payload: errorMessage,
});
