//QuestionImageSurvey 
import React from 'react';
import {View, Image, Text, TouchableOpacity, Animated} from 'react-native';
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

  constructor(props){
      super(props)

      this.state = {
          agree: false,
          displayCard: false,  

      }
  }

  render() {
    const  {onGoBack, onHome, onBible, onSettings, questionIndex, imagesArray, onPressAgree, onPressDisagree, onPressDone} = this.props

    return (
        <View style={{flex: 1, backgroundColor: !this.state.displayCard ? null : this.state.agree ? 'lightgreen' : 'red'}}>
        <Swiper 
            ref={(swiper) => {this._swiper = swiper}}
            autoplay={false} 
            paginationStyle={StyleSheet.walkthrough.paginator}
            dot={<View style={StyleSheet.walkthrough.dot}/>}
            loop={false}
            scrollEnabled={false}
            autoplayTimeout={5}
            activeDot={<View style={StyleSheet.walkthrough.activeDot}/>}>
            {imagesArray.map((item, indx)=> {

                return <SingleQuestion
                    displayCard={this.state.displayCard} 
                    buttonText={this.state.buttonText}
                    key={'ingleQuestion'+indx}
                    image={!this.state.displayCard ? item : null} 
                    onPressAgree={()=>{
                        //setTimeout(()=> this.setState({visible: true}), 3000)

                        onPressAgree(indx)
                        if(indx<3){
                            this.setState({displayCard: true, agree: true, buttonText: 'NEXT'})
                        } else {
                            this.setState({displayCard: true, agree: true, buttonText: 'DONE'})
                        }
                    }} 
                    onPressDisagree={()=>{
  
                        onPressDisagree(indx)
                        if(indx<3){
                            this.setState({displayCard: true, agree: false, buttonText: 'NEXT'})
                        } else {
                            this.setState({displayCard: true, agree: false, buttonText: 'DONE'})
                        }
                    }}
                    onPressDone={()=>{
      
                        if(indx<3){
                            this._swiper.scrollBy(1, true)
                            this.setState({displayCard: !this.state.displayCard})
                        } else {
                            onPressDone()
                        }
                }
                }/>
            }
          )}
        </Swiper>
        </View>
    );
  }
}

class SingleQuestion extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            visible: true,
        }
    }



componentDidMount(){

}
  render() {
    let vis = false
    const {displayCard, onPressDone, onPressAgree, onPressDisagree, buttonText} = this.props
    const _buttonText = buttonText
    
    return (
    <View style={{flex: 1, justifyContent: displayCard ? 'flex-end' : null }}>
        {!displayCard && <Image style={{flex: 1}} source={{uri: this.props.image}} />}
        {!displayCard && 
        <View style={{flex:0.2, flexDirection: 'row'}}>
            <TouchableOpacity 
                style={{flex:1, justifyContent: 'center', alignItems: 'center', opacity: 0.8, backgroundColor: 'lightgreen'}}
                onPress={onPressAgree}
            >
                <Text style={{fontWeight: 'bold'}}>AGREE</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{flex:1, justifyContent: 'center', alignItems: 'center',backgroundColor: 'red'}}
                onPress={onPressDisagree}
                >
                <Text style={{fontWeight: 'bold'}}>DISAGREE</Text>
            </TouchableOpacity>
        </View>}
        {displayCard && 
            <Button 
                type="default"
                text={_buttonText}
                onPress={()=>{
                    onPressDone()
                }}
            />
            }
      </View>
    );
  }
}


class Fade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  };

  componentWillMount() {
    this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: true });
    }
    Animated.timing(this._visibility, {
      toValue: nextProps.visible ? 1 : 0,
      duration: 300,
    }).start(() => {
      this.setState({ visible: nextProps.visible });
    });
  }

  render() {
    const { visible, style, children, ...rest } = this.props;

    const containerStyle = {
      opacity: this._visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: this._visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1],
          }),
        },
      ],
    };

    const combinedStyle = [containerStyle, style];
    return (
      <Animated.View style={this.state.visible ? combinedStyle : containerStyle} {...rest}>
        {this.state.visible ? children : null}
      </Animated.View>
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