import {put, select} from 'redux-saga/effects';

import axios from '../../shared/axios';
import * as actions from '../actions';
import {hasOwnProperty, updateObject} from '../../shared/utility';

export function* initTasksSaga(action) {
    try {
        yield put(actions.fetchTasksStart());

        const response = yield axios.get('/qa');
        yield put(actions.initTasks(response.data));

        yield put(actions.fetchTasksSucceeded());
    } catch (error) {
        console.error('[TasksWidget] error', error);
        yield put(actions.fetchTasksFailed(error));
    }
}

export function* createTasksSaga(action) {
    try {
        yield put(actions.createTaskStart());

        const {task} = action;        
        const response = yield axios.post('/qa', task);
        const {id} = response.data;
        yield put(actions.setTask(updateObject(task, {id: id})));

        yield put(actions.createTaskSucceeded());
    } catch (error) {
        console.error('[TasksWidget] error', error);
        yield put(actions.createTaskFailed(error));
    }
}