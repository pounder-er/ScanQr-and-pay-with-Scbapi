import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Splash from './Splash';
import IdentifyMachine from './IdentifyMachine';
import QRscanner from './QRscanner';
import ChooseBeverage from './ChooseBeverage';
import ChooseSize from './ChooseSize';
import Payment from './Payment';

import { useRoute } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  return (
    <Splash navigation={navigation} />
  );
}

const IdentifyMachineScreen = () => {
  const navigation = useNavigation();
  return (
    <IdentifyMachine navigation={navigation} />
  );
}

const QRscannerScreen = () => {
  const navigation = useNavigation();
  return (
    <QRscanner navigation={navigation} />
  );
}

const ChooseBeverageScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <ChooseBeverage navigation={navigation} route={route} />
  );
}

const ChooseSizeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <ChooseSize navigation={navigation} route={route} />
  );
}

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <Payment navigation={navigation} route={route} />
  );
}

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Splash" component={SplashScreen} />
      <Stack.Screen options={{ headerShown: false }} name="IdentifyMachine" component={IdentifyMachineScreen} />
      <Stack.Screen options={{ headerShown: false }} name="QRscanner" component={QRscannerScreen} />
      <Stack.Screen options={{ headerShown: false }} name="ChooseBeverage" component={ChooseBeverageScreen} />
      <Stack.Screen options={{ headerShown: false }} name="ChooseSize" component={ChooseSizeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
}

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }



  // onPress=async()=>{
  //   await realtimeDB.updateData('-MKZhqh6lOE08pT9l-CI','numStep',this.state.i);
  //   this.setState({i:this.state.i+=1})
  //   //scb.requestToken();
  // }

  // onPress2=()=>{
  //   scb.createDataQRcode(500);
  // }

  render() {

    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>

      //<Payment/>
      // <View style={styles.container}>
      //   <TouchableOpacity onPress={this.onPress}>
      //     <Text>press sieeee1</Text>
      //   </TouchableOpacity> 
      //   <TouchableOpacity onPress={this.onPress2}>
      //     <Text>press sieeee2</Text>
      //   </TouchableOpacity> 
      //    <Text>test test</Text> 
      //   {(this.state.qr!=null)&&<QRCode value={this.state.qr} size={250} />}
      // </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     //alignItems: 'center'
//   },
// });
