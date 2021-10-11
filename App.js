import * as React from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from "expo-status-bar";

import { Actions, Router, Scene } from "react-native-router-flux";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { StripeProvider } from '@stripe/stripe-react-native';
import * as SecureStore from 'expo-secure-store';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./src/stripeApp";

// screen imports
import ScannerScreen from './src/scanner'
import location from './src/location'
import StripeApp from './src/stripeApp'
import Index from './src/index'
import Profile from './src/ProfileScreen'
import LoginScreen from './src/LoginScreen'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const promise = loadStripe("pk_test_51ISAtNLgA5We1KpPsp8OWCvcgyOREAskwBnsfs718TzfdHXp1KykJRbDYvDrEIC6vRAyMM0v6YOqiskifyy7SyNm00rTnS6qBk");

function stripeScreen() {
  return (
    <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
  )
}

const AuthContext = React.createContext();

function SignInScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/tip-logo.png")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Email"
          placeholderTextColor="#ffffff"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Password"
          placeholderTextColor="#ffffff"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
 
      <TouchableOpacity 
        style={styles.loginBtn} 
        title="Sign in" 
        onPress={() => signIn({ email, password })}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
      <Stack.Navigator>
        {state.userToken == null ? (
          <Stack.Screen name="SignIn" component={SignInScreen} options={{header: () => null}} />
        ) : (
          <Stack.Screen 
          name="Home" 
          component={Home}
          options={({ navigation }) => ({
            title: "",
            headerRight: () => (
            <TouchableOpacity
            onPress={() =>
              navigation.navigate('Camera')
            }>
                <Image style={styles.qrImage} source={require("./assets/qr-scan.png")} />
              </TouchableOpacity>
          ),
          })} />
          
        )}
          <Stack.Screen name="Camera" component={ScannerScreen} />
          <Stack.Screen name="Location" component={location} />
          <Stack.Screen name="Stripe" component={stripeScreen} />
      </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const Home = ({ navigation, route }) => {
  return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Index" component={Index} options={{}} />
        <Tab.Screen name="Profile" component={Profile} options={{}} />
      </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  qrImage:{
    margin: 2,
    width: 38,
    height: 35,

  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 0,
    aspectRatio: 0.7, 
    resizeMode: 'contain',
  },
 
  inputView: {
    width:"80%",
    backgroundColor:"#d1d1d1",
    borderColor:"#808080",
    borderWidth: 2,
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
 
  TextInput: {
    height:50,
    color:"white"
    
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#808080",
  },

  loginText: {
   color: "#ffffff",
  },
})

