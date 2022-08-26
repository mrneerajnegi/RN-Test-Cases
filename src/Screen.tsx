import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import ItemAdder from './ItemAdder';
import ItemsList from './ItemList';

const Screen = () => {
  const [items, setItems] = useState<string[]>([]);
  const {CustomeModule} = NativeModules;
 
  return (
    <View style={styles.root}>
      <ItemAdder
        onAddItem={item => {
          if (item.trim().length > 0 && !items.includes(item)) {
            setItems([...items, item]);
          }
        }}
        testID="adder"
      />
      <TouchableOpacity
        style={{alignItems: 'center'}}
        onPress={() => {
          CustomeModule.createEvent('testName', 'testLocation');
        }}>
        <Text>GET ALL DATA</Text>
      </TouchableOpacity>
      <ItemsList
        data={items}
        onDeleteItem={item => {
          const index = items.indexOf(item);
          setItems([
            ...items.slice(0, index),
            ...items.slice(index + 1, items.length),
          ]);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default Screen;
