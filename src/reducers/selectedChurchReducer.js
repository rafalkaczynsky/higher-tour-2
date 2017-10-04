import * as types from '../actions/actions/actionTypes';

export default function selectedChurchReducer(state = {}, action){
    let new_state = {};
   // new_state = JSON.parse(JSON.stringify(state));

    switch (action.type){

        case types.SAVE_SELECTED_CHURCH:
            new_state = action.selectedChurch
            
            return new_state;

        default:
            return state;

    }
}