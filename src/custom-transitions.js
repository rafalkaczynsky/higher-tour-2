export const WelcomeAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 1];
    const outputRange = [.8, 1, 1];
  
    const opacity = position.interpolate({
        inputRange,
        outputRange: [.7, 1, 1],
    });
  
    return {
        opacity,

    };
  };

 export const UserProfileAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      return {
          opacity,

      };
  };

// deafault
export const MyTransition = (index, position) => {
    return {
    };
  };
  
  export const SettingsInAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = 0

      const translateY= position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };
  };

  export const GotoWelcomeAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = 0

      const translateY= position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };
  };

  export const LogoutAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = position.interpolate({
        inputRange,
        outputRange: ([-100, 0, 0, 0]),
    });
      const translateY = 0
    
      return {
      
          transform: [
               {translateY},
               {translateX},
    
          ],
      };;
  };

  export const UserProfileAfterSettingsAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = 0

      const translateY= position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };;
  };

  export const SignInAfterSettingsAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = 0

      const translateY= position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };
  };

  export const BibleAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = 0

      const translateY= position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };;
  };

  export const GoToReadLeftToRightAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
      const translateY = 0
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };;
  };

  

  export const GoToThinkLeftToRightAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
      const translateY = 0
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };
  };

  export const GoToReflectRightToLeftAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
      const translateY = 0
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };;
  };

  //GoToFreebieRightToLeftAnimation

  export const GoToFreebieRightToLeftAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
      const translateY = 0
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };;
  };

  export const GoToRespondLeftToRightAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
      const translateY = 0
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };;
  };

  export const GoToThinkRightToLeftAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = position.interpolate({
        inputRange,
        outputRange: ([-100, 0, 0, 0]),
    });
      const translateY = 0
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };;
  };

  export const GoToReadRightToLeftAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = position.interpolate({
        inputRange,
        outputRange: ([-100, 0, 0, 0]),
    });
      const translateY = 0
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };;
  };

  export const GoToHigherRightToLeftAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = position.interpolate({
        inputRange,
        outputRange: ([-100, 0, 0, 0]),
    });
      const translateY = 0
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };;
  };

  export const GoToQuestionsAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
      const translateY = 0
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };;
  };

  export const GotoChurchItemAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateY = 0

      const translateX= position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };
  };

  export const GoToUserProfileLeftToRightAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = position.interpolate({
        inputRange,
        outputRange: ([-100, 0, 0, 0]),
    });
      const translateY = 0
    
      return {
      
          transform: [
                {translateY},
                {translateX}
          
          ],
      };
  };

  export const AppUserBibleReadingAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
    const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
    });
    
    const translateX = position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
    const translateY = 0
    
    return {
      
          transform: [
                {translateY},
                {translateX}
          
          ],
    };
  };


  export const GoToWeekListRightToLeftAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
      const translateY = 0
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };
  };

  export const SessionItemAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
      const translateY = 0
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}      
          ],
      };
  };

  export const FindSessionAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
      const translateY = 0
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          ],
      };
  };

  export const FindChurchesAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
      const translateY = 0
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          ],
      };
  };

  export const UserProfileOnStartSessionAnimation = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
      const translateY = 0
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };
  };

  export const UserProfileOnHomeAnimation   = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = 0

      const translateY= position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };
  };

  export const SignInOnHomeAnimation   = (index, position) => {
    const inputRange = [index - 1, index, index + 0.99, index + 1];
    
      const opacity = position.interpolate({
          inputRange,
          outputRange: ([0, 1, 1, 0]),
      });
    
      const translateX = 0

      const translateY= position.interpolate({
        inputRange,
        outputRange: ([100, 0, 0, 0]),
    });
    
      return {
          opacity,
          transform: [
                {translateY},
                {translateX}
          
          ],
      };
  };