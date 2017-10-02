
import * as types from '../actions/actions/actionTypes';

export default function appUserBibleReadingNamesReducer(state = [], action){
    let new_state = []
    //new_state = JSON.parse(JSON.stringify(state));

    switch (action.type){

        case types.SAVE_APP_USER_BIBLE_READINGS_NAMES:

            new_state = action.appUserBibleReadingNames

            return new_state;

        default:
            return state;

    }
}