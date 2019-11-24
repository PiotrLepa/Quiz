import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { Navigation } from 'react-native-navigation';

class HomeScreen extends React.Component {

  render() {
    return (
      <>
        <View>
          <Text>Home</Text>
          <TouchableOpacity style={styles.button} onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'QuizScreen'
              },
            })
          }} >
            <Text>Navigate</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
  }
});

export default HomeScreen;
