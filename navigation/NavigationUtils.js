import Drawer from './Drawer';
import {Navigation} from 'react-native-navigation';

import {
  HOME_SCREEN,
  QUIZ_SCREEN,
  RESULTS_SCREEN,
  REGULATIONS_SCREEN,
  USER_RESULT_SCREEN,
  DRAWER,
} from '../utils/Constants';

import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultsScreen from '../screens/ResultsScreen';
import RegulationsScreen from '../screens/RegulationsScreen';
import UserResultScreen from '../screens/UserResultScreen';

Navigation.registerComponent(DRAWER, () => Drawer);
Navigation.registerComponent(HOME_SCREEN, () => HomeScreen);
Navigation.registerComponent(QUIZ_SCREEN, () => QuizScreen);
Navigation.registerComponent(RESULTS_SCREEN, () => ResultsScreen);
Navigation.registerComponent(USER_RESULT_SCREEN, () => UserResultScreen);
Navigation.registerComponent(REGULATIONS_SCREEN, () => RegulationsScreen);

export const hideDrawer = componentId =>
  setDrawerVisibility(componentId, false);

export const showDrawer = componentId => setDrawerVisibility(componentId, true);

const setDrawerVisibility = (componentId, isVisible) =>
  Navigation.mergeOptions(componentId, {
    sideMenu: {
      left: {
        visible: isVisible,
      },
    },
  });

export const push = (componentId, targetComponentName, props) => {
  hideDrawer(componentId);
  Navigation.push(componentId, {
    component: {
      name: targetComponentName,
      passProps: props,
    },
  });
};

export const navigateAndClearStack = (
  componentId,
  targetComponentName,
  props,
) => {
  hideDrawer(componentId);
  Navigation.setStackRoot(componentId, {
    component: {
      name: targetComponentName,
      passProps: props,
    },
  });
};

export const hideDrawerMenuIcon = componentId => {
  Navigation.mergeOptions(componentId, {
    topBar: {
      visible: false,
      leftButtons: null,
    },
  });
};

export const showDrawerMenuIcon = componentId => {
  Navigation.mergeOptions(componentId, {
    topBar: {
      visible: true,
      leftButtons: [
        {
          id: 'toggleDrawer',
          icon: require('../assets/ic_menu.png'),
        },
      ],
    },
  });
};
