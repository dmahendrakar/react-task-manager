import {createSelector} from 'reselect';
import {sortBy as _sortBy} from 'underscore';

export const getTasks = state => state.tasks.tasks;

export const getTaskList = createSelector(
    getTasks,
    tasks => _sortBy(Object.values(tasks), 'creationTime')
);

export const getOperationInProgress = state => state.tasks.operationInProgress;
export const getIsTasksSet = state => state.tasks.isSet;