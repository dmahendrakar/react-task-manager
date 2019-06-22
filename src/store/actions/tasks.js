import * as actionTypes from '../actions/actionTypes';

export const fetchTasks = () => {
    return {
        type: actionTypes.FETCH_TASKS
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

export const updateTask = tasks => {
    return {
        type: actionTypes.UPDATE_TASK,
        tasks
    };
};

export const updateTaskStart = () => {
    return {
        type: actionTypes.UPDATE_TASK_START
    };
};

export const updateTaskSucceeded = () => {
    return {
        type: actionTypes.UPDATE_TASK_SUCCEEDED
    };
};

export const updateTaskFailed = error => {
    return {
        type: actionTypes.UPDATE_TASK_FAILED,
        error
    };
};

export const createTask = task => {
    return {
        type: actionTypes.CREATE_TASK,
        task
    };
};

export const createTaskStart = () => {
    return {
        type: actionTypes.CREATE_TASK_START
    };
};

export const createTaskSucceeded = () => {
    return {
        type: actionTypes.CREATE_TASK_SUCCEEDED
    };
};

export const createTaskFailed = error => {
    return {
        type: actionTypes.CREATE_TASK_FAILED,
        error
    };
};

export const deleteTask = task => {
    return {
        type: actionTypes.DELETE_TASK,
        task
    };
};

export const deleteTaskStart = () => {
    return {
        type: actionTypes.DELETE_TASK_START
    };
};

export const deleteTaskSucceeded = () => {
    return {
        type: actionTypes.DELETE_TASK_SUCCEEDED
    };
};

export const deleteTaskFailed = error => {
    return {
        type: actionTypes.DELETE_TASK_FAILED,
        error
    };
};

// Add or replace task
export const initTasks = tasks => {
    return {
        type: actionTypes.INIT_TASKS,
        tasks
    };
};

// Add or replace task
export const setTask = task => {
    return {
        type: actionTypes.SET_TASK,
        task
    };
};

export const removeTask = task => {
    return {
        type: actionTypes.REMOVE_TASK,
        task
    };
};