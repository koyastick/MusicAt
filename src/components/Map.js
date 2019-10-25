import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';

export class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      latitude:38.255900,
      longitude:140.84240,
      latitudeDelta:0.00520,
      longitudeDelta:0.00520,
      markers: []
    };
    this.camera = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.00520,
      longitudeDelta: 0.00520
    }
    setTimeout(() => {this.getCurrentPosition(this)}, 1000);
  }

  setCameraPosition = (region) => {
    this.camera = region
  }

  syncCameraPosition = () => {
    this.setState({
      latitude: this.camera.latitude,
      longitude: this.camera.longitude,
      latitudeDelta: this.camera.latitudeDelta,
      longitudeDelta: this.camera.longitudeDelta,
    })
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
      longitude: _longitude,
      latitudeDelta: LatitudeDelta,
      longitudeDelta: LongitudeDelta
    });
  }

  failToGetCurrentPosition = (error) => {
    console.warn(`ERROR(${error.code}): ${error.message}`);
  }

  movePlace() {
    this.getCurrentPosition(this);
  }

  removeMarkers() {
    this.syncCameraPosition();
    this.setState({markers: []});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapView
          provider = {PROVIDER_DEFAULT}
          style = {{flex: 1}}
          region={{
            latitude:this.state.latitude,
            longitude:this.state.longitude,
            latitudeDelta:this.state.latitudeDelta,
            longitudeDelta:this.state.longitudeDelta,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onRegionChangeComplete={(position) => {this.setCameraPosition(position)}}
          onLongPress={(coords, pos) => {
              this.syncCameraPosition();
              const marker = {
                latlng: {
                  latitude: coords.nativeEvent.coordinate.latitude,
                  longitude: coords.nativeEvent.coordinate.longitude
                },
                title: "",
                description: ""
              }
              this.state.markers.push(marker);
              this.props.settingLocation(coords.nativeEvent.coordinate.latitude, coords.nativeEvent.coordinate.longitude)
            }
          }
          >
          {this.state.markers.map(marker => (
            <Marker
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
        <View style={{position:'absolute', flexDirection:"row", left: 0, right: 0, bottom: 20, justifyContent: 'space-evenly'}}>
          <Button titleStyle={{fontWeight: 'bold'}} type="solid" title="現在地へ移動" onPress={() => this.movePlace()} />
          <Button titleStyle={{fontWeight: 'bold'}} type="solid" title="ピンを削除" onPress={() => this.removeMarkers()} />
        </View>
      </View>
    );
  }
}

const LatitudeDelta = 0.00520;
const LongitudeDelta = 0.00520;