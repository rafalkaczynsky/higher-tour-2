import * as types from '../actions/actions/actionTypes';

export default function aaaSessionReducer(state = [], action){
    let new_state = []
  //  new_state = JSON.parse(JSON.stringify(state));

    switch (action.type){

        case types.SAVE_AAA_SESSION:

            new_state = action.aaaSession

            return new_state;

        default:
            return state;

    }
}