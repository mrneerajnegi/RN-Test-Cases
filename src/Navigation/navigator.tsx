import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './styles';
import NavigationService from './navigationService';
import Screen1 from '../Screens/Screen1';
import Screen2 from '../Screens/Screen2';
import Screen from '../Screen';

const RootStack = createNativeStackNavigator();

const Navigator = (props) => {
console.log(props.initialRoute)
	return (
		<NavigationContainer
			ref={(navigatorRef) => {
				NavigationService.setTopLevelNavigator(navigatorRef);
			}}
		>
			<RootStack.Navigator
					screenOptions={{
						headerShown: false
					}}
					initialRouteName={props.initialRoute}
				>
					<RootStack.Screen name="Screen" component={Screen} />
					<RootStack.Screen name="Screen1" component={Screen1} />
					<RootStack.Screen name="Screen2" component={Screen2} />
				</RootStack.Navigator>
		</NavigationContainer>
	);
};

export default Navigator;
