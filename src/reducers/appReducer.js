import * as types from '../actions/actions/actionTypes';

initialState = {
    loginStatus: '',
    activeTabName: '',
    showLogginContent: false,
    followStatus: false,
}

export default function appReducer(state = initialState, action){
    let new_state 
    new_state = JSON.parse(JSON.stringify(state));

    switch (action.type){

        case types.UPDATE_LOGGIN_STATUS:

            new_state = {
                
                loginStatus: action.loginStatus,
                activeTabName: state.activeTabName,
                showLogginContent: state.showLogginContent,
                followStatus: state.followStatus
            }

            return new_state;

        case types.UPDATE_ACTIVE_TAB_NAME:
            
            new_state = {
                    loginStatus: state.loginStatus,
                    activeTabName: action.activeTabName,
                    showLogginContent: state.showLogginContent,
                    followStatus: state.followStatus,
            }
            
            return new_state;

        case types.UPDATE_SHOW_LOGGIN_CONTENT:
            
            new_state = {
                    loginStatus: state.loginStatus,
                    activeTabName: state.activeTabName,
                    followStatus: state.followStatus,
                    showLogginContent: action.showLogginContent
            }
            
            return new_state;

        case types.UPDATE_FOLLOW_STATUS:
            
            new_state = {
                    loginStatus: state.loginStatus,
                    activeTabName: state.activeTabName,
                    showLogginContent: state.showLogginContent,
                    followStatus: action.followStatus
            }
            
            return new_state;
            
        default:
            return state;

    }
}