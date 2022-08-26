import React, {useState} from 'react';
import {StyleSheet, View,Text} from 'react-native';

const Screen1 = () => {
  return (
    <View style={styles.root}>
        <Text>Screen1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default Screen1;