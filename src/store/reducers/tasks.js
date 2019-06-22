import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    list: [],
    isSet: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.SET_TASKS: {
        return updateObject(state, {
            list: action.tasks,
            isSet: true
        });
    }
    default:
        return state;
    }
};

export default reducer;