import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {Navigation} from 'react-native-navigation';

class QuizScreen extends React.Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <Text>QuizScreen</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.navigateToScreen('HomeScreen')}>
            <Text style={styles.buttonText}>HomeScreen</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  navigateToScreen(componentName) {
    Navigation.push(this.props.componentId, {
      component: {
        name: componentName,
      },
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

export default QuizScreen;
