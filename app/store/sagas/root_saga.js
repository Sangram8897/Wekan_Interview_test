
import { takeLatest, put, call, all } from 'redux-saga/effects';
import { loginSuccess, loginFailure, logoutSuccess, logoutFailure } from './authActions';
//import * as authService from '../services/authService'; // Your authentication service
import auth from "@react-native-firebase/auth";
import * as RootNavigation from '../../root/navigation/root_navigation';
import firestore from '@react-native-firebase/firestore';
import { profileSuccess } from './profileActions';
import { addTaskSuccess, deleteTaskSuccess, editTaskSuccess, tasksListSuccess } from './tasksActions';

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
        console.log('documentSnapshot', documentSnapshot.data());
        let data_ = documentSnapshot.data()
        yield put(profileSuccess(data_));
       // RootNavigation.navigate('Dashboard')
      } else {
       // RootNavigation.navigate('CreateProfile')
      }
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}


function* createUserProfile(action) {
  try {
    const { uid, data } = action.payload;
    try {
      //const documentSnapshot = yield call([firestore(), firestore().collection('profiles').doc(uid).set(data)]);
      yield call([firestore().collection('profiles').doc(uid),
      firestore().collection('profiles').doc(uid).set], data);

      const documentRef = firestore().collection('profiles').doc(uid);
      const documentSnapshot = yield call([documentRef, documentRef.get]);
      if (documentSnapshot.exists) {
        console.log('documentSnapshot 9999999', documentSnapshot.data());
        let data_ = documentSnapshot.data()
        yield put(profileSuccess(data_));
        RootNavigation.navigate('Dashboard')
      }
    } catch (error) {
      console.log('documentSnapshot error', error);
      // yield put(loginFailure(error.message));
    }
  } catch (error) {
    console.log('ui error', error);
    // yield put(loginFailure(error.message));
  }
}

function* addTask(action) {
  try {
    const data = action.payload;

    yield call([firestore().collection('tasks'),
    firestore().collection('tasks').add], data);
    yield put(addTaskSuccess());
  } catch (error) {
    console.log('ui error', error);
    // yield put(loginFailure(error.message));
  }
}

function* editTask(action) {
  try {
    const { uid, data } = action.payload;
    console.log('uid, data', uid, data);
    const documentRef = firestore().collection('tasks').doc(uid);
    yield call([documentRef, documentRef.update], data);
    console.log('uid, data item edited',);
    yield put(editTaskSuccess());
  } catch (error) {
    console.log('ui error', error);
    // yield put(loginFailure(error.message));
  }
}
function* deleteTask(action) {
  try {
    const uid = action.payload;
    console.log('uid, data', uid);
    const documentRef = firestore().collection('tasks').doc(uid);
    yield call([documentRef, documentRef.delete]);
    yield put(deleteTaskSuccess());
  } catch (error) {
    console.log('ui error', error);
    // yield put(loginFailure(error.message));
  }
}

function* getTaskList(action) {
  try {
    const data = action.payload;
    const querySnapshot = yield call([firestore().collection('tasks'),
    firestore().collection('tasks').get]);

    const dataList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (dataList) {
      yield put(tasksListSuccess(dataList))
    }
    console.log('data555', dataList);

    // yield call([firestore().collection('tasks'),
    // firestore().collection('tasks').add], data);
    // yield put(addTaskSuccess());
  } catch (error) {
    console.log('ui error', error);
    // yield put(loginFailure(error.message));
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

function* watchAuth() {
  yield takeLatest('LOGIN_REQUEST', loginUser);
  yield takeLatest('PROFILE_REQUEST', createUserProfile);

  yield takeLatest('TASK_LIST_REQUEST', getTaskList);
  yield takeLatest('ADD_TASK_REQUEST', addTask);
  yield takeLatest('EDIT_TASK_REQUEST', editTask);
  yield takeLatest('DELETE_TASK_REQUEST', deleteTask);
  yield takeLatest('LOGOUT_REQUEST', logoutUser);
}

export function* watcherSaga() {
  yield all([
    watchAuth(),
    // Add other sagas here
  ]);
  //yield takeLatest(getConsents.type, handleGetConsent)
  //yield takeEvery(getCommonPropertySuggest.type, handleCommonPropertySuggest)
}
