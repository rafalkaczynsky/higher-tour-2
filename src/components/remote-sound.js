import React, { Component } from 'react'
import {TouchableOpacity} from 'react-native'
import Sound from 'react-native-sound'

import StyleSheet from '../styles'
import {Icon} from './'

class RemoteSound extends Component {
    constructor(props){
        super(props)

        this.state = {
          play: false,
          firstPlay: true
        }

    }

  playTrack = (musicUrl) => {
    const track = new Sound(musicUrl, null, (e) => {
      if (e) {
        //console.log('error loading track:', e)
      } else {
        track.play()
      }
    })

  }

  componentWillMount(){
    
  }

  handleOnPlay(musicUrl){
    this.setState({play: !this.state.play})

    if(this.state.firstPlay) {
      this.track = new Sound(this.props.musicUrl, null, (e) => {
        if (e) {
          //error
        } else {
          //music laoded
        }
      })
    }

    if(this.state.play){
      // Play the sound with an onEnd callback
      this.track.play((success) => {
        if (success) {

        } else {
          //console.log('playback failed due to audio decoding errors');
          // reset the player to its uninitialized state (android only)
          // this is the only option to recover after an error occured and use the player again
          this.track.reset();
      }
      });
    }else {
      if (this.track) this.track.pause()
    }

    this.setState({firstPlay: false})
  }

//this.playTrack(this.props.musicUrl)

  render() {
    return (
    <TouchableOpacity style={this.props.style}title="play" onPress={()=> this.handleOnPlay(this.props.musicUrl)}>
      <Icon 
        name="play"
        style={StyleSheet.tabItem.iconStyle}
      />
    </TouchableOpacity>
    )
  }
}

export default RemoteSound