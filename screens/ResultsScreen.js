import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList, RefreshControl} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {BASE_URL} from '../utils/Constants';
import {NoConnectivityException} from '../utils/Exceptions';
import ErrorHandler from '../utils/ErrorHandler';

const ResultsScreen = ({componentId}) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        fetchResults();
      } else {
        ErrorHandler.showError(new NoConnectivityException());
      }
    });
    return unsubscribe;
  }, [componentId]);

  const [resultsData, setResultsData] = useState();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchResults = () => {
    fetch(BASE_URL + 'results')
      .then(response => response.json())
      .then(data => {
        setIsRefreshing(false);
        setResultsData(data.reverse());
      })
      .catch(error => {
        console.log('fetchResults: ', error);
        ErrorHandler.showError(error);
      });
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

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={resultsData}
          renderItem={({item}) => createItem(item)}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              onRefresh={fetchResults}
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
