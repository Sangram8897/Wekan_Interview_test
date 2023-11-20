
export const profileRequest = (uid, data) => ({
  type: 'PROFILE_REQUEST',
  payload: { uid: uid, data: data },
});

export const profileSuccess = (profile) => ({
  type: 'PROFILE_SUCCESS',
  payload: profile,
});

export const profileFailure = (error) => ({
  type: 'PROFILE_FAILURE',
  payload: error,
});