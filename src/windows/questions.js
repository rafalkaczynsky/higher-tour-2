import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, Linking} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem} from '../components'

export default class Question extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {onGoBack} = this.props


    const questionText = 'How would you describe God?'

    const Answers = [
       'He loves me and knows me',
       'He loves me and knows me',
       'He loves me and knows me',
       'He loves me and knows me',
    ]

    return (
      <View style={StyleSheet.window.default}>
        <Header
          text='Question'
          onBack
          onBackCallback={onGoBack}
        />
        <ScrollView style={{width: '100%'}}>
        <View style={StyleSheet.settings.container}>

            <View style={StyleSheet.settings.buttonGroup}>
                <Title
                    text={questionText}
                    textColor="brown"
                    textStyle={{fontSize: 18}}
                />
            {Answers.map((answer, indx) =>
                <Button
                    type="settings"
                    text={answer}
                    onPress={()=>  alert('Answer ' + (indx+1) + ' pressed!' )}
                    buttonStyle={{marginTop: 5}}
                />
            )}

            </View>
        </View>
        </ScrollView>

        <TabMenu
            onHome={this.props.onHome}
            onBible={this.props.onBible}
            activeTabName={'Settings'}
        />
      </View>
    )
  }
}
