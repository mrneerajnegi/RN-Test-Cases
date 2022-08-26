import React, {useState} from 'react';
import {StyleSheet, View,Text} from 'react-native';

const Screen2 = () => {
  return (
    <View style={styles.root}>
        <Text>Screen2</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default Screen2;