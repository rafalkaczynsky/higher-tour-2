import React, {Component} from 'react'
import { connect } from 'react-redux';

import * as ACTIONS from '../actions/actions/actions';
import {FindChurch} from '../windows'

class _FindChurch extends Component {
  constructor(props){
    super(props)

    this.state = {
        locations: [],
        buttonsStyle: [
          {
            textColor: 'brown',
            bgColor: 'transparent',
          },
          {
            textColor: 'white',
            bgColor: 'brown',           
          }
        ]
    }

  }
// do actions for SAVE_SELECTED_CHURCH 
  handleOnItem(navigate, churchSelected){
    this.props.dispatch(ACTIONS.SAVE_SELECTED_CHURCH(churchSelected))
    this.props.dispatch({type: 'GotoChurchItemAnimation'})
  }

  handleOnAlphabetical(churches){
    churches.sort(function(a, b){
      if(a.name.toLowerCase() < b.name.toLowerCase() ) return -1;
      if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    })
    this.setState({
      churches: churches,
      buttonsStyle: [
        {
          textColor: 'white',
          bgColor: 'brown',           
        },
        {
          textColor: 'brown',
          bgColor: 'transparent',
        }
      ]
    })

  }

  handleOnClosest(churches){
    function compare(a, b){
      return a.howFar - b.howFar;
    }
  
    churches.sort(compare);
    this.setState({
      churches: churches,
      buttonsStyle: [
        {
          textColor: 'brown',
          bgColor: 'transparent',
        },
        {
          textColor: 'white',
          bgColor: 'brown',           
        }
      ]
    
    })
  }

  componentDidMount(){

    const churches = this.props.churches  // data from the store

    this.setState({churches: churches})
    this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME('Home'))
  }

  render() {

    const { navigate } = this.props.navigation 
    const  {params}  = this.props.navigation.state
  
    const userData = this.props.user      // data from the store
    const churches = this.props.churches  // data from the store
    const activeTabName = this.props.app.activeTabName  // data from the store
  
    console.log('Find Church Container')

    return (
        <FindChurch 
          onSettings={()=> {this.props.dispatch({type: 'SettingsInAnimation'})
            this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
            this.props.dispatch( {type: 'SettingsInAnimation'})   
            }
          }

          onItem={(churchSelected)=> this.handleOnItem(navigate, churchSelected)}
          buttonsStyle={this.state.buttonsStyle}
          churches={churches}
          onHome={()=> this.props.dispatch({type: 'FindSessionAnimation'})}
          onMoreSession={()=> this.props.dispatch({type: 'FindSessionAnimation'})}
          onAlphabetical={()=> this.handleOnAlphabetical(churches)}
          onClosest={()=> this.handleOnClosest(churches)}
          activeTabName={activeTabName}
        />
    )
  }
}

function mapStateToProps(state){
  return({
      user: state.user,
      churches: state.churches,
      app: state.app,

  });
}

export default connect(mapStateToProps)(_FindChurch);
