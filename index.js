/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import App from './App';
import TestScreen from './screens/TestScreen'
import ResultScreen from './screens/ResultScreen'

Navigation.registerComponent('App', () => App);
Navigation.registerComponent('TestScreen', () => TestScreen);
Navigation.registerComponent('ResultScreen', () => ResultScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'AppStack',
        children: [
          {
            component: {
              name: 'App'
            }
          }
        ]
      }
    },
  });
});
