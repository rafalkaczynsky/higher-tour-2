import React from 'react';
import {View, Image, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import StyleSheet from '../styles';
import {Button} from './'


export default class QuestionSlider extends React.Component {

  static getTest(close) {
    return {
      title: 'Walkthrough',
      view: Walkthrough,
      viewProps: { onClose: close }
    };
  }

  render() {
    const  {onGoBack, onHome, onBible, onSettings, questionIndex, imagesArray, onPressDone} = this.props

    const imagesArrayNew = []
    
    for(i=1; i < (imagesArray.length); i++) {
      imagesArrayNew.push(imagesArray[i])
    }

    return (
        <Swiper 
            autoplay={true} 
            style={StyleSheet.walkthrough.swiper}
            paginationStyle={StyleSheet.walkthrough.paginator}
            dot={<View style={StyleSheet.walkthrough.dot}/>}
            loop={false}
            autoplayTimeout={5}
            activeDot={<View style={StyleSheet.walkthrough.activeDot}/>}>
            {
              imagesArrayNew.map((item, i) => {
              if (i < imagesArrayNew.length-1) return <SlidePage key={i} image={item.url}/>
              else return <SlidePageLast key={i} image={item.url} onPressDone={onPressDone}/>}
              ) 
            }
            
              
        </Swiper>
    );
  }
}



class SlidePage extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Image style={{flex: 1}} source={{uri: this.props.image}} />
      </View>
    );
  }
}

class SlidePageLast extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Image style={{flex: 1}} source={{uri: this.props.image}} />
        <Button
          type="default"
          text={'NEXT'}
          style={{flex: 1}}
          onPress={this.props.onPressDone}
        />
      </View>
    );
  }
}