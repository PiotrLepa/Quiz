import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';

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
    <View style={styles.item} key={Math.random() * 10000 * Math.random()}>
      <Text>{item.nick}</Text>
      <Text>{item.score}</Text>
      <Text>{item.total}</Text>
      <Text>{item.type}</Text>
      <Text>{item.date}</Text>
    </View>
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

const ResultsScreen = () => {
  const [resultsData, setResultsData] = useState(getResults());

  return (
    <>
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={() => createSeparator()}
          data={resultsData}
          renderItem={({item}) => createItem(item)}
          keyExtractor={(item, index) => index.toString()}
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
  item: {
    backgroundColor: 'dodgerblue',
    flex: 1,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default ResultsScreen;
