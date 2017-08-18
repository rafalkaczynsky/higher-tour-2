import React, {Component} from 'react'
import {FindSession} from '../windows'

export default class _FindSession extends Component {
  constructor(props){
    super(props)

    this.state ={
      sessions: '',
    }
  }

  handleOnItem(navigate, sessionItem, allSessions){
    console.log('handleOnItem')
    console.log(allSessions)
    navigate('SessionItem', { session: sessionItem, allSessions: allSessions })
  }

  handleOnMoreSession(){
    this.setState({sessions: this.props.navigation.state.params.allSessions.sessions})
  }

  componentWillMount(){
    console.log('we are in componentWillMount ')
    console.log(this.props.navigation.state.params)
    this.setState({sessions: this.props.navigation.state.params.church.sessions})
  }

  render() {

    console.log(this.state.sessions)
    console.log(this.props.navigation.state.params)

    const { navigate } = this.props.navigation 
    const  {params}  = this.props.navigation.state
    
    console.log('FindSession')
    console.log(params)
    
    if (this.state.sessions === undefined) {

      this.setState({sessions: params.allSessions})
    }

    return (
        <FindSession 
          onSettings={()=> navigate('Settings')}
          onBible={()=> navigate('FindSession')}
          onItem={(sessionItem, allSessions)=> this.handleOnItem(navigate, sessionItem, allSessions)}
          sessions={this.state.sessions}
          allSessions={params.allSessions}
          churchName={params.churchName ? params.churchName : null}
          onMoreSession={()=> this.handleOnMoreSession()}
        />
    )
  }
}


