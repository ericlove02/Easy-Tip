import * as React from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView, Image, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView } from 'react-native-gesture-handler';
import { Col, Row, Grid } from "react-native-easy-grid";

const Index = ({ navigation }) => {
  
    return (
      <SafeAreaView style={styles.container}>
        
        <ScrollView style={styles.scrollView}>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={require("../assets/tip-logo.png")} />
        </View>
        <TouchableOpacity
        title="Open Camera"
        style={styles.widget}
        onPress={() =>
          navigation.navigate('Camera')
        }>
          <Grid style={styles.gridView}>
            <Row>
              <Col style={styles.alignCenter}>
                <Image style={styles.icon} source={require("../assets/scan-icon.png")} />
              </Col>
              <Col style={styles.alignCenter}>
                <Text style={styles.mainText}>Send a Tip</Text>
                <Text style={styles.subText}>Scan an employee QR code to send them a tip</Text>
              </Col>
            </Row>
          </Grid>
      </TouchableOpacity>
      <TouchableOpacity
        title="Get Location"
        style={styles.widget}
        onPress={() =>
          navigation.navigate('Location')
        }>
          <Grid style={styles.gridView}>
            <Row>
              <Col style={styles.alignCenter}>
                <Image style={styles.icon} source={require("../assets/locations-icon.png")} />
              </Col>
              <Col style={styles.alignCenter}>
                <Text style={styles.mainText}>Locations Nearby</Text>
                <Text style={styles.subText}>View locations using EasyTip near you</Text>
              </Col>
            </Row>
          </Grid>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.widget}
        onPress={() =>
          navigation.navigate('Stripe')
        }>
          <Grid style={styles.gridView}>
            <Row>
              <Col style={styles.alignCenter}>
                <Image style={styles.icon} source={require("../assets/card-icon.png")} />
              </Col>
              <Col style={styles.alignCenter}>
               <Text style={styles.mainText}>Manage payment methods</Text>
               <Text style={styles.subText}>Add or removed saved tipping methods</Text>
              </Col>
            </Row>
          </Grid>
        </TouchableOpacity>
        </ScrollView>
        </SafeAreaView>
    );
  };
export default Index;

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles=StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight,
    width: "100%"
  },
  scrollView: {
    backgroundColor: 'white',
    width: "100%"
  },
  widget: {
    marginLeft: "2.5%",
    width: "95%",
    borderRadius: 8,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  mainText: {
    color: "black",
    fontSize: 26,
    fontWeight: "500",
    marginTop: -100,
    marginLeft: -30,
    paddingRight: 10,
    //fontFamily: 'IBMPlexSans'
  },
  subText: {
    color: "black",
    fontSize: 18,
    marginLeft: -30,
    paddingRight: 20,
    //fontFamily: 'Inter'
  },
  image: {
    marginBottom: 0,
    aspectRatio: 0.7, 
    resizeMode: 'contain',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: -50,
    marginTop: -50,
  },
  icon: {
    marginTop: -100,
    marginLeft: 20,
    width: 120,
    height: 120, 
    resizeMode: 'contain',
    justifyContent: 'center',
    alignContent: 'center',
  },
  imgContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  alignCenter: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  gridView: {
    width: winWidth,
    position: 'absolute',
    height: 100,
    bottom: 30,
  },
})