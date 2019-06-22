import {combineReducers} from 'redux';

import tasksReducer from '../reducers/tasks';

const rootReducer = combineReducers({
    tasks: tasksReducer
});

export default rootReducer;