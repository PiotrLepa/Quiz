import React from 'react';
import {StyleSheet, View} from 'react-native';
import {navigateAndClearStack} from './NavigationUtils';
import {MAIN_STACK_ID, HOME_SCREEN, RESULTS_SCREEN} from '../Constants';
import AppButton from '../components/AppButton';

const Drawer = () => {
  return (
    <>
      <View style={styles.container}>
        <AppButton
          style={styles.button}
          text="Home"
          onPress={() => navigateAndClearStack(MAIN_STACK_ID, HOME_SCREEN)}
        />
        <AppButton
          style={styles.button}
          text="Results"
          onPress={() => navigateAndClearStack(MAIN_STACK_ID, RESULTS_SCREEN)}
        />
      </View>
    </>
  );
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
