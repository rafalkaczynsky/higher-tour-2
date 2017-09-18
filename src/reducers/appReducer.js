import * as types from '../actions/actions/actionTypes';

initialState = {
    loginStatus: '',
    activeTabName: ''
}

export default function appReducer(state = initialState, action){
    let new_state 
    new_state = JSON.parse(JSON.stringify(state));

    switch (action.type){

        case types.UPDATE_LOGGIN_STATUS:

            new_state = {
                
                loginStatus: action.loginStatus,
                activeTabName: state.activeTabName,
            }

            return new_state;

        case types.UPDATE_ACTIVE_TAB_NAME:
            
            new_state = {
                    loginStatus: state.loginStatus,
                    activeTabName: action.activeTabName
            }
            
                        return new_state;

        default:
            return state;

    }
}