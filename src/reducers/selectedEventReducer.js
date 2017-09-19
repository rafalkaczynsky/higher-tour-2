import * as types from '../actions/actions/actionTypes';

export default function selectedEventReducer(state = {}, action){
    let new_state = {};
   // new_state = JSON.parse(JSON.stringify(state));

    switch (action.type){

        case types.SAVE_SELECTED_EVENT:
            new_state = action.selectedEvent
            
            return new_state;

        default:
            return state;

    }
}