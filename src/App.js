import React from 'react'
import {Provider} from 'react-redux'
import {AppState, AsyncStorage, Text, View} from 'react-native'

import Screens from './screens'
import store from './store'




export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          isStoreLoading: false,
          store: store
        }
      }

    componentWillMount() {
        var self = this;
        AppState.addEventListener('change', this._handleAppStateChange.bind(this));
        this.setState({isStoreLoading: true});
        AsyncStorage.getItem('completeStore').then((value)=>{
          if(value && value.length){
            let initialStore = JSON.parse(value)
            self.setState({store: createStore(reducers, initialStore, middleware)});
          }else{
            self.setState({store: store});
          }
          self.setState({isStoreLoading: false});
        }).catch((error)=>{
          self.setState({store: store});
          self.setState({isStoreLoading: false});
        })
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
      }
      _handleAppStateChange(currentAppState) {
        let storingValue = JSON.stringify(this.state.store.getState())
        AsyncStorage.setItem('completeStore', storingValue);
    }

    render(){
        if(this.state.isStoreLoading){
          return <Text>Loading Store ...</Text>
        }else{
          return (
            <Provider store={this.state.store}>
              <Screens />
            </Provider>
          )
        }
      }
}