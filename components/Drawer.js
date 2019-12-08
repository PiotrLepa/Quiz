import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {Navigation} from 'react-native-navigation';

class Drawer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.navigateToScreen('TestScreen')}>
          <Text style={styles.buttonText}>TestScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.navigateToScreen('ResultScreen')}>
          <Text style={styles.buttonText}>ResultScreen</Text>
        </TouchableOpacity>
      </View>
    );
  }

  navigateToScreen = screenName => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
      },
    });
  };
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
    color: 'white'
  },
  buttonContainer: {
    backgroundColor: 'dodgerblue',
    margin: 12,
    padding: 16,
    borderRadius: 24,
  },
});

export default Drawer;
