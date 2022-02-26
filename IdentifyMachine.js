import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as Permissions from 'expo-permissions';

export default class IdentifyMachine extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null
    };
    const { navigation } = this.props;
    this.navigation = navigation;
  }

  pressScan = () => {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const {
      status
    } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted'
    });
    if (this.state.hasCameraPermission === null) {

    } else if (this.state.hasCameraPermission === false) {

    } else if (this.state.hasCameraPermission === true) {
      this.navigation.navigate('QRscanner');
    }
  };

  render() {

    return (
      <View style={styles.container}>

        <View style={styles.viewBorder}>
          <TouchableOpacity onPress={()=>this.pressScan()}>
            <View style={styles.viewCenter}>
              <MaterialCommunityIcons name="qrcode-scan" size={150} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Tab to Scan QR</Text>
        <StatusBar style='dark' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewCenter: {
    height: 200,
    width: 200,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  viewBorder: {
    height: 260,
    width: 260,
    borderWidth: 10,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  },
  viewBorder2: {
    height: 400,
    width: 290,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'red'
  }
});