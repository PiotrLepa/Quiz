import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {navigate} from '../navigation/NavigationUtils';
import {HOME_SCREEN, RESULTS_SCREEN, QUIZ_SCREEN} from '../Constants';

import AppButton from '../components/AppButton';
import TimerIndicator from '../components/TimerIndicator';

import QuizContext from '../QuizContext';

const createItem = (answer, questionIndex) => {
  console.log('answer: ', answer);
  return (
    <TouchableOpacity
      style={styles.item}
      key={Math.random() * 10000 * Math.random()}
      onPress={() => handleUserAnswer(questionIndex, answer.isCorrect)}>
      <Text style={styles.answerText}>{answer.content}</Text>
    </TouchableOpacity>
  );
};

const handleUserAnswer = (questionIndex, isCorrect) => {
  QuizContext.saveUserAnswer(questionIndex, isCorrect);
  if (QuizContext.isLastQuestion(questionIndex)) {
    navigate(RESULTS_SCREEN);
  } else {
    navigate(QUIZ_SCREEN, {questionIndex: questionIndex + 1});
  }
};

const QuizScreen = ({questionIndex}) => {
  const question = QuizContext.getQuestion(questionIndex);

  return (
    <>
      <View style={styles.container}>
        <TimerIndicator
          styles={{flex: 1}}
          maxValue={question.duration}
          onTimeOver={() => handleUserAnswer(questionIndex, false)}
        />
        <Text style={styles.questionText}>{question.question}</Text>
        <FlatList
        style={styles.answerList}
          data={question.answers}
          renderItem={({item}) => createItem(item, questionIndex)}
          keyExtractor={(item, index) => index.toString()}
        />
        <AppButton
          style={styles.button}
          onPress={() => navigate(HOME_SCREEN)}
          text="Cancel"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    width: '80%',
    alignSelf: 'center'
  },
  questionText: {
    textAlign: 'center',
    fontSize: 32,
    marginVertical: 24,
  },
  answerList: {
    flex: 1,
  },
  answerText: {
    textAlign: 'center',
    fontSize: 25,
    marginVertical: 12,
    padding: 12,
    borderColor: 'dodgerblue',
    borderWidth: 2,
    borderRadius: 16
  },
});

export default QuizScreen;
