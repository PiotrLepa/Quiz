import Drawer from './Drawer';
import {Navigation} from 'react-native-navigation';

import {
  HOME_SCREEN,
  QUIZ_SCREEN,
  RESULTS_SCREEN,
  REGULATIONS_SCREEN,
  MAIN_STACK_ID,
  DRAWER,
} from '../Constants';

import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultsScreen from '../screens/ResultsScreen';
import RegulationsScreen from '../screens/RegulationsScreen';

Navigation.registerComponent(DRAWER, () => Drawer);
Navigation.registerComponent(HOME_SCREEN, () => HomeScreen);
Navigation.registerComponent(QUIZ_SCREEN, () => QuizScreen);
Navigation.registerComponent(RESULTS_SCREEN, () => ResultsScreen);
Navigation.registerComponent(REGULATIONS_SCREEN, () => RegulationsScreen);

export const hideDrawer = componentId =>
  setDrawerVisibility(componentId, false);

export const showDrawer = componentId => setDrawerVisibility(componentId, true);

export const push = (componentId, targetComponentName, props) => {
  hideDrawer(componentId);
  Navigation.push(componentId, {
    component: {
      name: targetComponentName,
      passProps: props,
    },
  });
};

export const navigateAndClearStack = (componentId, targetComponentName, props) => {
  hideDrawer(componentId);
  Navigation.setStackRoot(componentId, {
    component: {
      name: targetComponentName,
      passProps: props,
    },
  });
};

export const pop = (componentId, targetComponentName, props) => {
  Navigation.pop(componentId, {
    component: {
      name: targetComponentName,
      passProps: props,
    },
  });
};

export const pushAndPop = (componentId, targetComponentName, props) => {
  // push(componentId, targetComponentName, props);
  // Navigation.setStackRoot(componentId, {
  //   component: {
  //     name: HOME_SCREEN,
  //     passProps: props,
  //   },
  // });
  Navigation.push(componentId, {
    component: {
      name: targetComponentName,
      passProps: props,
    },
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
  });
};

export const setNavigationRoot = component =>
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: 'drawerId',
            name: DRAWER,
          },
        },
        center: {
          stack: {
            id: MAIN_STACK_ID,
            children: [
              {
                component,
              },
            ],
          },
        },
      },
    },
  });

const setDrawerVisibility = (componentId, isVisible) =>
  Navigation.mergeOptions(componentId, {
    sideMenu: {
      left: {
        visible: isVisible,
      },
    },
  });
