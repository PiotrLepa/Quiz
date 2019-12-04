import React from 'react';
import {StyleSheet, View} from 'react-native';

import {navigateAndClearStack} from './NavigationUtils';
import {HOME_SCREEN, RESULTS_SCREEN} from '../Constants';
import AppButton from '../components/AppButton';

class Drawer extends React.Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <AppButton
            style={styles.button}
            text="Home"
            onPress={() => navigateAndClearStack('drawerId', HOME_SCREEN)}
          />
          <AppButton
            style={styles.button}
            text="Results"
            onPress={() => navigateAndClearStack('drawerId', RESULTS_SCREEN)}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  button: {
    marginVertical: 20,
    width: '60%',
  },
});

export default Drawer;
