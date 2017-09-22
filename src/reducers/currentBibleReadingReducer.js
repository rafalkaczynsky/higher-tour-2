import * as types from '../actions/actions/actionTypes';

export default function currentBibleReadingReducer(state = {}, action){
    let new_state = {}
    new_state = JSON.parse(JSON.stringify(state));

    switch (action.type){

        case types.SAVE_CURRENT_READING_ITEM:

            new_state = action.currentBibleReading

            return new_state;

        default:
            return state;

    }
}