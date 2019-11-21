import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const ResultScreen: () => React$Node = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>ResultScreen</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  }
});

export default ResultScreen;
