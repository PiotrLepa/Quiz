import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {navigate} from '../navigation/NavigationUtils';
import {HOME_SCREEN, RESULTS_SCREEN, QUIZ_SCREEN} from '../Constants';

import TimerIndicator from '../components/TimerIndicator';

import QuizContext from '../QuizContext';

const createSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        marginLeft: '14%',
      }}
    />
  );
};

const createItem = (answer, questionIndex) => {
  console.log('answer: ', answer)
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
          maxValue={15}
          onTimeOver={() => handleUserAnswer(questionIndex, false)}
        />
        <Text style={styles.questionText}>{question.question}</Text>
        <FlatList
          ItemSeparatorComponent={() => createSeparator()}
          data={question.answers}
          renderItem={({item}) => createItem(item, questionIndex)}
          keyExtractor={(item, index) => index.toString()}
        />
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
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 32,
  },
  answerText: {
    fontSize: 25,
  },
});

export default QuizScreen;
