import * as types from '../actions/actions/actionTypes';

export default function userReducer(state = [], action){
    let new_state = []
    //new_state = JSON.parse(JSON.stringify(state));

    switch (action.type){

        case types.SAVE_CHURCHES:

            new_state = action.churches

            return new_state;

        default:
            return state;

    }
}