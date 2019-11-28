import Drawer from './Drawer';
import {Navigation} from 'react-native-navigation';

import {DRAWER} from '../Constants';

Navigation.registerComponent(DRAWER, () => Drawer);

export const hideDrawer = componentId =>
  setDrawerVisibility(componentId, false);

export const showDrawer = componentId => setDrawerVisibility(componentId, true);

export const navigate = targetComponentName => {
  setNavigationRoot({
    name: targetComponentName,
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
            id: 'MainStack',
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
