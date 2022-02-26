import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Splash extends Component {


  constructor(props) {
    super(props);
    this.state = {
    };
    const {navigation} = this.props;
        this.navigation = navigation;
  }

  componentDidMount() {
    setTimeout(() => {
        console.log("test");
        this.navigation.navigate('IdentifyMachine');
        this.navigation.reset({index:0,routes:[{name:'IdentifyMachine'}]});
      }, 2000)
  }

  render() {

    return (
      <View style={styles.container}>
           <MaterialCommunityIcons name="cup-water" size={200} color="black" />
           <StatusBar style='dark' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
