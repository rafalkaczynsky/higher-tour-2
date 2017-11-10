import React, {Component} from 'react'
import {Button, View} from 'react-native'
import { connect } from 'react-redux';
import * as firebase from 'firebase'

import _Firebase from '../actions/firebase';
import {Reflect} from '../windows'
import * as ACTIONS from '../actions/actions/actions';
import { NavigationActions } from 'react-navigation'

class _Reflect extends Component {
  constructor(props){
    super(props)

    this.state = {
      question: null,
      answers: [],
      howMany: null,
      questions: []
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
  
  handleOnGoNext(){
    let questionIndex = this.props.app.questionIndex 
    if ((questionIndex+1)<(this.state.questions.length-1)){
      this.props.dispatch(ACTIONS.UPDATE_QUESTION_INDEX(questionIndex+1))
      this.props.dispatch({type: 'GoToQuestionsAnimation'})
    } else this.props.dispatch({type: 'GoToFreebieRightToLeftAnimation'})
  }

  componentDidMount(){

  }

  componentWillMount(){
    const questionIndex = this.props.app.questionIndex
    const sessionId = this.props.app.week.id

    const questionRef = firebase.database().ref('aaaSession/'+sessionId+'/Questions/'+(questionIndex + 1))
    const questionsRef = firebase.database().ref('aaaSession/'+sessionId+'/Questions')

    questionsRef.once("value", snapshot => {
      const questions = snapshot.val()
      this.setState({questions: questions})
      console.log(questions)
    })

    questionRef.once("value", snapshot => {
      const question = snapshot.val()
      const answers = question.Answers
      const howMany = question.howMany

      this.setState({question: question})
      this.setState({answers: answers})
      this.setState({howMany: howMany})
    })

  }
  
  render() {
    //UPDATE_QUESTION_INDEX
     const { navigate } = this.props.navigation
     const { params } = this.props.navigation.state

     const userData = this.props.user                   // data from the store
     const loginStatus = this.props.app.loginStatus

    return (
        <Reflect
          onHome={()=> this.handleOnHome()}  
          onBible={() =>  this.handleOnBible(navigate, 'HigherBibleReadings')}
          onGoBack={()=> this.handleOnGoBack()} 
          onGoNext={()=> this.handleOnGoNext()}
          onSettings={()=> this.handleOnSettings()}
          question={this.state.question}
          answers={this.state.answers}
          howMany={this.state.howMany}
        />
    )
  }
}

function mapStateToProps(state){
  return({
      user: state.user,
      events: state.events,
      app: state.app,
  });
}

export default connect(mapStateToProps)(_Reflect);
