import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import scb from './Scb';
import realtimeDB from './firebase/RealtimeDB';
import * as data from './data.json';


export default class Payment extends Component {

    constructor(props) {
        super(props);
        const { navigation, route } = this.props;
        this.navigation = navigation;
        this.route = route;
        this.state = {
            header: route.params.data.header,
            selectBeverage: route.params.data.selectBeverage,
            selectSize: route.params.data.selectSize,
            DateTime: null
        };
    }

    updateSuccess = () => {

    }

    updateReject = (error) => {
        console.log(error);

    }

    updateSwSuccess=()=>{
        Alert.alert(
            "Success",
            'Wait a moment, the machine is draining the water.',
            [
                { text: "OK" , onPress: () => this.navigation.navigate('IdentifyMachine')}
            ],
            { cancelable: false }
        );
    }
    

    getDateTime = () => {
        let day = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        let hours = new Date().getHours();
        let min = new Date().getMinutes();
        let sec = new Date().getSeconds();
        this.setState({ DateTime: day + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec });

    }

    createQRsuccess = async (data) => {
        await realtimeDB.updateData(this.state.header, 'qrPay', data.qrRawData, this.updateSuccess, this.updateReject);
    }

    async componentDidMount() {
        console.log(this.state.header);
        await realtimeDB.updateData(this.state.header, 'numStep', 3, this.updateSuccess, this.updateReject);
        await scb.requestToken();
        await scb.createDataQRcode(data.size[this.state.selectSize - 1].price, this.state.header, this.createQRsuccess);
        this.getDateTime();
    }

    getPaymentSuccess = async(data) => {
        this.navigation.navigate('IdentifyMachine');
        
        // console.log(data.statusPay)
        // if (data.statusPay) {
        //     await realtimeDB.updateData(this.state.header,'swValve',true,this.updateSwSuccess,this.updateReject)
           
        // } else {
        //     Alert.alert(
        //         "Error",
        //         'Please scan the QR code with your Mobile banking and complete the transfer before pressing the success button.',
        //         [
        //             { text: "OK" }
        //         ],
        //         { cancelable: false }
        //     );
        // }

    }

    getPaymentReject = (error) => {
        console.log(error);
        Alert.alert(
            "Error",
            'Please scan the QR code with your Mobile banking and complete the transfer.',
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );

    }

    pressPaySuccess() {
        realtimeDB.getData(this.state.header, this.getPaymentSuccess, this.getPaymentReject);
    }



    render() {

        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.order}>
                        <View style={styles.viewTitle}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', height: 25 }}>Order</Text>
                            <Text style={{ opacity: 0.5 }}>Date/Time: {this.state.DateTime}</Text>
                        </View>
                        <View style={styles.viewDescription}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>NAME{'\n'}{data.beverage[this.state.selectBeverage - 1].description}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>SIZE{'\n'}{data.size[this.state.selectSize - 1].size}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>TOTAL{'\n'}{data.size[this.state.selectSize - 1].pricecode}</Text>
                            </View>
                        </View>
                        <View style={styles.viewWarning}>
                            <Text style={{ opacity: 0.5, textAlign: 'center' }}>Please scan the QR code with your Mobile banking and complete the transfer before pressing the success button.</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity onPress={() => this.pressPaySuccess()} style={{ backgroundColor: 'lightgray', borderRadius: 25, height: 40, justifyContent: 'center' }}>

                        <Text style={{ textAlign: 'center', fontSize: 20 }}>Go first page</Text>

                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    order: {
        height: '60%',
        width: '70%',
        backgroundColor: 'lightgray',
        borderRadius: 25,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
    },
    top: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 10
    },
    viewTitle: {
        flex: 1,
    },
    viewDescription: {
        paddingTop: 6,
        flex: 4,
        flexDirection: 'row'
    },
    viewWarning: {
        flex: 2,
        justifyContent: 'flex-end'
    }

});