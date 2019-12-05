import React from 'react';
import {StyleSheet, View, Text, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  navigateAndClearStack,
  showDrawerMenuIcon,
} from '../navigation/NavigationUtils';
import {SHOW_REGULATIONS_SCREEN_STORAGE, HOME_SCREEN} from '../Constants';
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
        <View style={styles.buttonsContainer}>
          <AppButton
            style={styles.button}
            onPress={() => {
              BackHandler.exitApp();
            }}
            text="Decline"
          />
          <AppButton
            style={styles.button}
            onPress={() => {
              saveToStorage();
              showDrawerMenuIcon(componentId);
              navigateAndClearStack(componentId, HOME_SCREEN);
            }}
            text="Accept"
          />
        </View>
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
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 32,
  },
  button: {
    flex: 1,
    marginVertical: 32,
    marginHorizontal: 16,
  },
});

export default RegulationsScreen;
