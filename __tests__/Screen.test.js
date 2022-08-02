import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Screen from '../src/Screen';


//UI Testing with react native testing library

test('testing UI components', () => {
  const {getByTestId, getByText, getAllByTestId, queryByText} = render(
    <Screen />,
  );
  const textInput=getByTestId("adder-input")
  const button =getByText("Add")
  //add 1 item and check
  fireEvent.changeText(textInput,"Item 1")
  fireEvent.press(button)
  const addedItem=getByText("Item 1")
  expect(addedItem).toBeDefined();

//add 2 item and check
  fireEvent.changeText(textInput,"Item 2")
  fireEvent.press(button)
  const secondItem=getByText("Item 2")
  expect(secondItem).toBeDefined();

//delete item
deletButton=getAllByTestId("cell-delete")[0]
fireEvent.press(deletButton)

const firstItem=queryByText("Item 1") //will return error if doesnt find element so use  queryByText
expect(firstItem).toBeNull();

});

