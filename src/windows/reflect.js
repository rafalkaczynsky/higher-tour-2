import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, Linking} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem} from '../components'

var totalProgress = 0 

export default class Reflect extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const {onGoBack, onGoNext, question, answers, howMany} = this.props

    const numberOfPeople = howMany

    return (
      <View style={StyleSheet.window.default}>
        <Header
          text='Reflect'
          onBack
          onNext
          onBackCallback={onGoBack}
          onNextCallback={onGoNext}
        />
        <ScrollView style={{width: '100%'}}>
          <View style={StyleSheet.settings.container}>
            <View style={StyleSheet.settings.buttonGroup}>
                <Title
                    text={"Here's what others think:"}
                    textColor="brown"
                    textStyle={{fontSize: 18}}
                />
                {/* ....... list of answers with progress bar ........ */}
                <View style={{width:'90%'}}>
                {answers.map((item, index)=> {
                    const progress = parseInt((item.Results/numberOfPeople)*100)
                    totalProgress= totalProgress + progress

                    console.log(totalProgress)
                    return(
                        <ListItem
                            key={'reflectReadingKey'+ index}
                            title={item.Text}
                            progressBar
                            progress={parseInt(progress)+'%'}
                            disabled
                            noBorder
                            noIcon
                            progressBarColor={'#e3e3e3'}
                            bgColor={'transparent'}
         
                        />
                    )
                })}
                        <ListItem
                            title={'Test for 100%'}
                            progressBar
                            progress={totalProgress + '%'}
                            disabled
                            noBorder
                            noIcon
                            progressBarColor={'#e3e3e3'}
                            bgColor={'transparent'}
                        />
                </View>     
                <View style={{marginTop: 10,width: '60%', alignItems: 'center'}}>
                    <Text style={{fontSize: 18, color: colors.brown, textAlign: 'center'}}>
                        You have complited the Welcome Session! Have Freebie
                    </Text>
                </View>
    
                <Button 
                    type="default"
                    text="HigerTwelve - 24"
                    bgColor="yellow"  
                    textColor="brown"
                    buttonStyle={{margin: 10, width: '92%'}}
                /> 
            </View>
          </View>
        </ScrollView>
        <TabMenu
            onHome={this.props.onHome}
            onBible={this.props.onBible}
            onSettings={this.props.onSettings}
        />
      </View>
    )
  }
}
