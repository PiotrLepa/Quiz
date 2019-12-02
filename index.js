import {Navigation} from 'react-native-navigation';
import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';
import RegulationsScreen from './screens/RegulationsScreen';

import {setNavigationRoot} from './navigation/NavigationUtils';
import {HOME_SCREEN, QUIZ_SCREEN, RESULTS_SCREEN, REGULATIONS_SCREEN} from './Constants';

Navigation.registerComponent(HOME_SCREEN, () => HomeScreen);
Navigation.registerComponent(QUIZ_SCREEN, () => QuizScreen);
Navigation.registerComponent(RESULTS_SCREEN, () => RESULTS_SCREEN);
Navigation.registerComponent(REGULATIONS_SCREEN, () => RegulationsScreen);

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
    },
  });
  setNavigationRoot(HomeScreen);
});
