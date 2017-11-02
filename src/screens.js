import React from 'react';
import {Animated} from 'react-native'
import * as FirebaseInit from './actions/firebase-init';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import  * as customTransitions from './custom-transitions'
import {
  _SignIn, 
  _Welcome, 
  _Settings, 
  _FindSession, 
  _FindChurch, 
  _SessionItem,
  _ChurchItem, 
  _UserProfile, 
  _HigherBibleReadings, 
  _Read, 
  _Think, 
  _Respond, 
  _WeekList, 
  _BibleReadingList, 

} from './containers'

var _noAnimation = false

const MyTransitionSpec = ({
  duration: 400,
  timing: Animated.timing,
});

const MyTransitionSpecNoAnimation = ({
  duration: 0,
});

let TransitionConfiguration = () => {
  let _transitionSpec = !_noAnimation ? MyTransitionSpec : MyTransitionSpecNoAnimation

  return {
      // Define scene interpolation, eq. custom transition
      transitionSpec: _transitionSpec,
      screenInterpolator: (sceneProps) => {

          const {position, scene} = sceneProps;
          const {index, route} = scene;
          const params = route.params || {};
          const transition = params.transition || 'default'; 

         // console.log('index -' + sceneProps.scene.index)
         // console.log('routeName -' + sceneProps.scene.route.routeName)
         // console.log('scenes length -'+sceneProps.scenes.length)

          if (
            sceneProps.scene.index === 0 &&
            (sceneProps.scene.route.routeName !== 'SignIn') &&
            sceneProps.scenes.length > 0
          ) {

            _noAnimation = true

            return null

          } else {

            _noAnimation = false

            return {
                  WelcomeAnimation: customTransitions.WelcomeAnimation(index, position),
                  UserProfileAnimation: customTransitions.UserProfileAnimation(index, position),
                  SettingsInAnimation: customTransitions.SettingsInAnimation(index, position),
                  UserProfileAfterSettingsAnimation: customTransitions.UserProfileAfterSettingsAnimation(index, position),
                  LogoutAnimation: customTransitions.LogoutAnimation(index, position),
                  SignInAfterSettingsAnimation: customTransitions.SignInAfterSettingsAnimation(index, position),
                  BibleAnimation: customTransitions.BibleAnimation(index, position),
                  GoToReadLeftToRightAnimation: customTransitions.GoToReadLeftToRightAnimation(index, position),
                  GoToThinkLeftToRightAnimation: customTransitions.GoToThinkLeftToRightAnimation(index, position),
                  GoToRespondLeftToRightAnimation: customTransitions.GoToRespondLeftToRightAnimation(index, position),
                  GoToHigherRightToLeftAnimation: customTransitions.GoToHigherRightToLeftAnimation(index, position),
                  GoToReadRightToLeftAnimation: customTransitions.GoToReadRightToLeftAnimation(index, position),
                  GoToThinkRightToLeftAnimation: customTransitions.GoToThinkRightToLeftAnimation(index, position),
                  GoToUserProfileLeftToRightAnimation: customTransitions.GoToUserProfileLeftToRightAnimation (index, position),
                  AppUserBibleReadingAnimation: customTransitions.AppUserBibleReadingAnimation(index, position),
                  GoToWeekListRightToLeftAnimation: customTransitions.GoToWeekListRightToLeftAnimation(index, position),
                  SessionItemAnimation: customTransitions.SessionItemAnimation(index, position),
                  FindSessionAnimation: customTransitions.FindSessionAnimation(index, position),
                  FindChurchesAnimation: customTransitions.FindChurchesAnimation(index, position),
                  UserProfileOnStartSessionAnimation: customTransitions.UserProfileOnStartSessionAnimation(index, position),
                  GotoWelcomeAnimation: customTransitions.GotoWelcomeAnimation(index, position),
                  GotoChurchItemAnimation: customTransitions.GotoChurchItemAnimation(index, position),
                  UserProfileOnHomeAnimation: customTransitions.UserProfileOnHomeAnimation(index, position),
                  SignInOnHomeAnimation: customTransitions.SignInOnHomeAnimation(index, position),

                  default: customTransitions.MyTransition(index, position),
          }[transition];
        }
      }
  }
};

//if we are not Follow , and loginStatus === loggedInPlus

// if logginStatus === loggedIn cant goBack to UserProfile

let noAnimation = () => ({
  transitionSpec: {
    duration: 0,
  }
})

export const AppNavigator = StackNavigator({
  Welcome: {screen: _Welcome },
  SignIn: {screen: _SignIn },
  Settings : {screen: _Settings},
  FindSession: {screen: _FindSession},
  FindChurch: {screen: _FindChurch},
  SessionItem: {screen: _SessionItem},
  ChurchItem: {screen: _ChurchItem},
  UserProfile: {screen: _UserProfile},
  HigherBibleReadings: {screen: _HigherBibleReadings},
  BibleReadingList: { screen: _BibleReadingList},
  WeekList: {screen: _WeekList},
  Read: {screen: _Read},
  Think: {screen: _Think},
  Respond: {screen: _Respond}
},{ 
  headerMode: 'none', 
  initialRouteName: 'SignIn',
  transitionConfig: TransitionConfiguration,
  navigationOptions: {
 //   gesturesEnabled: false        // disable swaping between screens
  }
});

const AppWithNavigationState = ({ dispatch, nav , FCMtoken, screen}) => 
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav , FCMtoken, screen})} />


AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);

