import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Home from './screens/Home';
import Login from './screens/Login';

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    GoogleSignin.configure({
      // web client is used for android, for ios add iosClient ID as shown below
      webClientId:
        '532198168776-2vghvm3dh04vva0qpkv0jis7ifdhsui2.apps.googleusercontent.com',

      iosClientId:
        '532198168776-rufil8n36husd8mcc5j231tnadhj52b5.apps.googleusercontent.com',
    });
    console.log('initiated');
    isSignedIn();
  }, []);

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };
  const isSignedIn = async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        getCurrentUserInfo();
      } else {
        console.log('Please Login');
      }
      console.log('isSignedIn', isSignedIn);
    } catch (err) {
      console.log(err);
    }
  };
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async () => {
    try {
      console.log('userInfo', userInfo);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo);
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error.code);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error.code);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error.code);
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  if (!user) {
    return <Login onGoogleButtonPress={signIn} />;
  }
  return <Home SignOut={signOut} user={user} />;
};

export default App;

// SHA1: EB:02:2A:C0:4C:63:5F:B1:BE:56:18:4B:5D:1D:8B:C1:52:1D:69:27
// SHA256: 54:5A:3D:A6:51:C7:65:B9:1F:99:72:B0:E4:3B:4F:98:EF:4D:D0:BE:6F:04:62:15:45:79:E6:44:C7:F4:6C:83
