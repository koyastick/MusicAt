import React from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView, Dimensions } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { throwStatement } from '@babel/types';
import { Map } from './components/Map.js'
import Modal from 'react-native-modalbox';
import { SettingScreen } from './SettingScreen.js';

const screen = Dimensions.get('window');

export class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 38.255900,
      longitude: 140.84240,
      markers: []
    };
    this.getCurrentPosition(this);
    this.loadMarkers()
  }

  getCurrentPosition = (obj) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 0
    };
    Geolocation.getCurrentPosition(
      obj.successToGetCurrentPosition,
      obj.failToGetCurrentPosition,
      options
    );
  }

  successToGetCurrentPosition = (position) => {
    const _latitude = position.coords.latitude;
    const _longitude = position.coords.longitude;
    this.setState({
      latitude: _latitude,
      longitude: _longitude
    });
  }

  failToGetCurrentPosition = (error) => {
    console.warn(`ERROR(${error.code}): ${error.message}`);
  }

  loadMarkers = () => {
    storage
      .load({ key: 'mapInfo' })
      .then(res => {
        newMarkers = [];
        console.log('informations')
        console.log(res)
        console.log('markers')
        res.map(obj => {
          newMarkers.push(
            {
              latlng: {
                latitude: obj.place.latitude,
                longitude: obj.place.longitude
              },
              title: "♪ "+obj.musicId,
              description:"date:"+ obj.time.date + ' time: ' + obj.time.time
            }
          )
        })
        console.log(newMarkers)
        this.setState({ markers: newMarkers })
      })
      .catch(err => console.warn(err))
  }
  isNear(obj, c_lat, c_lng){
    if(Math.abs( (obj.place.latitude-c_lat) < 0.00001) && (Math.abs(obj.place.longitude-c_lng)<0.00001 )){
      return true;
    }
    else{
      return false;
    }
  }
  checker(){
    // this.getCurrentPosition(this);
    console.log('you\'re @ (latlng) '+this.state.latitude+'/'+this.state.longitude);
    const c_lat=38.25451378490567;
    const c_lng=140.84350658013643;
    storage
    .load({ key: 'mapInfo' })
    .then(res => {
      console.log('informations')
      console.log(res)
      res.map(obj => {
        if( this.isNear(obj, c_lat, c_lng) ){
          const musicId=obj.musicId;
          this.setState({musicId:obj.musicId})
          // musicPlay(obj.musicId)
          // Alert.alert(obj.musicId)
          console.log('hit!! '+obj.musicId)
        }
        else{
          console.log('not hit ...')
        }
      })
    })
    .catch(err => console.warn(err)) 
  }
//  ComponentWillMountで初期化するらしい．調べてみたい．
  componentDidMount(){
    this.interval = setInterval(() => {
      this.checker()
    }, 5000);
  }

  render() {
    return (
      <View style={styles.Main}>
        <MapView
          provider={PROVIDER_DEFAULT}
          style={{ flex: 1 }}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: LatitudeDelta,
            longitudeDelta: LongitudeDelta,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {this.state.markers.map(marker => (
            <Marker
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
        <Button title="Load Markers" onPress={this.loadMarkers} />
        <Button title="Modal" onPress={() => this.refs.modal.open()} />
        <Modal style={styles.modal} position={"bottom"} ref={"modal"} swipeArea={20}>
          <ScrollView width={screen.width}>
            <SettingScreen></SettingScreen>
          </ScrollView>
        </Modal>
      </View>
    )
  }
}

const LatitudeDelta = 0.00720;
const LongitudeDelta = 0.00720;
const styles = StyleSheet.create({
  text: {
    // color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  Main: {
    flex: 1
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
  },

})