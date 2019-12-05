import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {navigateAndClearStack} from '../navigation/NavigationUtils';
import {HOME_SCREEN, USER_RESULT_SCREEN} from '../Constants';

import AppButton from '../components/AppButton';
import TimerIndicator from '../components/TimerIndicator';

import QuizContext from '../QuizContext';

const QuizScreen = ({componentId}) => {
  const [questionIndex, setQuestionIndex] = useState(0);

  const [refreshTimer, setRefreshTimer] = useState(false);

  const question = QuizContext.getQuestion(questionIndex);

  const createItem = answer => {
    return (
      <TouchableOpacity
        style={styles.item}
        key={Math.random() * 10000 * Math.random()}
        onPress={() => handleUserAnswer(answer.isCorrect)}>
        <Text style={styles.answerText}>{answer.content}</Text>
      </TouchableOpacity>
    );
  };

  const handleUserAnswer = isCorrect => {
    QuizContext.saveUserAnswer(questionIndex, isCorrect);
    if (QuizContext.isLastQuestion(questionIndex)) {
      navigateAndClearStack(componentId, USER_RESULT_SCREEN);
    } else {
      setRefreshTimer(true);
      setQuestionIndex(questionIndex + 1);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TimerIndicator
          styles={{flex: 1}}
          maxValue={question.duration}
          onTimeOver={() => handleUserAnswer(false)}
          shouldRefresh={refreshTimer}
          onRefreshed={() => setRefreshTimer(false)}
        />
        <Text style={styles.questionText}>{question.question}</Text>
        <FlatList
          style={styles.answerList}
          data={question.answers}
          renderItem={({item}) => createItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
        <AppButton
          style={styles.button}
          onPress={() => navigateAndClearStack(componentId, HOME_SCREEN)}
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
    alignSelf: 'center',
  },
  questionText: {
    textAlign: 'center',
    fontSize: 32,
    marginVertical: 24,
    fontFamily: 'Lato-Bold',
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
    borderRadius: 16,
    fontFamily: 'Lato-Regular',
  },
});

export default QuizScreen;
