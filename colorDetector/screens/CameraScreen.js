import React from 'react';
import { useState, useEffect, useRef} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import SplashScreen from 'react-native-splash-screen';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import Button from '../src/components/Button';


function CameraScreen(navigation) {
    const[hasCameraPermission, setHasCameraPermission] = useState(null);
    const[image, setImage] = useState(null);
    const[type, setType] = useState(Camera.Constants.Type.back);
    const[flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null); 
  
    //asks for camera and library permissions
    useEffect(() => {
      (async ()=> {
      //library permission
      MediaLibrary.requestPermissionsAsync();
      //camera permission
      const cameraStatus = await Camera.requestCameraPermissionsAsync(); 
      setHasCameraPermission(cameraStatus.status === 'granted'); 
      })();
    }, [])
      //takes the picture
  const takePicture = async () => {
    if (cameraRef) {
        //takes the actual picture
        const data = await cameraRef.current.takePictureAsync();
        //stores the data in the console
        console.log(data);
        //image is set to the data from the picture
        setImage(data.uri);
    }
  };


  const savePicture = async () => {
    if (image) {
        const asset = await MediaLibrary.createAssetAsync(image);
        alert('Picture saved!');
        setImage(null);
        console.log('saved successfully');
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No Access to Camera</Text>;
  }

     //Camera Style Stuff
  return (

    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}
          >
            <Button
              title=""
              icon="retweet"
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <Button
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
              icon="flash"
              color={flash === Camera.Constants.FlashMode.off ? 'white' : 'yellow'}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 40,
            }}
          >
            <Button
              title="Re-take"
              onPress={() => setImage(null)}
              icon="retweet"
            />
            <Button title="Save" onPress={savePicture} icon="check" />
          </View>
        ) : (
          //picture button
          <Button title="Take a Photo" onPress={takePicture} icon="camera" />
        )}
      </View>
    </View>
  );
}

//Styling camera stuff



export default CameraScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000',
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 30,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },

});
  