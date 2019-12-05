import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import QuizContext from '../QuizContext';
import {HOME_SCREEN, RESULTS_SCREEN} from '../Constants';
import {navigateAndClearStack} from '../navigation/NavigationUtils';
import AppButton from '../components/AppButton';

const UserResultScreen = ({componentId}) => {
  const result = QuizContext.getPointsResult();

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.content}>
          You answered {result.score} of {result.maxPoints} correctly
        </Text>
        <View style={styles.buttonsContainer}>
          <AppButton
            style={styles.button}
            onPress={() => navigateAndClearStack(componentId, HOME_SCREEN)}
            text="Next Quiz"
          />
          <AppButton
            style={styles.button}
            onPress={() => navigateAndClearStack(componentId, RESULTS_SCREEN)}
            text="Results"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    fontSize: 35,
    textAlign: 'center',
    padding: 20,
    fontFamily: 'Lato-Bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 32,
  },
  button: {
    flex: 1,
    marginVertical: 32,
    marginHorizontal: 16,
    justifyContent: 'center',
  },
});

export default UserResultScreen;
