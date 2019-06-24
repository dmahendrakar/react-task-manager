import {put} from 'redux-saga/effects';
import {
    pluck as _pluck
} from 'underscore';
import { toast } from 'react-toastify';

import axios from '../../shared/axios';
import * as actions from '../actions';
import {updateObject} from '../../shared/utility';

function toastSuccess(message) {
    toast(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
}

function toastError(message) {
    toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
}

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
        toastSuccess('Task created')
    } catch (error) {
        console.error('[TaskManagerWidget] error', error);
        yield put(actions.createTaskFailed(error));
        toastError('Task create failed')
    }
}

export function* updateTaskSaga(action) {
    try {
        yield put(actions.updateTaskStart());

        const {task} = action;        
        yield axios.put('/', task);
        yield put(actions.setTask(task));

        yield put(actions.updateTaskSucceeded());
        toastSuccess('Task updated')
    } catch (error) {
        console.error('[TaskManagerWidget] error', error);
        yield put(actions.updateTaskFailed(error));
        toastError('Task update failed')
    }
}

export function* bulkUpdateTasksSaga(action) {
    try {
        yield put(actions.bulkUpdateTasksStart());

        const {tasks} = action;        
        yield axios.put('/bulk', tasks);
        yield put(actions.setTasks(tasks));

        yield put(actions.bulkUpdateTasksSucceeded());
        toastSuccess('Tasks updated')
    } catch (error) {
        console.error('[TaskManagerWidget] error', error);
        yield put(actions.bulkUpdateTasksFailed(error));
        toastError('Tasks update failed')
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
        toastSuccess('Tasks removed')
    } catch (error) {
        console.error('[TaskManagerWidget] error', error);
        yield put(actions.deleteTasksFailed(error));
        toastError('Tasks removal failed')
    }
}