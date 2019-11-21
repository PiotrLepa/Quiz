import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

import {Navigation} from 'react-native-navigation';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Main Screen</Text>
        <Button
          title="TestScreen"
          onPress={() => this.navigateToScreen('TestScreen')}
        />
        <Button
          title="ResultScreen"
          onPress={() => this.navigateToScreen('ResultScreen')}
        />
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
  },
});

export default App;
