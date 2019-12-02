import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

class QuizScreen extends React.Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <Text>ResultsScreen</Text>
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
  },
});

export default QuizScreen;
