/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import App from './App';
import Splash from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';

Navigation.registerComponent('navigation.playground.WelcomeScreen', () => App);

// Navigation.events().registerAppLaunchedListener(() => {
//   Navigation.setRoot({
//     root: {
//       component: {
//         name: 'navigation.playground.WelcomeScreen',
//       },
//     },
//   });
// });

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      elevation: 0,
      visible: false,
      drawBehind: true,
      animate: false,
      title: {
        color: 'white',
        alignment: 'center',
      },
      background: {
        color: 'transparent',
      },
    }
  });

  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: 'drawerId',
            name: 'QuizScreen',
          }
        },
        center: {
          stack: {
            id: 'MainStack',
            children: [
              {
                component: {
                  name: 'Splash',
                }
              },
            ],
          }
        }
      }
    }
  });
});