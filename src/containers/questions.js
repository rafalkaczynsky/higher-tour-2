import React, {Component} from 'react'
import {Button, View} from 'react-native'
import { connect } from 'react-redux';
import * as firebase from 'firebase'

import _Firebase from '../actions/firebase';
import {Questions} from '../windows'
import * as ACTIONS from '../actions/actions/actions';
import { NavigationActions } from 'react-navigation'

class _Questions extends Component {
  constructor(props){
    super(props)

    this.state = {
        signIn: false,
        notificationsOn: true,
    }
  }
  
  handleOnSettings(){
    this.props.dispatch( {type: 'SettingsInAnimation'})
  }

  handleOnHome(){
      
    const resetActionSignIn = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'SignIn'})
      ]
    })
      
    const resetActionUserProfile = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'UserProfile'})
      ]
    })
      
    const resetActionWelcome = NavigationActions.reset({
      index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Welcome'})
        ]
    })
      
      
    const loginStatus = this.props.app.loginStatus  // data from the store
      
    if (loginStatus && loginStatus === 'loggedOut') {
      //this.props.dispatch({type: 'SignInOnHomeAnimation'})
      this.props.dispatch(resetActionSignIn)
    } else if (loginStatus && loginStatus === 'loggedInPlus') {
      // this.props.dispatch({type: 'UserProfileOnHomeAnimation'})
      this.props.dispatch(resetActionUserProfile)
    } else {
      // this.props.dispatch({type: 'GotoWelcomeAnimation'})
      this.props.dispatch(resetActionWelcome)
    }
 }

  handleOnBible(navigate, route){
      this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
      this.props.dispatch({ type: 'BibleAnimation' }) 
  } 
  handleOnGoBack(){
    this.props.navigation.dispatch(NavigationActions.back())
  }
  

  // week1 needs to be generic

  handleAnswer(index){
    const questionIndex = this.props.app.questionIndex
    const sessionId = this.props.app.week.id

    const answerRef = firebase.database().ref('aaaSession/'+sessionId+'/Questions/'+(questionIndex + 1)+'/Answers/'+index)
    const questionRef = firebase.database().ref('aaaSession/'+sessionId+'/Questions/'+(questionIndex + 1))

    questionRef.once("value", snapshot => {
      const question = snapshot.val()
      const howMany = question.howMany 
      const updatedHowMany = howMany + 1

      questionRef.update({
        howMany: updatedHowMany
      })
    })

    answerRef.once("value", snapshot => {
      const Answer = snapshot.val()
      const Results = Answer.Results 
      const updatedResults = Results + 1

      answerRef.update({
        Results: updatedResults
      })
    })

    this.props.dispatch({type: 'GoToReflectRightToLeftAnimation'})
  }

  handleAgree(index){
    const questionIndex = this.props.app.questionIndex
    const sessionId = this.props.app.week.id

    const answerRef = firebase.database().ref('aaaSession/'+sessionId+'/Questions/'+(questionIndex + 1)+'/answers/')
    const questionRef = firebase.database().ref('aaaSession/'+sessionId+'/Questions/'+(questionIndex + 1))

    questionRef.once("value", snapshot => {
      const question = snapshot.val()
      const howMany = question.howMany 
      const updatedHowMany = howMany + 1

      questionRef.update({
        howMany: updatedHowMany
      })
    })

    answerRef.once("value", snapshot => {
      const Answer = snapshot.val()
      const Results = Answer.agree 
      const updatedResults = Results + 1

      answerRef.update({
        agree: updatedResults
      })
    })


    /* if ((questionIndex+1) === (this.state.questions.length-1)){
      this.props.dispatch({type: 'GoToFreebieRightToLeftAnimation'})
    }*/

    if (index <3){
      this.props.dispatch(ACTIONS.UPDATE_QUESTION_INDEX(questionIndex+1))
    } else {
      this.props.dispatch(ACTIONS.UPDATE_QUESTION_INDEX(0))
      this.props.dispatch({type: 'GoToFreebieRightToLeftAnimation'})
    }
  }

  handleDisagree(index){
    const questionIndex = this.props.app.questionIndex
    const sessionId = this.props.app.week.id

    const answerRef = firebase.database().ref('aaaSession/'+sessionId+'/Questions/'+(questionIndex + 1)+'/answers/')
    const questionRef = firebase.database().ref('aaaSession/'+sessionId+'/Questions/'+(questionIndex + 1))

    questionRef.once("value", snapshot => {
      const question = snapshot.val()
      const howMany = question.howMany 
      const updatedHowMany = howMany + 1

      questionRef.update({
        howMany: updatedHowMany
      })
    })

    answerRef.once("value", snapshot => {
      const Answer = snapshot.val()
      const Results = Answer.disagree 
      const updatedResults = Results + 1

      answerRef.update({
        disagree: updatedResults
      })
    })
    
    this.props.dispatch(ACTIONS.UPDATE_QUESTION_INDEX(questionIndex+1))
   /* if ((questionIndex+1) === (this.state.questions.length-1)){
      this.props.dispatch({type: 'GoToFreebieRightToLeftAnimation'})
    }*/

    if (index <3){
      this.props.dispatch(ACTIONS.UPDATE_QUESTION_INDEX(questionIndex+1))
    } else {
      this.props.dispatch(ACTIONS.UPDATE_QUESTION_INDEX(0))
      this.props.dispatch({type: 'GoToFreebieRightToLeftAnimation'})
    }
  }

  componentDidMount(){

  }
  
  render() {

     const { navigate } = this.props.navigation
     const { params } = this.props.navigation.state

     const locations = this.props.events                // data from the store
     const userData = this.props.user                   // data from the store
     const coords = this.props.coords                   // data from the store
     const activeTabName =this.props.app.activeTabName  // data from the store
     const loginStatus = this.props.app.loginStatus     //

     const session = this.props.app.week
     const questionIndex = this.props.app.questionIndex

    return (
        <Questions
          onHome={()=> this.handleOnHome()}  
          onBible={() =>  this.handleOnBible(navigate, 'HigherBibleReadings')}
          onGoBack={()=> this.handleOnGoBack()} 
          onSettings={()=> this.handleOnSettings()}
          handleAnswer={(index)=> this.handleAnswer(index)}
          session={session}
          onPressAgree={(index, answer)=> this.handleAgree(index, answer)}
          onPressDisagree={(index, answer)=>this.handleDisagree(index, answer)}
          onPressDone={()=> this.props.dispatch({type: 'GoToFreebieRightToLeftAnimation'})}
          questionIndex={questionIndex}
        />
    )
  }
}

function mapStateToProps(state){
  return({
      user: state.user,
      events: state.events,
      churches: state.churches,
      coords: state.coords,
      app: state.app,
      aaaSession: state.aaaSession
  });
}

export default connect(mapStateToProps)(_Questions);
