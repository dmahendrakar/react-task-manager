import {put} from 'redux-saga/effects';
import {
    pluck as _pluck
} from 'underscore';

import axios from '../../shared/axios';
import * as actions from '../actions';
import {updateObject} from '../../shared/utility';

export function* initTasksSaga(action) {
    try {
        yield put(actions.fetchTasksStart());

        const response = yield axios.get('/');
        yield put(actions.initTasks(response.data));

        yield put(actions.fetchTasksSucceeded());
    } catch (error) {
        console.error('[TaskManagerWidget] error', error);
        yield put(actions.fetchTasksFailed(error));
    }
}

export function* createTaskSaga(action) {
    try {
        yield put(actions.createTaskStart());

        const {task} = action;        
        const response = yield axios.post('/', task);
        const {id} = response.data;
        yield put(actions.setTask(updateObject(task, {id: id})));

        yield put(actions.createTaskSucceeded());
    } catch (error) {
        console.error('[TaskManagerWidget] error', error);
        yield put(actions.createTaskFailed(error));
    }
}

export function* updateTaskSaga(action) {
    try {
        yield put(actions.updateTaskStart());

        const {task} = action;        
        yield axios.put('/', task);
        yield put(actions.setTask(task));

        yield put(actions.updateTaskSucceeded());
    } catch (error) {
        console.error('[TaskManagerWidget] error', error);
        yield put(actions.updateTaskFailed(error));
    }
}

export function* deleteTasksSaga(action) {
    try {
        yield put(actions.deleteTasksStart());

        const {tasks} = action;        
        yield axios.delete('/bulk', {data: _pluck(tasks, 'id').map(id => {
            return {id};
        })});
        yield put(actions.removeTasks(tasks));

        yield put(actions.deleteTasksSucceeded());
    } catch (error) {
        console.error('[TaskManagerWidget] error', error);
        yield put(actions.deleteTasksFailed(error));
    }
}