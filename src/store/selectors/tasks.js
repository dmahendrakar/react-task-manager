import {createSelector} from 'reselect';
import {
    sortBy as _sortBy,
    groupBy as _groupBy,
} from 'underscore';

export const getTasks = state => state.tasks.tasks;

export const getTaskList = createSelector(
    getTasks,
    tasks => {
        const sortedTasks = _sortBy(Object.values(tasks), 'creationTime')
        const taskGroups = _groupBy(sortedTasks, 'status')

        const pendingTasks = taskGroups['PENDING'];
        const completedTasks = taskGroups['COMPLETED'];

        return [
            ...pendingTasks ? pendingTasks : [], 
            ...completedTasks ? completedTasks : []
        ]
    }
);

export const getOperationInProgress = state => state.tasks.operationInProgress;
export const getIsTasksSet = state => state.tasks.isSet;