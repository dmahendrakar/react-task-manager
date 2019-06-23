import {all, takeEvery} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
    initTasksSaga,
    createTaskSaga,
    updateTaskSaga,
    bulkUpdateTasksSaga,
    deleteTasksSaga
} from './tasks';

export function* watchTasks() {
    yield takeEvery(actionTypes.FETCH_TASKS, initTasksSaga);
    yield takeEvery(actionTypes.CREATE_TASK, createTaskSaga);
    yield takeEvery(actionTypes.UPDATE_TASK, updateTaskSaga);
    yield takeEvery(actionTypes.BULK_UPDATE_TASKS, bulkUpdateTasksSaga);
    yield takeEvery(actionTypes.DELETE_TASKS, deleteTasksSaga);
}

export default function* rootSaga() {
    yield all(
        [
            watchTasks()
        ]
    );
}