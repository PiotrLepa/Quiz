import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { navigateAndClearStack } from '../navigation/NavigationUtils';
import { HOME_SCREEN, USER_RESULT_SCREEN, BASE_URL } from '../Constants';

import AppButton from '../components/AppButton';
import TimerIndicator from '../components/TimerIndicator';

import QuizContext from '../QuizContext';

const QuizScreen = ({ componentId, quizId }) => {
  useEffect(() => {
    fetchQuizDetails();
  }, [0]);

  const [taskIndex, setTaskIndex] = useState(0);

  const [task, setTask] = useState();

  const [refreshTimer, setRefreshTimer] = useState(false);

  const [isFetching, setIsFetching] = useState(true);

  const fetchQuizDetails = () => {
    fetch(BASE_URL + 'test/' + quizId)
      .then(response => response.json())
      .then(data => {
        QuizContext.setQuiz(data);
        setTask(QuizContext.getTask(taskIndex));
        setIsFetching(false);
      })
      .catch(reason => console.log(reason));
  };

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
    QuizContext.saveUserAnswer(taskIndex, isCorrect);
    if (QuizContext.isLastQuestion(taskIndex)) {
      navigateAndClearStack(componentId, USER_RESULT_SCREEN);
    } else {
      renderNextTask();
    }
  };

  const renderNextTask = () => {
    setRefreshTimer(true);
    const nextIndex = taskIndex + 1;
    setTask(QuizContext.getTask(nextIndex));
    setTaskIndex(nextIndex);
  }

  if (isFetching) {
    return (
      <>
        <Text>Fetching</Text>
      </>
    );
  } else {
    return (
      <>
        <View style={styles.container}>
          <TimerIndicator
            styles={{ flex: 1 }}
            maxValue={task.duration}
            onTimeOver={() => handleUserAnswer(false)}
            shouldRefresh={refreshTimer}
            onRefreshed={() => setRefreshTimer(false)}
          />
          <Text style={styles.questionText}>{taskIndex + 1}. {task.question}</Text>
          <FlatList
            style={styles.answerList}
            data={task.answers}
            renderItem={({ item }) => createItem(item)}
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
  }
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
    fontSize: 25,
    marginVertical: 24,
    fontFamily: 'Lato-Bold',
  },
  answerList: {
    flex: 1,
  },
  answerText: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 12,
    padding: 12,
    borderColor: 'dodgerblue',
    borderWidth: 2,
    borderRadius: 16,
    fontFamily: 'Lato-Regular',
  },
});

export default QuizScreen;
