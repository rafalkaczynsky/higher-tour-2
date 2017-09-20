import * as types from '../actions/actions/actionTypes';

export default function sessionsReducer(state = {}, action){
    let new_state = [];
 //   new_state = JSON.parse(JSON.stringify(state));

    switch (action.type){

        case types.SAVE_SESSIONS:
            new_state = action.sessions
            return new_state;

        default:
            return state;

    }
}