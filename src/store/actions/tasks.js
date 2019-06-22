import * as actionTypes from '../actions/actionTypes';

export const initTasks = () => {
    return {
        type: actionTypes.INIT_TASKS
    };
};

export const setTasks = tasks => {
    return {
        type: actionTypes.SET_TASKS,
        tasks
    };
};

export const fetchTasksStart = () => {
    return {
        type: actionTypes.FETCH_TASKS_START
    };
};

export const fetchTasksSucceeded = () => {
    return {
        type: actionTypes.FETCH_TASKS_SUCCEEDED
    };
};

export const fetchTasksFailed = error => {
    return {
        type: actionTypes.FETCH_TASKS_FAILED,
        error
    };
};

export const saveTasks = tasks => {
    return {
        type: actionTypes.SAVE_TASKS,
        tasks
    };
};

export const saveTasksStart = () => {
    return {
        type: actionTypes.SAVE_TASKS_START
    };
};

export const saveTasksSucceeded = () => {
    return {
        type: actionTypes.SAVE_TASKS_SUCCEEDED
    };
};

export const saveTasksFailed = error => {
    return {
        type: actionTypes.SAVE_TASKS_FAILED,
        error
    };
};