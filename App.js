/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Vibration,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import Navigator from './src/Navigation/navigator';
import navigationService from './src/Navigation/navigationService';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
    }
  }
  const [route, setRoute] = useState('Screen');
  React.useEffect(() => {
    requestUserPermission();
    messaging()
      .getToken()
      .then(token => {
        console.log(token);
      });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      if (remoteMessage.notification) {
        console.log('===>2');
        navigationService.navigate('Screen1');
      }
      // navigationService.navigate("Screen2");
    });

    messaging()
      .getInitialNotification()
      .then(value => {
        console.log('Notification caused app to open from quit state:', value);
        if (value != null) {
          console.log('===>1');
          setRoute('Screen2');
        }
      });

    PushNotification.configure({
      onNotification: function (notification) {
        console.log('local notification', notification);
        if (notification.foreground)
          navigationService.navigate('Screen2');
      },
    });
    messaging().onMessage(async remoteMessage => {
      console.log("====>")
      if (remoteMessage.hasOwnProperty('notification')) {
        // Vibration.vibrate(50000)
        // it will vibrate for 5 seconds
        PushNotification.localNotification({
          message: remoteMessage.notification.body,
          title: remoteMessage.notification.title,
          bigPictureUrl: remoteMessage.notification.android.imageUrl,
          smallIcon: remoteMessage.notification.android.imageUrl,
          soundName: 'bark',
          playSound: true,
          channelId: 'new_email_arrived_channel',
        });
      }
    });
  }, []);

  return (
    <SafeAreaProvider style={backgroundStyle}>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <Navigator initialRoute={route} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;



// curl --location --request POST 'https://fcm.googleapis.com/fcm/send' \
// --header 'Authorization: Bearer AAAAP4oThQc:APA91bEy3uAAuTXkdIEh6ZqVGmUsDYkZv82lAnFIRkAzjaxyvSEruDmYQc9CFRQnn2g9Ql5VRWKhhHZRGdDgao1Ekz_NCgsOzlzMm4YYz2v9btFAgbqRJqUyLL9INg9dDE7BYb1pOT12' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//    "notification":{
//      "title":"FCM Message",
//      "body":"This is an FCM Message",
//      "sound":"bark.mp3",
//       "android_channel_id": "new_email_arrived_channel"
//    },
//    "to":"ezQDRqp6R6-UKFMMguuOiP:APA91bGz_p6abyBLBe_-CydpGwfRPNxOicdv2qDI0xIH3vFwNxJRsmVnz64B15evjxynqYomXyNvx_hOU4d6egEuaEiH2IygFJwVBI-bk2n6Ey3RdNYsQh08jjjuNgt6g4WPNwuB02MQ"
// }'