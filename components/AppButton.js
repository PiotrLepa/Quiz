import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const AppButton = ({text, onPress, style, textStyle}) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'dodgerblue',
    borderRadius: 20,
    padding: 20,
    elevation: 6,
  },
  buttonText: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
  },
});

export default AppButton;
