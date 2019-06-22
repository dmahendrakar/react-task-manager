import {all, takeEvery} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
    initTasksSaga,
    createTasksSaga,
    updateTaskSaga,
    deleteTaskSaga
} from './tasks';

export function* watchTasks() {
    yield takeEvery(actionTypes.FETCH_TASKS, initTasksSaga);
    yield takeEvery(actionTypes.CREATE_TASK, createTasksSaga);
    // yield takeEvery(actionTypes.UPDATE_TASK, updateTaskSaga);
    // yield takeEvery(actionTypes.DELETE_TASK, deleteTaskSaga);
}

export default function* rootSaga() {
    yield all(
        [
            watchTasks()
        ]
    );
}