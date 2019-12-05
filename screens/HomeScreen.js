import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import {Navigation} from 'react-native-navigation';
import {push, showDrawer, hideDrawerMenuIcon, navigateAndClearStack} from '../navigation/NavigationUtils';
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
        duration: 15,
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
        duration: 15,
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
        duration: 15,
      },
    ],
  ];
};

const HomeScreen = ({componentId}) => {
  const [quizzesData, setQuizzesData] = useState(getQuizzes());

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
    Navigation.events().registerNavigationButtonPressedListener(
      ({componentId}) => showDrawer(componentId),
    );
    shouldShowRegulationsScreen().then(shouldShow => {
      if (shouldShow) {
        hideDrawerMenuIcon(componentId);
        navigateAndClearStack(componentId, REGULATIONS_SCREEN);
      }
    });
  });

  const refreshQuizzes = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const createItem = (quiz, index) => {
    return (
      <View style={styles.quizContainer}>
        <TouchableOpacity
          key={Math.random() * 10000 * Math.random()}
          onPress={() => {
            QuizContext.setCurrentQuiz(quiz);
            push(componentId, QUIZ_SCREEN);
          }}>
          <Text style={styles.quizTitle}>Quiz #{index + 1}</Text>
          <Text style={styles.quizDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            volutpat lectus et justo lacinia pharetra. Aliquam rutrum maximus
            gravida. Aliquam et sapien neque.
          </Text>
        </TouchableOpacity>
      </View>
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

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={quizzesData}
          renderItem={({item, index}) => createItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              onRefresh={refreshQuizzes}
              refreshing={isRefreshing}
              tintColor="dodgerblue"
              colors={['dodgerblue']}
            />
          }
        />
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
  quizContainer: {
    backgroundColor: 'dodgerblue',
    flex: 1,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    elevation: 6,
  },
  quizTitle: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    padding: 12,
    fontFamily: 'Lato-Bold',
  },
  quizDescription: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
    padding: 8,
    fontFamily: 'Lato-Regular',
  },
});

export default HomeScreen;
