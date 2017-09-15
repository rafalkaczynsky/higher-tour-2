import * as types from '../actions/actions/actionTypes';

export default function eventsReducer(state = {}, action){
    let new_state = [];
 //   new_state = JSON.parse(JSON.stringify(state));

    switch (action.type){

        case types.SAVE_EVENTS:
            new_state = action.events
            return new_state;

        default:
            return state;

    }
}