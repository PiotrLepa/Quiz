import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import QuizContext from '../utils/QuizContext';
import {HOME_SCREEN, RESULTS_SCREEN, BASE_URL} from '../utils/Constants';
import {navigateAndClearStack} from '../navigation/NavigationUtils';
import AppButton from '../components/AppButton';
import {NoConnectivityException} from '../utils/Exceptions';
import ErrorHandler from '../utils/ErrorHandler';

const UserResultScreen = ({componentId}) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        saveUserResult();
      } else {
        ErrorHandler.showError(new NoConnectivityException());
      }
    });
    return unsubscribe;
  }, [componentId]);

  const result = QuizContext.getPointsResult();

  const saveUserResult = () => {
    fetch(BASE_URL + 'result', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nick: 'Piotrek',
        score: result.score,
        total: result.maxPoints,
        type: QuizContext.getQuizType(),
        date: new Date().toLocaleDateString(),
      }),
    }).catch(error => {
      console.log('saveUserResult: ', error);
      ErrorHandler.showError(error);
    });
  };

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
