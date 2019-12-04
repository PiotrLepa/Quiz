import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {navigate} from './NavigationUtils';
import {HOME_SCREEN, RESULTS_SCREEN} from '../Constants';

class Drawer extends React.Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigate(HOME_SCREEN)}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigate(RESULTS_SCREEN)}>
            <Text style={styles.buttonText}>Results</Text>
          </TouchableOpacity>
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
  buttonText: {
    fontSize: 32,
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: 'dodgerblue',
    margin: 12,
    padding: 16,
    borderRadius: 24,
  },
});

export default Drawer;
