import * as types from '../actions/actions/actionTypes';

export default function appUserReducer(state = {}, action){
    let new_state = {};
   // new_state = JSON.parse(JSON.stringify(state));

    switch (action.type){

        case types.SAVE_APP_USER:
            new_state = action.appUserData
            
            return new_state;

        case types.UPDATE_APP_USER:
            
            new_state = {
                email: action.email,
                name: action.displayName,
                event: {
                  follow: action.follow,
                  id: action.eventId
                },
                uid: action.uid,
                FCMtoken: action.FCMtoken,
            }
            
        return new_state;

        default:
            return state;

    }
}