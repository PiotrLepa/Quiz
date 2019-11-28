import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {navigate} from './NavigationUtils';
import {HOME_SCREEN, QUIZ_SCREEN} from '../Constants';

class Drawer extends React.Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <Text>Drawer</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigate(HOME_SCREEN)}>
            <Text style={styles.buttonText}>QuizScreen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigate(QUIZ_SCREEN)}>
            <Text style={styles.buttonText}>HomeScreen</Text>
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
