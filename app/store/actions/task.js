
import { put, call, takeLatest } from 'redux-saga/effects';
import firestore from '@react-native-firebase/firestore';
import { addTaskFailure, addTaskSuccess, deleteTaskSuccess, editTaskSuccess, tasksListSuccess } from '../constants/tasksActions';

function* addTask(action) {
    try {
        const data = action.payload;

        yield call([firestore().collection('tasks'),
        firestore().collection('tasks').add], data);

        yield put(addTaskSuccess());
    } catch (error) {
        yield put(addTaskFailure(error.message));
    }
}

function* editTask(action) {
    try {
        const { uid, data } = action.payload;

        const documentRef = firestore().collection('tasks').doc(uid);

        yield call([documentRef, documentRef.update], data);
        yield put(editTaskSuccess());
    } catch (error) {
        yield put(addTaskFailure(error.message));
    }
}
function* deleteTask(action) {
    try {
        const uid = action.payload;

        const documentRef = firestore().collection('tasks').doc(uid);

        yield call([documentRef, documentRef.delete]);
        yield put(deleteTaskSuccess());

    } catch (error) {
        yield put(addTaskFailure(error.message));
    }
}

function* getTaskList(action) {
    try {
        const uid = action.payload;

        const querySnapshot = yield call([firestore().collection('tasks').where('uid', '==', uid),
        firestore().collection('tasks').where('uid', '==', 18).get]);

        const dataList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        if (dataList) {
            yield put(tasksListSuccess(dataList))
        }
    } catch (error) {
        yield put(addTaskFailure(error.message));
    }
}


export function* watchTask() {
    yield takeLatest('TASK_LIST_REQUEST', getTaskList);
    yield takeLatest('ADD_TASK_REQUEST', addTask);
    yield takeLatest('EDIT_TASK_REQUEST', editTask);
    yield takeLatest('DELETE_TASK_REQUEST', deleteTask);
}