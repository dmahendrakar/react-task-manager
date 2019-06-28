import reducer from './tasks';
import * as actionTypes from '../actions/actionTypes';

describe('tasks reducer', () => {
    it('should init tasks', () => {
        expect(reducer({
            tasks: {},
            isSet: false
        }, {
            type: actionTypes.INIT_TASKS,
            tasks: [
                {id: 'task1', title: 'title1'},
                {id: 'task2', title: 'title2'}
            ]
        })).toEqual({
            tasks: {
                task1: {id: 'task1', title: 'title1'},
                task2: {id: 'task2', title: 'title2'},
            },
            isSet: true
        });
    });
    it('should set task', () => {
        expect(reducer({
            tasks: {
                task1: {id: 'task1', title: 'title1'}
            }
        }, {
            type: actionTypes.SET_TASK,
            task: {id: 'task2', title: 'title2'}
        })).toEqual({
            tasks: {
                task1: {id: 'task1', title: 'title1'},
                task2: {id: 'task2', title: 'title2'},
            }
        });
    });
    it('should update task on set task', () => {
        expect(reducer({
            tasks: {
                task1: {id: 'task1', title: 'title1'}
            }
        }, {
            type: actionTypes.SET_TASK,
            task: {id: 'task1', title: 'title2'}
        })).toEqual({
            tasks: {
                task1: {id: 'task1', title: 'title2'}
            }
        });
    });
    it('should update task in bulk on set tasks', () => {
        expect(reducer({
            tasks: {
                task1: {id: 'task1', title: 'title1'},
                task2: {id: 'task2', title: 'title2'},
            }
        }, {
            type: actionTypes.SET_TASKS,
            tasks: [
                {id: 'task1', title: 'title1 updated'},
                {id: 'task2', title: 'title2 updated'}
            ]
        })).toEqual({
            tasks: {
                task1: {id: 'task1', title: 'title1 updated'},
                task2: {id: 'task2', title: 'title2 updated'},
            }
        });
    });
    it('should set operationInProgress', () => {
        expect(reducer({
            operationInProgress: false
        }, {
            type: actionTypes.FETCH_TASKS_START
        })).toEqual({
            operationInProgress: true
        });
    });
    it('should set operationInProgress', () => {
        expect(reducer({
            operationInProgress: true
        }, {
            type: actionTypes.FETCH_TASKS_SUCCEEDED
        })).toEqual({
            operationInProgress: false
        });
    });
});