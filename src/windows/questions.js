import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, Linking, Image} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem, QuestionSlider, QuestionImageSurvey} from '../components'

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


export default class Questions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {onGoBack, onHome, onSettings, onBible, session, questionIndex, handleAnswer, onPressDone, onPressAgree, onPressDisagree} = this.props

    const imagesArray =  session.Questions[questionIndex+1].imagesUrls
    let surveyImagesArray = []  

    for (i=1; i<session.Questions.length; i++) {
      console.log(i)
      console.log(session.Questions.length)
      console.log(session.Questions)
      console.log(session.Questions[i].imageUrl)
      surveyImagesArray.push(session.Questions[i].imageUrl)
    }
    const questionType = session.questionType 

          if (questionType === 'text')        return <QuestionText Answers={session.Questions[questionIndex+1].Answers} questionText={session.Questions[questionIndex+1].Question} onGoBack={onGoBack} onHome={onHome}  onSettings={onSettings} onBible={onBible} session={session} questionIndex={questionIndex} handleAnswer={handleAnswer}/>
     else if (questionType === 'imageSlider') return <QuestionSlider onPressDone={onPressDone} onGoBack={onGoBack} onHome={onHome} onBible={onBible} onSettings={onSettings}  questionIndex={questionIndex} imagesArray={imagesArray}/>
     else if (questionType === 'imageSurvey') return <QuestionImageSurvey  onPressAgree={onPressAgree} onPressDisagree={onPressDisagree} onGoBack={onGoBack} onHome={onHome} onBible={onBible} onSettings={onSettings}  questionIndex={questionIndex} imagesArray={surveyImagesArray}/>
     else return <Text>Warning! Something wrong - no questionType found</Text>

  }
}
//onPressAgree, onPressDisagree