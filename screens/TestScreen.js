import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const TestScreen: () => React$Node = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>TestScreen</Text>
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

export default TestScreen;
