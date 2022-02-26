import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Image, TouchableNativeFeedback } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import RealtimeDB from './firebase/RealtimeDB';

import * as data from './data.json';


export default class ChooseSize extends Component {
    constructor(props) {
        super(props);
        const { navigation, route } = this.props;
        this.navigation = navigation;
        this.route = route;
        this.state = {
            header: route.params.data.header,
            selectBeverage: route.params.data.selectBeverage,
            selectSize: null
        };
    }

    updateSuccess = () => { }

    updateSizeSuccess = () => {
        this.navigation.navigate('Payment', {
            data: {
                header: this.state.header,
                selectBeverage: this.state.selectBeverage,
                selectSize: this.state.selectSize
            }
        });
    }
    updateReject = (error) => {
        console.log(error);
    }

    async componentDidMount() {
        await RealtimeDB.updateData(this.state.header, 'numStep', 2, this.updateSuccess, this.updateReject);
    }

    renderHeader = () => {
        return (
            <View style={styles.viewHeader}>
                <Text style={styles.textHeader}>Choose Size</Text>
            </View>
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: "#dddddd",
                }}
            />
        );
    };

    pressSize = async (id) => {
        await this.setState({ selectSize: id });
        await RealtimeDB.updateData(this.state.header, 'selectSize', new Number(id), this.updateSizeSuccess, this.updateReject);
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.pressSize(item.id)}>
                <View style={styles.viewItem}>
                    <View style={styles.viewIcon}>
                        <MaterialCommunityIcons name="cup" size={60} color="skyblue" />
                    </View>
                    <View style={styles.viewDescription}>
                        <Text style={styles.textDescription}>{item.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <this.renderHeader />
                <FlatList
                    data={data.size}
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
        alignItems: 'flex-start'

    },
    textDescription: {
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold'
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
    viewIcon: {
        flex: 1,
        alignItems: 'center'

    },
    viewItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
        padding: 15,
        backgroundColor: 'gray'
    },
    textHeader: {
        fontSize: 25,
        fontWeight: 'bold'
    }
});