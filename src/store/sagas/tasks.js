import {put, select} from 'redux-saga/effects';

import axios from '../../shared/axios';
import * as actions from '../actions';
import {hasOwnProperty} from '../../shared/utility';

export function* initTasksSaga(action) {
    try {
        yield put(actions.fetchTasksStart());

        const response = yield axios.get();
        yield put(actions.setTasks(response.data));

        yield put(actions.fetchTasksSucceeded());
    } catch (error) {
        console.error('[TasksWidget] error', error);
        yield put(actions.fetchTasksFailed(error));
    }
}