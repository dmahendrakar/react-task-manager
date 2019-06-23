import {
    difference as _difference
} from 'underscore';

import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    tasks: {},
    isSet: false
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
    case actionTypes.REMOVE_TASKS: {
        const {tasks} = action;

        return updateObject(state, {
            tasks: _difference(state.tasks, tasks)
        });
    }
    default:
        return state;
    }
};

export default reducer;