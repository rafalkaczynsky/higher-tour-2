import * as types from '../actions/actions/actionTypes';

export default function bibleReadingNamesReducer(state = [], action){
    let new_state = []
    //new_state = JSON.parse(JSON.stringify(state));

    switch (action.type){

        case types.SAVE_BIBLE_READING_NAMES:

            new_state = action.bibleReadingNames

            return new_state;

        default:
            return state;

    }
}