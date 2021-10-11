import * as React from 'react';
import { Button, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FlatList, StyleSheet } from 'react-native';
//import signOut from '../App'

const Profile = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Image style={styles.image} source={require("../assets/profile-image.png")} />
          <Text style={styles.name}>John Smith</Text>
          <Text style={styles.email}>john.smith@icloud.com</Text>
        </View>
      <View style={styles.listContainer}>
      <FlatList
        data={[
          {key: 'Sign Out'},
          {key: 'Manage payment methods'},
          {key: 'Privacy'},
          {key: 'Support'},
          {key: 'Notifications'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
    
    </View>
    );
  };
export default Profile;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    top: -160,
    height: 1000
   },
   item: {
     padding: 10,
     fontSize: 18,
     height: 44,
   },
   container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
   },
   infoContainer: {
     flex: 1,
     height: 200,
     top: 0,

   },
  image: {
    marginTop: 30,
    marginLeft: 30,
    height: 120,
    width: 120,
    borderRadius: 60, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  name: {
    fontSize: 32,
    marginLeft: 165,
    marginTop: -100
  },
  email: {
    fontSize: 14,
    marginLeft: 165,
  }
});