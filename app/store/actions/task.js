
import { put, call, all, takeLatest } from 'redux-saga/effects';
import { loginSuccess, loginFailure, logoutSuccess, logoutFailure } from '../constants/authActions';
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { profileSuccess } from '../constants/profileActions';
import { addTaskSuccess, deleteTaskSuccess, editTaskSuccess, tasksListSuccess } from '../constants/tasksActions';

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


export function* watchTask() {
    yield takeLatest('TASK_LIST_REQUEST', getTaskList);
    yield takeLatest('ADD_TASK_REQUEST', addTask);
    yield takeLatest('EDIT_TASK_REQUEST', editTask);
    yield takeLatest('DELETE_TASK_REQUEST', deleteTask);
}