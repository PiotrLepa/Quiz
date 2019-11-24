import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {Navigation} from 'react-native-navigation';

class Drawer extends React.Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <Text>Drawer</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.navigateToScreen('QuizScreen')}>
            <Text style={styles.buttonText}>QuizScreen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.navigateToScreen('HomeScreen')}>
            <Text style={styles.buttonText}>HomeScreen</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  navigateToScreen(componentName) {
    this.hideDrawer();
    // Navigation.setRoot({
    //   root: {
    //     sideMenu: {
    //       left: {
    //         component: {
    //           id: 'drawerId',
    //           name: 'Drawer',
    //         }
    //       },
    //       center: {
    //         stack: {
    //           id: 'MainStack',
    //           children: [
    //             {
    //               component: {
    //                 id: 'HomeScreenId',
    //                 name: 'HomeScreen',
    //               }
    //             },
    //           ],
    //         }
    //       }
    //     }
    //   }
    // });
    // Navigation.push(this.props.componentId, {
    //   component: {
    //     name: componentName,
    //   },
    // });
  }

  hideDrawer() {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: false,
        },
      },
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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

export default Drawer;
