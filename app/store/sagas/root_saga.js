
import {  all } from 'redux-saga/effects';

import {  watchAuth } from '../actions/auth';
import { watchProfile } from '../actions/profile';
import { watchTask } from '../actions/task';


export function* watcherSaga() {
  yield all([
    watchAuth(),
    watchProfile(),
    watchTask(),
    // Add other sagas here
  ]);
}
