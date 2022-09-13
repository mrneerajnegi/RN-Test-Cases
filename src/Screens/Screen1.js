import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {
  AuthenticationToken,
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import { appleAuthAndroid, appleAuth,AppleButton } from '@invertase/react-native-apple-authentication';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
// import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'
const Screen1 = () => {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile', 'email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '272899474695-nsaecofsun4uf6b7kt51qk3qavpsir40.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      offlineAccess: true,
    });
  }, []);
  const _responseInfoCallbackFacebook = async (error, result) => {
    if (error) {
      alert('Error found');
    } else {
      if (!result.email) {
        alert(
          'Your email id is not confirmed. Please confirm your emailId from facebook',
        );
      } else {
        /* If user is registered with Email/Password then he will not be able to login with Google.
          CheckEmailExist Exist function that checks user is registered with Email/password or not.*/
        console.log(result);
      }
      //this.props.getLoginFacebook(result.email, result.name)
    }
  };
  async function onAppleButtonPress() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
  
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
  
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      console.log(credentialState)
    }
  }
  const fb_signin = async () => {
    await LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(
        result => {
          if (result.isCancelled) {
            console.log('cancelled fb login');
            return null;
          }
          return AccessToken.getCurrentAccessToken();
        },
        reason => console.log('as', reason),
      )
      .then(data => {
        const infoRequest = new GraphRequest(
          '/me?fields=name,picture,email',
          null,
          _responseInfoCallbackFacebook,
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      });
  };
  const _signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
        // play services not available or outdated
      } else {
        // some other error happened
        console.log(error, error.code);
      }
    }
  };
  return (
    <View style={styles.root}>
      <Text>Screen1</Text>
      <TouchableOpacity onPress={fb_signin}>
        <Text style={{marginTop: 10}}>Sign in with FB </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={_signInGoogle}>
        <Text style={{marginTop: 10}}>Sign in with Google </Text>
      </TouchableOpacity>
      {appleAuthAndroid.isSupported && (
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          onPress={() => onAppleButtonPress()}
        />
      )}
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
