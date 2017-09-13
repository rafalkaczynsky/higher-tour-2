import React from 'react'
import {Provider} from 'react-redux'

import Screens from './screens'
import store from './store'

export default class App extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <Screens />
            </Provider>
        )
    }
}