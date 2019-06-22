import {all, takeEvery, debounce} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
    initTasksSaga,
    saveTasksSaga
} from './tasks';

export function* watchTasks() {
    yield takeEvery(actionTypes.INIT_TASKS, initTasksSaga);
    // yield debounce(2000, actionTypes.SAVE_TASKS, saveTasksSaga);
}

export default function* rootSaga() {
    yield all(
        [
            watchTasks()
        ]
    );
}