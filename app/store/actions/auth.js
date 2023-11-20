
import { put, call, takeLatest } from 'redux-saga/effects';
import { loginSuccess, loginFailure, logoutSuccess, logoutFailure } from '../constants/authActions';
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { profileSuccess } from '../constants/profileActions';

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

      const documentRef = firestore().collection('profiles').doc(currentUser.uid);
      const documentSnapshot = yield call([documentRef, documentRef.get]);

      if (documentSnapshot.exists) {
        let data_ = documentSnapshot.data()
        yield put(profileSuccess(data_));
        //   RootNavigation.replace('Dashboard')
      } else {
        //  RootNavigation.replace('CreateProfile')
      }
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* logoutUser() {
  try {
    yield call([auth(), auth().signOut]);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error.message));
  }
}

export function* watchAuth() {
  yield takeLatest('LOGIN_REQUEST', loginUser);
  yield takeLatest('LOGOUT_REQUEST', logoutUser);
}