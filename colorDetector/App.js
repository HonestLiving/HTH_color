import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { useState, useEffect, useRef} from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import WelcomeScreen from './screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './screens/CameraScreen';
import * as React from 'react';

const Stack = createNativeStackNavigator();

function App() {
  return(
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={WelcomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}
export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  }
});