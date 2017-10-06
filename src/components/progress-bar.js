/*import React, { Component } from 'react'
import { Text, StyleSheet, View, Animated } from 'react-native'


//Responsive Animated Progress Bar

export default class ProgressBar extends Component {

    constructor(props){
        super(props)

    }

    componentDidUpdate(){
        if(prevProps.progress !== this.props.progress) {
            Animated.timing(this.animation, {
                toValue: 0.5,
                duration: this.props.duration
            }).start()
        }
    }

    componentWillMount(){
        this.animation = new Animated.View(this.props.progress)
    }

    render(){

        const {
            height,
            borderColor,
            borderWidth,
            borderRadius,
            barColor,
            fillColor,
            duration,
        } = this.props 

        const position = (100, 300)

        const opacity = position.interpolate({
            inputRange:(0,1),
            outputRange: ([0, 1, 1, 0]),
        });

        const widthInterpolated = this.animation.interpolate({
            inputRange: (0, 1),
            outputRange: ("0%", "100%"),
            extrapolate: 'clamp'
        });

        return(
            <View style={{flex: 1, flexDirection: 'row', height}}>
                <View style={{flex: 1, borderColor, borderWidth, borderRadius}}>
                    <View style={[StyleSheet.absoluteFill, {backgroundColor: fillColor}]}/>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: widthInterpolated,
                            backgroundColor: barColor,

                        }}
                    />
                </View>

            </View>
        )
    }
}

ProgressBar.defaultProps = {
    height: 10,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 4,
    barColor: 'tomato',
    fillColor: 'yellow',
    duration: 1000,
}

*/