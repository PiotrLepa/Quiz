/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import App from './App';
import Drawer from './components/Drawer';
import TestScreen from './screens/TestScreen';
import ResultScreen from './screens/ResultScreen';

Navigation.registerComponent('App', () => App);
Navigation.registerComponent('Drawer', () => Drawer);
Navigation.registerComponent('TestScreen', () => TestScreen);
Navigation.registerComponent('ResultScreen', () => ResultScreen);

// const {width} = Dimensions.get('window');
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      elevation: 0,
      visible: false,
      drawBehind: false,
      animate: false,
      title: {
        color: 'white',
        alignment: 'center',
      },
      background: {
        color: 'transparent',
      },
    },
  });

  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: 'drawerId',
            name: 'Drawer',
          },
        },
        center: {
          stack: {
            id: 'MainStack',
            children: [
              {
                component: {
                  name: 'App',
                  options: {
                    topBar: {
                      title: {
                        text: 'Welcome',
                      },
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  });
});

// Navigation.events().registerAppLaunchedListener(() => {
//   Navigation.setRoot({
//     root: {
//       stack: {
//         id: 'AppStack',
//         children: [
//           {
//             component: {
//               name: 'App',
//               options: {
//                 topBar: {
//                   title: {
//                     text: 'Welcome',
//                   },
//                 },
//               },
//             },
//           },
//         ],
//       },
//     },
//   });
// });
