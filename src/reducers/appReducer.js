import * as types from '../actions/actions/actionTypes';

initialState = {
    loginStatus: '',
    activeTabName: '',
    showLogginContent: false,
    followStatus: false,
    showUserProfileContent: false,
    bibleReadingScreenStatus: 'list',
    currentDayContent: null,
    currentReadingDayNumber: null,
    currentBibleReadingTitle: null,
    lastReadDayNumber: 0,
}

export default function appReducer(state = initialState, action){
    let new_state 
    new_state = JSON.parse(JSON.stringify(state));

    switch (action.type){


        //CLEAR_APP
        case types.CLEAR_APP:
        
                    new_state = {}
        
                    return new_state;

        case types.UPDATE_LOGGIN_STATUS:

            new_state = {
                
                loginStatus: action.loginStatus,
                activeTabName: state.activeTabName,
                showLogginContent: state.showLogginContent,
                followStatus: state.followStatus,
                showUserProfileContent: state.showUserProfileContent,
                bibleReadingScreenStatus: state.bibleReadingScreenStatus,
                currentDayContent: state.currentDayContent,
                currentReadingDayNumber: state.currentReadingDayNumber,
                currentBibleReadingTitle: state.currentBibleReadingTitle,
                lastReadDayNumber: state.lastReadDayNumber,
            }

            return new_state;

        case types.UPDATE_ACTIVE_TAB_NAME:
            
            new_state = {
                    loginStatus: state.loginStatus,
                    activeTabName: action.activeTabName,
                    showLogginContent: state.showLogginContent,
                    followStatus: state.followStatus,
                    showUserProfileContent: state.showUserProfileContent,
                    bibleReadingScreenStatus: state.bibleReadingScreenStatus,
                    currentDayContent: state.currentDayContent,
                    currentReadingDayNumber: state.currentReadingDayNumber,
                    currentBibleReadingTitle: state.currentBibleReadingTitle,
                    lastReadDayNumber: state.lastReadDayNumber,
            }
            
            return new_state;

        case types.UPDATE_SHOW_LOGGIN_CONTENT:
            
            new_state = {
                    loginStatus: state.loginStatus,
                    activeTabName: state.activeTabName,
                    followStatus: state.followStatus,
                    showLogginContent: action.showLogginContent,
                    showUserProfileContent: state.showUserProfileContent,
                    bibleReadingScreenStatus: state.bibleReadingScreenStatus,
                    currentDayContent: state.currentDayContent,
                    currentReadingDayNumber: state.currentReadingDayNumber,
                    currentBibleReadingTitle: state.currentBibleReadingTitle,
                    lastReadDayNumber: state.lastReadDayNumber,
            }
            
            return new_state;  


        case types.UPDATE_SHOW_USERPROFILE_CONTENT:
        
        new_state = {
                loginStatus: state.loginStatus,
                activeTabName: state.activeTabName,
                followStatus: state.followStatus,
                showLogginContent: state.showLogginContent,
                showUserProfileContent: action.showUserProfileContent,
                bibleReadingScreenStatus: state.bibleReadingScreenStatus,
                currentDayContent: state.currentDayContent,
                currentReadingDayNumber: state.currentReadingDayNumber,
                currentBibleReadingTitle: state.currentBibleReadingTitle,
                lastReadDayNumber: state.lastReadDayNumber,
        }
        
        return new_state;  

        case types.UPDATE_FOLLOW_STATUS:
            
            new_state = {
                    loginStatus: state.loginStatus,
                    activeTabName: state.activeTabName,
                    showLogginContent: state.showLogginContent,
                    followStatus: action.followStatus,
                    showUserProfileContent: state.showUserProfileContent,
                    bibleReadingScreenStatus: state.bibleReadingScreenStatus,
                    currentDayContent: state.currentDayContent,
                    currentReadingDayNumber: state.currentReadingDayNumber,
                    currentBibleReadingTitle: state.currentBibleReadingTitle,
                    lastReadDayNumber: state.lastReadDayNumber,
            }
            
            return new_state;

            case types.UPDATE_BIBLE_READING_SCREEN:
            
            new_state = {
                    loginStatus: state.loginStatus,
                    activeTabName: state.activeTabName,
                    showLogginContent: state.showLogginContent,
                    followStatus: state.followStatus,
                    showUserProfileContent: state.showUserProfileContent,
                    bibleReadingScreenStatus: action.bibleReadingScreenStatus,
                    currentDayContent: state.currentDayContent,
                    currentReadingDayNumber: state.currentReadingDayNumber,
                    currentBibleReadingTitle: state.currentBibleReadingTitle,
                    lastReadDayNumber: state.lastReadDayNumber,
            }
            
            return new_state;

            case types.UPDATE_CURRENT_BIBLE_READING_DAY_CONTENT:
            
            new_state = {
                    loginStatus: state.loginStatus,
                    activeTabName: state.activeTabName,
                    showLogginContent: state.showLogginContent,
                    followStatus: state.followStatus,
                    showUserProfileContent: state.showUserProfileContent,
                    bibleReadingScreenStatus: state.bibleReadingScreenStatus,
                    currentDayContent: action.currentDayContent,
                    currentReadingDayNumber: state.currentReadingDayNumber,
                    currentBibleReadingTitle: state.currentBibleReadingTitle,
                    lastReadDayNumber: state.lastReadDayNumber,
            }
            
            return new_state;

            case types.SAVE_CURRENT_READING_DAY_NUMBER:
            
            new_state = {
                    loginStatus: state.loginStatus,
                    activeTabName: state.activeTabName,
                    showLogginContent: state.showLogginContent,
                    followStatus: state.followStatus,
                    showUserProfileContent: state.showUserProfileContent,
                    bibleReadingScreenStatus: state.bibleReadingScreenStatus,
                    currentDayContent: state.currentDayContent,
                    currentReadingDayNumber: action.currentReadingDayNumber,
                    currentBibleReadingTitle: state.currentBibleReadingTitle,
                    lastReadDayNumber: state.lastReadDayNumber,
            }
            
            return new_state;

            case types.SAVE_CURRENT_READING_ITEM_TITLE:
            
            new_state = {
                    loginStatus: state.loginStatus,
                    activeTabName: state.activeTabName,
                    showLogginContent: state.showLogginContent,
                    followStatus: state.followStatus,
                    showUserProfileContent: state.showUserProfileContent,
                    bibleReadingScreenStatus: state.bibleReadingScreenStatus,
                    currentDayContent: state.currentDayContent,
                    currentReadingDayNumber: state.currentReadingDayNumber,
                    currentBibleReadingTitle: action.currentBibleReadingTitle,
                    lastReadDayNumber: state.lastReadDayNumber,
            }
            
            return new_state;

            case types.SAVE_CURRENT_LAST_READ_DAY_NUMBER:
            
            new_state = {
                    loginStatus: state.loginStatus,
                    activeTabName: state.activeTabName,
                    showLogginContent: state.showLogginContent,
                    followStatus: state.followStatus,
                    showUserProfileContent: state.showUserProfileContent,
                    bibleReadingScreenStatus: state.bibleReadingScreenStatus,
                    currentDayContent: state.currentDayContent,
                    currentReadingDayNumber: state.currentReadingDayNumber,
                    currentBibleReadingTitle: state.currentBibleReadingTitle,
                    lastReadDayNumber: action.lastReadDayNumber,
            }
            
            return new_state;
            //SAVE_CURRENT_LAST_READ_DAY_NUMBER,lastReadingDayNumber

        default:
            return state;

    }
}