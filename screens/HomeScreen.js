import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import {Navigation} from 'react-native-navigation';
import {navigate, showDrawer} from '../navigation/NavigationUtils';
import {
  REGULATIONS_SCREEN,
  QUIZ_SCREEN,
  SHOW_REGULATIONS_SCREEN_STORAGE,
} from '../Constants';

import QuizContext from '../QuizContext';

const getQuizzes = () => {
  return [
    [
      {
        question:
          'Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą?',
        answers: [
          {
            content: 'Lucjusz Cynna',
            isCorrect: true,
          },
          {
            content: 'Lucjusz Ceezar',
            isCorrect: false,
          },
          {
            content: 'Lucjusz Murena',
            isCorrect: false,
          },
          {
            content: 'Marek Krassus',
            isCorrect: false,
          },
        ],
        duration: 30,
      },
      {
        question: 'Który mamy wiek?',
        answers: [
          {
            content: 'XIX',
            isCorrect: false,
          },
          {
            content: 'XX',
            isCorrect: false,
          },
          {
            content: 'XXI',
            isCorrect: true,
          },
          {
            content: 'XXV',
            isCorrect: false,
          },
        ],
        duration: 30,
      },
      {
        question: '2+2*2 to: ',
        answers: [
          {
            content: '8',
            isCorrect: false,
          },
          {
            content: '6',
            isCorrect: true,
          },
          {
            content: '12',
            isCorrect: false,
          },
          {
            content: '9',
            isCorrect: false,
          },
        ],
        duration: 30,
      },
    ],
    [
      {
        question: '2+2*2 to: ',
        answers: [
          {
            content: '8',
            isCorrect: false,
          },
          {
            content: '6',
            isCorrect: true,
          },
          {
            content: '12',
            isCorrect: false,
          },
          {
            content: '9',
            isCorrect: false,
          },
        ],
        duration: 30,
      },
      {
        question:
          'Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą?',
        answers: [
          {
            content: 'Lucjusz Cynna',
            isCorrect: true,
          },
          {
            content: 'Lucjusz Ceezar',
            isCorrect: false,
          },
          {
            content: 'Lucjusz Murena',
            isCorrect: false,
          },
          {
            content: 'Marek Krassus',
            isCorrect: false,
          },
        ],
        duration: 30,
      },
      {
        question: 'Który mamy wiek?',
        answers: [
          {
            content: 'XIX',
            isCorrect: false,
          },
          {
            content: 'XX',
            isCorrect: false,
          },
          {
            content: 'XXI',
            isCorrect: true,
          },
          {
            content: 'XXV',
            isCorrect: false,
          },
        ],
        duration: 30,
      },
    ],
  ];
};

const createItem = (quiz, index) => {
  return (
    <TouchableOpacity
      style={styles.item}
      key={Math.random() * 10000 * Math.random()}
      onPress={() => {
        QuizContext.setCurrentQuiz(quiz);
        navigate(QUIZ_SCREEN, {questionIndex: index})
      }}>
      <Text>Quiz #{index + 1}</Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed volutpat
        lectus et justo lacinia pharetra. Aliquam rutrum maximus gravida.
        Aliquam et sapien neque.
      </Text>
    </TouchableOpacity>
  );
};

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

const shouldShowRegulationsScreen = async () => {
  try {
    const showRegulationsScreen = await AsyncStorage.getItem(
      SHOW_REGULATIONS_SCREEN_STORAGE,
    );
    return showRegulationsScreen === null;
  } catch (e) {
    return true;
  }
};

const HomeScreen = () => {
  useEffect(() => {
    SplashScreen.hide();
    Navigation.events().registerNavigationButtonPressedListener(
      ({componentId}) => showDrawer(componentId),
    );
    shouldShowRegulationsScreen().then(shouldShow => {
      if (shouldShow) {
        navigate(REGULATIONS_SCREEN);
      }
    });
  });

  const [quizzesData, setQuizzesData] = useState(getQuizzes());

  return (
    <>
      <View style={styles.container}>
        <Text>HomeScreen</Text>
        <FlatList
          ItemSeparatorComponent={() => createSeparator()}
          data={quizzesData}
          renderItem={({item, index}) => createItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigate(QUIZ_SCREEN)}>
          <Text style={styles.buttonText}>QuizScreen</Text>
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
  item: {
    backgroundColor: 'dodgerblue',
    flex: 1,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default HomeScreen;
