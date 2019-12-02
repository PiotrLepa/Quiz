import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {navigate} from '../navigation/NavigationUtils';

import {HOME_SCREEN} from '../Constants';

const QuizScreen = props => {
  return (
    <>
      <View style={styles.container}>
        <Text>{props.quiz[0].question}</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigate(HOME_SCREEN)}>
          <Text style={styles.buttonText}>HomeScreen</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

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
