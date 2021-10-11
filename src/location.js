import React, { useState, useEffect } from 'react';
import { Platform, Text, View, ScrollView, Image } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Dimensions } from 'react-native';

import { FlatList, StyleSheet } from 'react-native';
import BottomDrawer from 'react-native-bottom-drawer-view';

import { Col, Row, Grid } from "react-native-easy-grid";


export default function location() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        showsUserLocation={true}
        followsUserLocation={true}
        />
        <BottomDrawer
          containerHeight={Dimensions.get('window').height/1.8}
          downDisplay={Dimensions.get('window').height/1.8/1.8}
          startUp={false}>
          <View style={styles.listContainer}>
            <FlatList
              data={[
                {name: 'San Antonio Applebees', address: '1600 Pensylvania Ave., San Antonio, TX'},
                {name: 'Hooters', address: '1234 Texas Ave, San Antonio, TX'},
                {name: 'Casino Hotel', address: '420 Las Vegas Ave., Las Vegas, NV'},
              ]}
              renderItem={({item}) => 
              <View style={styles.item}>
                <Grid style={styles.gridView}>
                  <Row>
                    
                    <Col style={styles.col, {width: "100%"}}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.address}>{item.address}</Text>
                    </Col>
                  </Row>
                  </Grid>
              </View>
            }
            />
          </View>
        </BottomDrawer>
    </View>
  );
     
}


const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  listContainer: {
    flex: 1,
    height: Dimensions.get('window').height/1.8,
   },
   item: {
     padding: 10,
     height: 60,
     borderBottomColor: "gray",
     borderBottomWidth: 1
   },
   name: {
    fontSize: 18,
    padding: 2,
    marginTop: 2
   },
   address: {
    fontSize: 14,
    padding: 2,
    marginBottom: 2
   },
   image: {
    marginBottom: 0,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignContent: 'center',
  },
  col: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  gridView: {
    width: winWidth,
    height: Dimensions.get('window').height/1.8,
  },
});