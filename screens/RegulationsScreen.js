import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {push} from '../navigation/NavigationUtils';
import {HOME_SCREEN, SHOW_REGULATIONS_SCREEN_STORAGE} from '../Constants';

const saveToStorage = async () => {
  try {
    await AsyncStorage.setItem(
      SHOW_REGULATIONS_SCREEN_STORAGE,
      SHOW_REGULATIONS_SCREEN_STORAGE,
    );
  } catch (e) {
    return false;
  }
};

const RegulationsScreen = ({componentId}) => {
  useEffect(() => {
    saveToStorage();
  });

  return (
    <>
      <View style={styles.container}>
        <Text>Regulamin</Text>
        <Text>Przechodząc dalej akceptujesz regulamin</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => push(componentId, HOME_SCREEN)}>
          <Text style={styles.buttonText}>HOME SCREEN</Text>
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

export default RegulationsScreen;
