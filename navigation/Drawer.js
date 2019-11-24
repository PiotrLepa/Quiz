import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class Drawer extends React.Component {

  render() {
    return (
      <>
        <View style={styles.container}>
          <Text>Drawer</Text>
        </View>
      </>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});

export default Drawer;
