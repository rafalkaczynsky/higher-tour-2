import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, Linking} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem} from '../components'

export default class Questions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {onGoBack, onGoNext, onHome, onSettings, onBible, session, questionIndex, handleAnswer} = this.props

   // console.log(session.Questions)
   // console.log(questionIndex)

    const questionText = session.Questions[questionIndex+1].Question
    const Answers =  session.Questions[questionIndex+1].Answers

    console.log(Answers) 

    return (
      <View style={StyleSheet.window.default}>
        <Header
          text='Question'
          onBack
          onNext
          onBackCallback={onGoBack}
          onNextCallback={onGoNext}
        />
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
              console.log(indx)
              
              if (answer !==null) return
                <Button
                    key={'answersItem' + indx}
                    type="settings"
                    text={answer.Text}
                    onPress={()=>  handleAnswer(indx)}
                    buttonStyle={{marginTop: 5}}
                />
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
