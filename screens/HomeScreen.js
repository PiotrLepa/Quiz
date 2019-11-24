import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {Navigation} from 'react-native-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <Text>HomeScreen</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.navigateToScreen('QuizScreen')}>
            <Text style={styles.buttonText}>QuizScreen</Text>
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

export default HomeScreen;
