import React, {useEffect, useRef} from 'react';
import { View, Text, Button, TouchableOpacity, Image, Animated } from 'react-native';
import { StyleSheet} from 'react-native';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function WelcomeScreen({ navigation }) {
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.Image
        source={require('../assets/Logo.png')}
        style={[styles.image, { transform: [{ scale }] }]}
      />
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Camera')}
      >
        <Icon name="camera" size={18} color="white" />
        <Text style={styles.buttonText}>  Identify Color</Text>
      </TouchableOpacity>
      <StatusBar hidden={true} />

    </View>
  );
}

export default WelcomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#1CB4EB',
    padding: 10,
    borderRadius: 5,
    marginTop: 55,
    
    width:140,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: 320,
    height: 200,
    
  },
});
