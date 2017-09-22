/**
 * Created by rafal on 05/04/2017.
 */

import * as types from './actionTypes';

export function SAVE_EVENTS(events) {
    return {
        type: types.SAVE_EVENTS,
        events: events,

    };
}

export function SAVE_CHURCHES(churches) {
    return {
        type: types.SAVE_CHURCHES,
        churches: churches,
    };
}

export function SAVE_USER(userData) {
    return {
        type: types.SAVE_USER,
        userData: userData,
    };
}

export function SAVE_SELECTED_EVENT(selectedEvent) {
    return {
        type: types.SAVE_SELECTED_EVENT,
        selectedEvent: selectedEvent
    };
}

export function SAVE_COORDS(coords) {
    return {
        type: types.SAVE_COORDS,
        coords: coords,
    };
}

export function SAVE_SESSIONS(sessions) {
    return {
        type: types.SAVE_SESSIONS,
        sessions: sessions,

    };
}

//APP STAFF
export function UPDATE_LOGGIN_STATUS(loginStatus) {
    return {
        type: types.UPDATE_LOGGIN_STATUS,
        loginStatus: loginStatus,
    };
}

export function UPDATE_ACTIVE_TAB_NAME(activeTabName) {
    return {
        type: types.UPDATE_ACTIVE_TAB_NAME,
        activeTabName: activeTabName,
    };
}

export function UPDATE_SHOW_LOGGIN_CONTENT(status) {
    return {
        type: types.UPDATE_SHOW_LOGGIN_CONTENT,
        showLogginContent: status,
    };
}


export function UPDATE_SHOW_USERPROFILE_CONTENT(status) {
    return {
        type: types.UPDATE_SHOW_USERPROFILE_CONTENT,
        showUserProfileContent: status,
    };
}

export function UPDATE_FOLLOW_STATUS(followStatus) {
    return {
        type: types.UPDATE_FOLLOW_STATUS,
        followStatus: followStatus,
    };
}


//...............