//QuestionImageSurvey 
import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import StyleSheet from '../styles';
import {Button} from './'
import {colors} from '../styles/resources'

export default class QuestionImageSurvey extends React.Component {

  static getTest(close) {
    return {
      title: 'Walkthrough',
      view: Walkthrough,
      viewProps: { onClose: close }
    };
  }

  render() {
    const  {onGoBack, onHome, onBible, onSettings, questionIndex, imagesArray, onPressAgree, onPressDisagree} = this.props
    console.log(imagesArray)
    return (
        <Swiper 
            ref={(swiper) => {this._swiper = swiper}}
            autoplay={false} 
            style={StyleSheet.walkthrough.swiper}
            paginationStyle={StyleSheet.walkthrough.paginator}
            dot={<View style={StyleSheet.walkthrough.dot}/>}
            loop={false}
            scrollEnabled={false}
            autoplayTimeout={5}
            activeDot={<View style={StyleSheet.walkthrough.activeDot}/>}>
            {imagesArray.map((item, indx)=> {
                console.log(indx)
                return <SingleQuestion 
                    image={item} 
                    onPressAgree={()=>{
                        onPressAgree(indx)
                        if(indx<3){
                            this._swiper.scrollBy(1, true)
                        }
                    }} 
                    onPressDisagree={()=>{
                        onPressDisagree(indx)
                        if(indx<3){
                            this._swiper.scrollBy(1, true)
                        }
                      
                    }}/>
            }
          )}
        </Swiper>
    );
  }
}

class SingleQuestion extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Image style={{flex: 1}} source={{uri: this.props.image}} />
        <View style={{flex:0.2, flexDirection: 'row'}}>
            <TouchableOpacity 
                style={{flex:1, justifyContent: 'center', alignItems: 'center', opacity: 0.8, backgroundColor: 'lightgreen'}}
                onPress={this.props.onPressAgree}
            >
                <Text style={{fontWeight: 'bold'}}>AGREE</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{flex:1, justifyContent: 'center', alignItems: 'center',backgroundColor: 'red'}}
                onPress={this.props.onPressDisagree}
                >
                <Text style={{fontWeight: 'bold'}}>DISAGREE</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class SingleQuestionLast extends React.Component {
    render() {
      return (
        <View style={{flex: 1}}>
          <Image style={{flex: 1}} source={{uri: this.props.image}} />
          <View style={{flex:0.2, flexDirection: 'row'}}>
              <TouchableOpacity 
                  style={{flex:1, justifyContent: 'center', alignItems: 'center', opacity: 0.8, backgroundColor: 'lightgreen'}}
              >
                  <Text style={{fontWeight: 'bold'}}>AGREE</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                  style={{flex:1, justifyContent: 'center', alignItems: 'center',backgroundColor: 'red'}}
                  >
                  <Text style={{fontWeight: 'bold'}}>DISAGREE</Text>
              </TouchableOpacity>
          </View>
        </View>
      );
    }
  }