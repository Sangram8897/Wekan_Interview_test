
import { put, call, all, takeLatest } from 'redux-saga/effects';
import firestore from '@react-native-firebase/firestore';
import { profileSuccess } from '../constants/profileActions';

function* createUserProfile(action) {
  try {
    const { uid, data } = action.payload;

    yield call([firestore().collection('profiles').doc(uid),
    firestore().collection('profiles').doc(uid).set], data);

    const documentRef = firestore().collection('profiles').doc(uid);
    const documentSnapshot = yield call([documentRef, documentRef.get]);

    if (documentSnapshot.exists) {
      let data_ = documentSnapshot.data()
      yield put(profileSuccess(data_));
      RootNavigation.navigate('Dashboard')
    }
    
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}


export function* watchProfile() {
  yield takeLatest('PROFILE_REQUEST', createUserProfile);
}