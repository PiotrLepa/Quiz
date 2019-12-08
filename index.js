import {Navigation} from 'react-native-navigation';

import {setNavigationRoot} from './navigation/NavigationUtils';
import {HOME_SCREEN, DRAWER, MAIN_STACK_ID} from './Constants';

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      elevation: 0,
      visible: true,
      drawBehind: true,
      animate: false,
      title: {
        color: 'white',
        alignment: 'center',
      },
      background: {
        color: 'transparent',
      },
      leftButtons: [
        {
          id: 'toggleDrawer',
          icon: require('./assets/ic_menu.png'),
        },
      ],
    },
  });
  
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: 'drawerId',
            name: DRAWER
          },
        },
        center: {
          stack: {
            id: MAIN_STACK_ID,
            children: [
              {
                component: {
                  name: HOME_SCREEN
                },
              },
            ],
          },
        },
      },
    },
  });
});