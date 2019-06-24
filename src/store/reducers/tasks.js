import {
    difference as _difference
} from 'underscore';

import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    tasks: {},
    isSet: false,
    operationInProgress: false
};

export const makeTaskIdMap = (tasks) => {
    const tasksMap = {};
    tasks.forEach(task => {
        tasksMap[task.id] = task;
    });

    return tasksMap;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.INIT_TASKS: {
        return updateObject(state, {
            tasks: makeTaskIdMap(action.tasks),
            isSet: true
        });
    }
    case actionTypes.SET_TASK: {
        const {task} = action;
        return updateObject(state, {
            tasks: updateObject(state.tasks, {
                [task.id]: task
            })
        });
    }
    case actionTypes.SET_TASKS: {
        const {tasks} = action;

        const updatedTasks = Object.assign({}, state.tasks);
        tasks.forEach(task => updatedTasks[task.id] = task);
        
        return updateObject(state, {
            tasks: updateObject(state.tasks, updatedTasks)
        });
    }
    case actionTypes.REMOVE_TASKS: {
        const {tasks} = action;

        return updateObject(state, {
            tasks: _difference(state.tasks, tasks)
        });
    }
    case actionTypes.FETCH_TASKS_START:
    case actionTypes.CREATE_TASK_START:
    case actionTypes.UPDATE_TASK_START:
    case actionTypes.BULK_UPDATE_TASKS_START:
    case actionTypes.DELETE_TASKS_START:
    {
        return updateObject(state, {
            operationInProgress: true
        });
    }
    case actionTypes.FETCH_TASKS_SUCCEEDED:
    case actionTypes.FETCH_TASKS_FAILED:
    case actionTypes.CREATE_TASK_SUCCEEDED:
    case actionTypes.CREATE_TASK_FAILED:
    case actionTypes.UPDATE_TASK_SUCCEEDED:
    case actionTypes.UPDATE_TASK_FAILED:
    case actionTypes.BULK_UPDATE_TASKS_SUCCEEDED:
    case actionTypes.BULK_UPDATE_TASKS_FAILED:
    case actionTypes.DELETE_TASKS_SUCCEEDED:
    case actionTypes.DELETE_TASKS_FAILED:
    {
        return updateObject(state, {
            operationInProgress: false
        });
    }
    default:
        return state;
    }
};

export default reducer;