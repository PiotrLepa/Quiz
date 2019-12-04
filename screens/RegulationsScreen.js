import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {dismissModal} from '../navigation/NavigationUtils';
import {SHOW_REGULATIONS_SCREEN_STORAGE} from '../Constants';
import AppButton from '../components/AppButton';

const RegulationsScreen = ({componentId}) => {
  
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

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>
          You have to accept the terms and conditions.
          </Text>
        </View>
        <AppButton
          style={styles.buttonContainer}
          onPress={() => {
            saveToStorage();
            dismissModal(componentId);
          }}
          text="Accept"
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
  contentContainer: {
    padding: 12,
    margin: 24,
    borderColor: 'dodgerblue',
    borderRadius: 20,
    borderWidth: 1,
  },
  contentText: {
    fontSize: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 32,
  },
});

export default RegulationsScreen;
