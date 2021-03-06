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
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import {Navigation} from 'react-native-navigation';
import _ from 'lodash';
import {
  push,
  showDrawer,
  hideDrawerMenuIcon,
  navigateAndClearStack,
} from '../navigation/NavigationUtils';
import {
  REGULATIONS_SCREEN,
  QUIZ_SCREEN,
  SHOW_REGULATIONS_SCREEN_STORAGE,
  BASE_URL,
} from '../utils/Constants';
import {
  openDatabase,
  closeDatabase,
  insertQuizzesIntoDatabase,
  loadQuizzesFromDatabase,
} from '../database/DatabaseUtils';
import {NoConnectivityException} from '../utils/Exceptions';
import ErrorHandler from '../utils/ErrorHandler';

const HomeScreen = ({componentId}) => {
  const [quizzesData, setQuizzesData] = useState([]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
    Navigation.events().registerNavigationButtonPressedListener(
      ({componentId}) => showDrawer(componentId),
    );
    let unsubscribe;
    shouldShowRegulationsScreen().then(shouldShow => {
      if (shouldShow) {
        hideDrawerMenuIcon(componentId);
        navigateAndClearStack(componentId, REGULATIONS_SCREEN);
      } else {
        openDatabase().then(() => {
          unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected) {
              fetchQuizzes();
            } else {
              setDataFromDatabase();
              ErrorHandler.showError(new NoConnectivityException());
            }
          });
        });
      }
    });

    return () => {
      closeDatabase();
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [componentId]);

  const fetchQuizzes = () => {
    setIsRefreshing(true);
    fetch(BASE_URL + 'tests')
      .then(response => response.json())
      .then(data => {
        insertQuizzesIntoDatabase(data)
          .then(() => setDataFromDatabase())
          .catch(() => setDataFromDatabase());
      })
      .catch(error => {
        console.log('fetchQuizzes: ', error);
        ErrorHandler.showError(error);
        setDataFromDatabase();
      });
  };

  const setDataFromDatabase = () => {
    loadQuizzesFromDatabase().then(quizzes => {
      setQuizzesData(_.shuffle(quizzes));
      setIsRefreshing(false);
    });
  };

  const createItem = (
    {id, name, description, tags, level, numberOfTasks},
    index,
  ) => {
    return (
      <View style={styles.quizContainer}>
        <TouchableOpacity
          key={id}
          onPress={() => push(componentId, QUIZ_SCREEN, {quizId: id})}>
          <Text style={styles.quizTitle}>
            Quiz #{index + 1} {name}
          </Text>
          <Text style={styles.quizDescription}>{description}</Text>
          <Text style={styles.quizInfo}>Tags: {tags.join(',')}</Text>
          <Text style={styles.quizInfo}>Level: {level}</Text>
          <Text style={styles.quizInfo}>Number Of Tasks: {numberOfTasks}</Text>
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
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              onRefresh={fetchQuizzes}
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
    fontSize: 20,
    color: 'white',
    padding: 8,
    fontFamily: 'Lato-Regular',
  },
  quizInfo: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
    padding: 8,
    fontFamily: 'Lato-Light',
  },
});

export default HomeScreen;
