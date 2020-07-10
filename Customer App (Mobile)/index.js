import { AppRegistry } from 'react-native';
import App from './App.js';

AppRegistry.registerComponent('Viro', () => App);
console.disableYellowBox = true;
// The below line is necessary for use with the TestBed App
AppRegistry.registerComponent('ViroSample', () => App);
