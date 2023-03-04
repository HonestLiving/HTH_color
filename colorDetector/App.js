import { useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";

export default function App() {
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

  return (
    <View style={styles.container}>
      <Camera
        style = {styles.camera}
        type = {type}
        flashMode = {flash}
        //references the camera here
        ref = {cameraRef}
        >
          <Text> Hello </Text>
        </Camera>
    </View>
  );
}

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
