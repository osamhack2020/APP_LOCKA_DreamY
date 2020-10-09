/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
/*
const MyHeadlessTask = async () => {
    console.log('Receiving Block!');
    store.dispatch(setHeartBeat(true));
    setTimeout(() => {
     store.dispatch(setHeartBeat(false));
    }, 1000);
   };

AppRegistry.registerHeadlessTask('Block', () => MyHeadlessTask);*/
AppRegistry.registerComponent(appName, () => App);
