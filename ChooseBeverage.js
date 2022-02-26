import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Image, TouchableNativeFeedback,Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

import RealtimeDB from './firebase/RealtimeDB'

import * as data from './data.json'
import realtimeDB from './firebase/RealtimeDB';

export default class ChooseBeverage extends Component {
    constructor(props) {
        super(props);
        const { navigation, route } = this.props;
        this.navigation = navigation;
        this.route = route;
        this.state = {
            header: route.params.header,
            selectBeverage: null
        };

    }

    updateSuccess = () => { }

    updateBeverageSuccess = () => {
        this.navigation.navigate('ChooseSize', {
            data: {
                header: this.state.header,
                selectBeverage: this.state.selectBeverage
            }
        });
    }
    updateReject = (error) => {
        console.log(error);
    }

    async componentDidMount() {
        await RealtimeDB.updateData(this.state.header, 'numStep', 1, this.updateSuccess, this.updateReject);
    }

    renderHeader = () => {
        return (
            <View style={styles.viewHeader}>
                <Text style={styles.text}>Choose Beverages</Text>
            </View>
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    backgroundColor: "#dddddd",
                    height: 1
                }}
            />
        );
    };

    getDataSuccess=async(data,id)=>{
        if((id==1&&data.sta_sen1)||(id==2&&data.sta_sen2)){
            await this.setState({selectBeverage:id});
            await realtimeDB.updateData(this.state.header, 'selectBeverage', new Number(id), this.updateBeverageSuccess, this.updateReject);
        }else{
            Alert.alert(
                "Alert",
                'Out of water, please choose another one.',
                [
                  { text: "OK" }
                ],
                { cancelable: false }
              );
            
        }
    }

    getDataReject=(error)=>{
        console.log(error);
    }

    pressBeverage = async (id) => {
        await realtimeDB.getStatusWater(this.state.header,id,this.getDataSuccess,this.getDataReject);
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.pressBeverage(item.id)}>
                <View style={[styles.viewItem, { backgroundColor: item.color }]}>
                    <Image style={styles.image} source={{ uri: item.url }} />
                    {/* <View style={styles.viewDescription}>
                        <Text style = {styles.textDescription}>{item.description}</Text>
                    </View> */}
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <this.renderHeader />
                <FlatList
                    data={data.beverage}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={this.renderSeparator}
                />
                <StatusBar style='dark' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewDescription: {
        flex: 1,
        alignItems: 'center'

    },
    textDescription: {
        color: 'white'
    },
    viewHeader: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 5,
        backgroundColor: '#F8F8F8',
        paddingStart: 8,
        height: 90,
        // shadowColor: '#000000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // position: 'relative',
        justifyContent: 'center'
    },
    image: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    viewItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 120,
        justifyContent: 'center'
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold'
    }
});