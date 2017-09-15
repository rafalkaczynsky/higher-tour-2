import * as types from '../actions/actions/actionTypes';

export default function coordsReducer(state = {}, action){
    let new_state = {};
   // new_state = JSON.parse(JSON.stringify(state));

    switch (action.type){

        case types.SAVE_COORDS:
            new_state = action.coords
            return new_state;

        default:
            return state;

    }
}