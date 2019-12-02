import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {navigate} from '../navigation/NavigationUtils';
import {HOME_SCREEN, RESULTS_SCREEN, QUIZ_SCREEN} from '../Constants';

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
  return (
    <TouchableOpacity
      style={styles.item}
      key={Math.random() * 10000 * Math.random()}
      onPress={() => {
        QuizContext.saveUserAnswer(questionIndex, answer.correct);
        if (QuizContext.isLastQuestion(questionIndex)) {
          navigate(RESULTS_SCREEN);
        } else {
          navigate(QUIZ_SCREEN, {questionIndex: questionIndex + 1});
        }
      }}>
      <Text>{answer.content}</Text>
    </TouchableOpacity>
  );
};

const QuizScreen = ({questionIndex}) => {
  const question = QuizContext.getQuestion(questionIndex);

  return (
    <>
      <View style={styles.container}>
        <Text>{question.question}</Text>
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
