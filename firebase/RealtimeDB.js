import * as firebase from 'firebase';
import '@firebase/firestore';
import { State } from 'react-native-gesture-handler';
import { firebaseConfig } from './config';
class RealtimeDB {
    constructor() { 
        if (!firebase.apps.length) {
            firebase.initializeApp({
               firebaseConfig
            });
        } else {
            console.log('firebase apps already running....');
        }
    }
    updateData(header, key, value, success, reject) {
        firebase.database().ref(header).update({
            [key]: value
        }, function (error) {
            if (error) {
                reject(error);
            } else {
                success();
                console.log('Data saved successfully!');
            }
        });
    }

    async getConnection(header,success,reject) {
        await firebase.database().ref(header).once('value').then(function(snapshot) {
            success(snapshot,header);
            //console.log(snapshot.val().statusWorking);
            console.log('testttt');
        }).catch((error) => {
            reject(error);
        });
    }

    async getData(header,success,reject){
        await firebase.database().ref(header).once('value').then(function(snapshot) {
            success(snapshot.val());
        }).catch((error) => {
            reject(error);
        });
    }

    async getStatusWater(header,id,success,reject){
        await firebase.database().ref(header).once('value').then(function(snapshot) {
            success(snapshot.val(),id);
        }).catch((error) => {
            reject(error);
        });
    }

}


const realtimeDB = new RealtimeDB();
export default realtimeDB;
