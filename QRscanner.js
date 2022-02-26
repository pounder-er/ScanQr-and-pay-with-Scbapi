import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert
} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import RealtimeDB from './firebase/RealtimeDB';
import { StatusBar } from 'expo-status-bar';

import {
  BarCodeScanner
} from 'expo-barcode-scanner';
import { color, set } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default class QRscanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   hasCameraPermission: null,
      header:null,
      scanned: false,
      connection: null,
      swCamera: true
    };
    const { navigation } = this.props;
    this.navigation = navigation;
  }

  // async componentDidMount() {
  //   this.getPermissionsAsync();
  // }

  // getPermissionsAsync = async () => {
  //   const {
  //     status
  //   } = await Permissions.askAsync(Permissions.CAMERA);
  //   this.setState({
  //     hasCameraPermission: status === 'granted'
  //   });
  // };

  updateSuccess=async()=>{
    await this.setState({swCamera :false});
    await this.navigation.navigate('ChooseBeverage',{header:this.state.header});
  }

  updateReject=(error)=>{
    console.log(error);
  }


  getSuccess = async (snapshot, header) => {
    console.log(snapshot);
    await this.setState({ connection: snapshot.val().statusWorking });
    console.log(this.state.connection);
    if (this.state.connection) {
      await this.setState({header:header});
      await RealtimeDB.updateData(header, "statusIdentify", true,this.updateSuccess,this.updateReject);
    } else {
      Alert.alert(
        "Error",
        'Incorrect QR Code',
        [
          {
            text: "cancel",
            onPress: () => this.navigation.navigate('IdentifyMachine'),
            style: "cancel"
          },
          { text: "again", onPress: () => this.setState({ scanned: false }) }
        ],
        { cancelable: false }
      );
    }
  }

  unSuccess = (error) => {
    console.log(error);
    Alert.alert(
      "Error",
      'Incorrect QR Code',
      [
        {
          text: "cancel",
          onPress: () => this.navigation.navigate('IdentifyMachine'),
          style: "cancel"
        },
        { text: "again", onPress: () => this.setState({ scanned: false }) }
      ],
      { cancelable: false }
    );

  }

  handleBarCodeScanned = async ({ type, data }) => {
    await this.setState({
      scanned: true
    });
    console.log(type);
    if (type == '256' || type == 'org.iso.QRCode') {
      await RealtimeDB.getConnection(data, this.getSuccess, this.unSuccess);
    } else {
      Alert.alert(
        "Error",
        'Incorrect QR Code',
        [
          {
            text: "cancel",
            onPress: () => this.navigation.navigate('IdentifyMachine'),
            style: "cancel"
          },
          { text: "again", onPress: () => this.setState({ scanned: false }) }
        ],
        { cancelable: false }
      );
      //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    }
  };

  render() {
    const { navigation } = this.props;
    // const {
    //     hasCameraPermission,
    //   scanned
    // } = this.state;

    //  if (hasCameraPermission === null) {
    //  return <Text></Text>;
    //  }

    // if (hasCameraPermission === false) {
    //   return <Text>{navigation.navigate('IdentifyMachine')}</Text>
    // }

    return (
      <View style={{flex:1}}>
      {(this.state.swCamera)&&
      <BarCodeScanner onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.container]} >
        <View style={styles.viewTop}>
          <Text style={styles.description}>Scan QR code</Text>
        </View>
        <View style={styles.viewMiddle}>
          <View style={styles.viewBorder}>
          </View>
        </View>
        <View style={styles.viewBottom}>
          <Text style={styles.cancel} onPress={() => navigation.navigate('IdentifyMachine')} >Cancel</Text>
        </View>
      </BarCodeScanner>}
      <StatusBar style='light' />
      </View>
    );
  }
}


const qrSize = width * 0.6
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewTop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  viewMiddle: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewBottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  viewBorder: {
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 30,
    height: qrSize,
    width: qrSize,
  },
  description: {
    fontSize: width * 0.09,
    //marginTop: '25%',
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  },

});
