import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import logger , {createLogger} from "redux-logger"
import {Platform,AppState, AsyncStorage, Text, View} from 'react-native'

import {reducers} from './reducers'
import AppWithNavigationState from './screens';

const middleware = applyMiddleware(logger)

let store = createStore(reducers, middleware)

export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          isStoreLoading: false,
          initialStore: {},
          store: store,
          cipa: '',
        }
        console.ignoredYellowBox = [
          'Setting a timer'
      ]
      }
   
    componentWillMount() {
      console.log('App Will Mount')
        var self = this;
        AppState.addEventListener('change', this._handleAppStateChange.bind(this));
        this.setState({isStoreLoading: true});

        AsyncStorage.getItem('completeStore').then((value)=>{
          if(value){
            let initialStore = JSON.parse(value)
           // console.log(initialStore) //  --> we have data from localStorag
            self.setState({store: createStore(reducers, initialStore, middleware)});
          } else{
            self.setState({store: store});
          }
          self.setState({isStoreLoading: false});
        }).then((res)=> {
          //...
        })
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
        // stop listening for events
        this.notificationListener.remove();
      }
      _handleAppStateChange(currentAppState) {
        let storingValue = JSON.stringify(this.state.store.getState())

        if (storingValue){
           if (storingValue.form){
              storingValue.form.SignUpValidation = {}
           }
        }

        AsyncStorage.setItem('completeStore', storingValue);
    }

    
    render(){
        if(this.state.isStoreLoading){
          return <Text> </Text>
        }else{
          return (
            <Provider store={this.state.store}>
              <AppWithNavigationState />
            </Provider>
          )
        }
      }
}
