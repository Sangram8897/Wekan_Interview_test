
import { takeLatest, put, call, all } from 'redux-saga/effects';
import { loginSuccess, loginFailure, logoutSuccess, logoutFailure } from './authActions';
//import * as authService from '../services/authService'; // Your authentication service
import auth from "@react-native-firebase/auth";
import * as RootNavigation from '../../root/navigation/root_navigation';

function* loginUser(action) {
  try {
    const { username, password } = action.payload;
    yield call([auth(), auth().signInWithEmailAndPassword], username, password)
    const currentUser = auth().currentUser;
    if (currentUser) {
      const userData = {
        displayName: currentUser.displayName,
        email: currentUser.email,
        emailVerified: currentUser.emailVerified,
        uid: currentUser.uid
      };
      yield put(loginSuccess(userData));
      RootNavigation.navigate('Dashboard')
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* logoutUser() {
  try {
    // yield call(authService.logout);
    // yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error.message));
  }
}

function* watchAuth() {
  yield takeLatest('LOGIN_REQUEST', loginUser);
  // yield takeLatest('LOGOUT_REQUEST', logoutUser);
}

export function* watcherSaga() {
  yield all([
    watchAuth(),
    // Add other sagas here
  ]);
  //yield takeLatest(getConsents.type, handleGetConsent)
  //yield takeEvery(getCommonPropertySuggest.type, handleCommonPropertySuggest)
}
