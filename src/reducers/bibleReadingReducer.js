import * as types from '../actions/actions/actionTypes';

export default function bibleReadingReducer(state = [], action){
    let new_state = []
    //new_state = JSON.parse(JSON.stringify(state));

    switch (action.type){

        case types.SAVE_BIBLE_READING:

            new_state = action.bibleReading

            return new_state;

        default:
            return state;

    }
}