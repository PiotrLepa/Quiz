import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, RefreshControl} from 'react-native';
import QuizContext from '../QuizContext';

const getResults = () => {
  return [
    {
      nick: 'Tomek',
      score: 5,
      total: 7,
      type: 'matematyka',
      date: '2019-11-16',
    },
    {
      nick: 'Adam',
      score: 7,
      total: 9,
      type: 'chemia',
      date: '2019-11-21',
    },
    {
      nick: 'Edward',
      score: 22,
      total: 33,
      type: 'biologia',
      date: '2019-10-01',
    },
    {
      nick: 'Marek',
      score: 18,
      total: 20,
      type: 'historia',
      date: '2019-11-01',
    },
  ];
};

const createItem = item => {
  return (
    <View
      style={styles.resultContainer}
      key={Math.random() * 10000 * Math.random()}>
      <Text style={styles.resultText}>Nick: {item.nick}</Text>
      <Text style={styles.resultText}>Score: {item.score}</Text>
      <Text style={styles.resultText}>Total: {item.total}</Text>
      <Text style={styles.resultText}>Type: {item.type}</Text>
      <Text style={styles.resultText}>Date: {item.date}</Text>
    </View>
  );
};

const ResultsScreen = () => {
  const [resultsData, setResultsData] = useState(getResults());

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshResults = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const renderCurrentQuizResult = () => {
    const result = QuizContext.getPointsResult();
    QuizContext.clear();

    if (result === null) return <View />;
    return (
      <Text style={styles.userResult}>
        You answered {result.score} of {result.maxPoints} correctly
      </Text>
    );
  };

  return (
    <>
      <View style={styles.container}>
        {renderCurrentQuizResult()}
        <FlatList
          data={resultsData}
          renderItem={({item}) => createItem(item)}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              onRefresh={refreshResults}
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
  },
  resultContainer: {
    backgroundColor: 'dodgerblue',
    flex: 1,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    elevation: 6,
  },
  resultText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Lato-Regular',
  },
  userResult: {
    fontSize: 35,
    textAlign: 'center',
    padding: 20,
    fontFamily: 'Lato-Bold',
  },
});

export default ResultsScreen;
