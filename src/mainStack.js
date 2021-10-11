import * as React from 'react';
import { Button, Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Actions, Router, Scene } from "react-native-router-flux";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { StripeProvider } from '@stripe/stripe-react-native';


const mainStack = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={Home}
            options={({ navigation }) => ({
              headerLeft: () => (<Text></Text>),
              headerRight: () => (
              <TouchableOpacity
              onPress={() =>
                navigation.navigate('Camera')
              }>
                  <Image style={styles.qrImage} source={require("../assets/qr-scan.png")} />
                </TouchableOpacity>
            ),
            })} />
          <Stack.Screen name="Camera" component={ScannerScreen} />
          <Stack.Screen name="Location" component={location} />
          <Stack.Screen name="Stripe" component={stripeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
export default mainStack;