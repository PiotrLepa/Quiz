import React from 'react';
import { StyleSheet, View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import _ from 'lodash';
import { navigateAndClearStack } from './NavigationUtils';
import { MAIN_STACK_ID, HOME_SCREEN, RESULTS_SCREEN, BASE_URL } from '../Constants';
import AppButton from '../components/AppButton';

import {
  openDatabase,
  closeDatabase,
  insertQuizzesIntoDatabase,
  loadQuizzesFromDatabase,
} from '../database/DatabaseUtils';

import ErrorHandler from '../ErrorHandler';

const Drawer = () => {

  const fetchQuizzes = () => {
    fetch(BASE_URL + 'tests')
      .then(response => response.json())
      .then(data => {
        openDatabase().then(() => {
          insertQuizzesIntoDatabase(data)
            .then(() => {
              closeDatabase();
              Snackbar.show({
                title: "Quizzes fetched successfully",
                duration: Snackbar.LENGTH_LONG,
              });
            })
            .catch(() => {
              closeDatabase();
              ErrorHandler.showError(error)
            });
        });
      })
      .catch(error => {
        console.log('fetchQuizzes: ', error);
        ErrorHandler.showError(error)
        setDataFromDatabase();
      });
  };

  const drawQuiz = () => {
    openDatabase().then(() => {
      loadQuizzesFromDatabase()
        .then(quizzess => {
          closeDatabase();
          const quiz = _.shuffle(quizzess)[0];
          push(MAIN_STACK_ID, QUIZ_SCREEN, { quizId: quiz.id })
        });
    })
      .catch(() => {
        closeDatabase();
        ErrorHandler.showError(error)
      });
  };

  return (
    <>
      <View style={styles.container}>
        <AppButton
          style={styles.button}
          text="Home"
          onPress={() => navigateAndClearStack(MAIN_STACK_ID, HOME_SCREEN)}
        />
        <AppButton
          style={styles.button}
          text="Results"
          onPress={() => navigateAndClearStack(MAIN_STACK_ID, RESULTS_SCREEN)}
        />
        <AppButton
          style={styles.button}
          text="Fetch Quizzess"
          onPress={() => fetchQuizzes()}
        />
        <AppButton
          style={styles.button}
          text="Draw a Quizz"
          onPress={() => drawQuiz()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  button: {
    marginVertical: 20,
    width: '60%',
  },
});

export default Drawer;
