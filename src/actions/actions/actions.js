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

export function SAVE_COORDS(coords) {
    return {
        type: types.SAVE_COORDS,
        coords: coords,
    };
}

//UPDATE_ACTIVE_TAB_NAME
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
//...............