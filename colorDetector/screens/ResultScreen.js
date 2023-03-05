import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ResultScreen(navigation) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Result Screen</Text>
      {/* Your result view components here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ResultScreen;
