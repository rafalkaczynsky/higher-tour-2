import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, Linking, Image} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem, QuestionSlider} from '../components'

class QuestionText extends Component {
  render(){
    const {onGoBack, Answers, questionText, onHome, onSettings, onBible, session, questionIndex, handleAnswer} = this.props
    return (
      <View style={StyleSheet.window.default}>
      {questionIndex === 0 &&
        <Header
          text='Question'
          onBack
          onBackCallback={onGoBack}
        />}
        <ScrollView style={{width: '100%'}}>
          <View style={StyleSheet.settings.container}>
            <View style={StyleSheet.settings.buttonGroup}>
                <Title
                    text={questionText}
                    textColor="brown"
                    textStyle={{fontSize: 18}}
                />
            {Answers.map((answer, indx) =>{
              if (answer) console.log(answer.Text)
    
              if (answer !==null) return (
                <Button
                    key={'answersItem' + indx}
                    type="settings"
                    text={answer.Text}
                    onPress={()=>  handleAnswer(indx)}
                    buttonStyle={{marginTop: 5}}
                />)
              }
            )}
            </View>
          </View>
        </ScrollView>
        <TabMenu
            onHome={onHome}
            onBible={onBible}
            onSettings={onSettings}
        />
      </View>
    )
  }
}


class QuestionImageSurvey extends Component {
  render() {
    const  {onGoBack, onHome, onBible, onSettings, questionIndex} = this.props

    return(
      <View style={StyleSheet.window.default}>
      {questionIndex === 0 &&
        <Header
          text='Question'
          onBack
          onBackCallback={onGoBack}
        />}
        <ScrollView style={{width: '100%'}}>
          <View style={StyleSheet.settings.container}>
            <Text>QUESTION SURVAY NOT FULL SCREEN</Text>
            {/*buttons agree / disagree*/}
          </View>
        </ScrollView>
        <TabMenu
            onHome={onHome}
            onBible={onBible}
            onSettings={onSettings}
        />
      </View>
    )
  }
}

class QuestionImageSurveyFullScreen extends Component {
  render() {
    return(
      <View style={StyleSheet.window.default}>
        {/* full screen image slider */}
        {/*buttons agree / disagree*/}
      </View>
    )
  }
}

export default class Questions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {onGoBack, onHome, onSettings, onBible, session, questionIndex, handleAnswer, onPressDone} = this.props

    const questionText = session.Questions[questionIndex+1].Question
    const Answers =  session.Questions[questionIndex+1].Answers

    const imagesArray =  session.Questions[questionIndex+1].imagesUrls

    const questionType = session.questionType 
    console.log(session)

          if (questionType === 'text')        return <QuestionText Answers={Answers} questionText={questionText} onGoBack={onGoBack} onHome={onHome}  onSettings={onSettings} onBible={onBible} session={session} questionIndex={questionIndex} handleAnswer={handleAnswer}/>
     else if (questionType === 'imageSlider') return <QuestionSlider onPressDone={onPressDone} onGoBack={onGoBack} onHome={onHome} onBible={onBible} onSettings={onSettings}  questionIndex={questionIndex} imagesArray={imagesArray}/>
     else if (questionType === 'imageSurvey') return <QuestionImageSurvey  onGoBack={onGoBack} onHome={onHome} onBible={onBible} onSettings={onSettings} questionIndex={questionIndex}/>
     else return <Text>Warning! Something wrong - no questionType found</Text>

  }
}
