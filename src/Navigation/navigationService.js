// This file contains all common navigator method()
import {CommonActions, StackActions} from '@react-navigation/native';

let _navigator;

// Setting a Top level navigator from App.js
function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

// Navigate to a particular screen
//params -> (Name of screen, parameters)
function navigate(routeName, params) {
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
}

// Push to a particular screen
//params -> (Name of screen, parameters)
function push(routeName, params) {
  _navigator.dispatch(
    StackActions.push({
      routeName: routeName,
      params: params,
    }),
  );
}

// reset the current stack and navigate to a particular screen
//params -> (Name of screen, parameters)

function reset(routeName, params) {
  _navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: routeName}],
    }),
  );
}

// add other navigation functions that you need and export them
export default {
  navigate,
  setTopLevelNavigator,
  reset,
  push,
};