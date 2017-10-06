import * as types from '../actions/actions/actionTypes';

export default function formReducer2(state = {}, action){
    let new_state = {};

    switch (action.type){

        case types.DELETE_FORM_DATA:
            new_state = {}
            return new_state;

        default:
            return state;

    }
}