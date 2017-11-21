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

export function SAVE_APP_USER(appUserData) {
    return {
        type: types.SAVE_APP_USER,
        appUserData: appUserData,
    };
}

export function UPDATE_APP_USER(follow, eventId, FCMtoken, email, displaName, uid){
    return {
        type: types.UPDATE_APP_USER,
        follow: follow,
        eventId: eventId,
        FCMtoken: FCMtoken,
        email: email,
        displaName: displaName,
        uid: uid,
    }
}

export function UPDATE_QUESTION_INDEX(questionIndex){
    return {
        type: types.UPDATE_QUESTION_INDEX,
        questionIndex: questionIndex
    }
}

export function SAVE_SELECTED_EVENT(selectedEvent) {
    return {
        type: types.SAVE_SELECTED_EVENT,
        selectedEvent: selectedEvent
    };
}

export function SAVE_SELECTED_CHURCH(selectedChurch) {
    return {
        type: types.SAVE_SELECTED_CHURCH,
        selectedChurch: selectedChurch
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

export function SAVE_AAA_SESSION(aaaSession) {
    return {
        type: types.SAVE_AAA_SESSION,
        aaaSession: aaaSession,
    };
}


export function SAVE_BIBLE_READING(bibleReading) {
    return {
        type: types.SAVE_BIBLE_READING,
        bibleReading: bibleReading,
    };
}

//
export function DELETE_FORM_DATA() {
    return {
        type: types.DELETE_FORM_DATA,
    };
}

//SAVE_APP_USER_BIBLE_READINGS
export function SAVE_APP_USER_BIBLE_READINGS(appUserBibleReading) {
    return {
        type: types.SAVE_APP_USER_BIBLE_READINGS,
        appUserBibleReading: appUserBibleReading,
    };
}

export function SAVE_APP_USER_BIBLE_READINGS_NAMES(appUserBibleReadingNames) {
    return {
        type: types.SAVE_APP_USER_BIBLE_READINGS_NAMES,
        appUserBibleReadingNames: appUserBibleReadingNames,
    };
}


export function SAVE_BIBLE_READING_NAMES(bibleReadingNames) {
    return {
        type: types.SAVE_BIBLE_READING_NAMES,
        bibleReadingNames: bibleReadingNames,
    };
}

export function SAVE_CURRENT_READING_ITEM(currentBibleReading) {
    return {
        type: types.SAVE_CURRENT_READING_ITEM,
        currentBibleReading: currentBibleReading,

    };
}


export function SAVE_CURRENT_READING_ITEM_TITLE(currentBibleReadingTitle) {
    return {
        type: types.SAVE_CURRENT_READING_ITEM_TITLE,
        currentBibleReadingTitle: currentBibleReadingTitle,

    };
} 

export function SAVE_CURRENT_READING_DAY_NUMBER(dayNumber) {
    return {
        type: types.SAVE_CURRENT_READING_DAY_NUMBER,
        currentReadingDayNumber: dayNumber,
    };
}

export function SAVE_CURRENT_LAST_READ_DAY_NUMBER(dayNumber) {
    return {
        type: types.SAVE_CURRENT_LAST_READ_DAY_NUMBER,
        lastReadDayNumber: dayNumber,
    };
}


//APP STAFF

export function CLEAR_APP(empty) {
    return {
        type: types.CLEAR_APP,
        empty: empty,
    };
}

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

export function UPDATE_BIBLE_READING_SCREEN(screenStatus) {
    return {
        type: types.UPDATE_BIBLE_READING_SCREEN,
        bibleReadingScreenStatus: screenStatus,
    };
}

export function UPDATE_CURRENT_BIBLE_READING_DAY_CONTENT(currentDayContent) {
    return {
        type: types.UPDATE_CURRENT_BIBLE_READING_DAY_CONTENT,
        currentDayContent: currentDayContent,
    };
}

export function SAVE_WEEK(week) {
    return {
        type: types.SAVE_WEEK,
        week: week,
    };
}

export function SAVE_WEEK_DATE(date) {
    return {
        type: types.SAVE_WEEK_DATE,
        weekDate: date,
    };
}

export function SAVE_FCM_TOKEN(FCMtoken) {
    return {
        type: types.SAVE_FCM_TOKEN,
        FCMtoken: FCMtoken,
    };
}
