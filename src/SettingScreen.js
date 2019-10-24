import React from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView, Dimensions } from 'react-native';
import { Time } from './components/Time.js';
import { Map } from './components/Map.js'
import Modal from 'react-native-modalbox';

const screen = Dimensions.get('window');
const musicData =[];

for(let i=0; i < 30; i++){ //テストデータ作成
  musicData.push({
    title: "musicTitle"+i,
    artist: "artist"+i,
    genre: "musicGenre"+i,
    musicAlbum: "Album"+i,
  });
}

export class SettingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // location info
      latitude: 38.2559,
      longitude: 140.845,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      // time info
      date: "2016-05-15",
      time: "8:16 PM",
      // music info
      musicId: "Select your music"
    }
  }

  settingLocation = (_lat, _lon) => { this.setState({ latitude: _lat, longitude: _lon }) }

  settingDate = (_date) => { this.setState({ date: _date }) }

  settingTime = (_time) => { this.setState({ time: _time }) }

  settingMusicId = (_musicId) => { this.setState({ time: _musicId }) }

  storeData = () => {
    newData = [
      {
        // id: Date.now().toString,
        id: Date.now().toString(),
        time: {
          date: this.state.date,
          time: this.state.time
        },
        place: {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta,
        },
        musicId: this.state.musicId
      }
    ]
    tmp = []
    storage
      .load({ key: 'mapInfo' })
      .then(res => {
        this.tmp = res;
      })
      .catch(err => {
        this.tmp = null;
        console.warn(err);
      })
    if (this.tmp != null) {
      newData = newData.concat(this.tmp)
    }
    console.log(newData)
    storage.save({
      key:
        'mapInfo',
      data: newData
    })
    Alert.alert("Success", "set the music in your world !!!")
  }

  setMusic = (num) => { this.setState({musicId: musicData[num].title}); }

  render() {
    let trackJSX = [];
    for(let i=0; i < musicData.length; i++){
      trackJSX.push(
        <Button title={"title: "+ musicData[i].title + " artist: "+ musicData[i].artist} onPress={this.setMusic.bind(this,i)} />
      );
    }
    return (
      <View style={styles.Setting}>
        <View style={{ flex: 1, backgroundColor: '#FF00FF', justifyContent: 'center', alignItems: 'center', margin: 0 }}>
        <Button title={this.state.musicId} onPress={() => this.refs.modal.open()} />
        <Modal style={styles.modal} position={"center"} backdrop={true} ref={"modal"} swipeArea={20} coverScreen={true}>
          <ScrollView width={screen.width}>
            <View>
            { trackJSX }
            </View>
          </ScrollView>
        </Modal>
        </View >
        <View style={{ flex: 6, justifyContent: 'center', margin: 0 }}>
          <Map settingLocation={this.settingLocation}></Map>
        </View >
        <View style={{ flex: 1.3, backgroundColor: '#00FF00', justifyContent: 'space-evenly', alignItems: 'center', margin: 0 }}>
          <Time settingDate={this.settingDate} settingTime={this.settingTime}></Time>
        </View >

        <View style={{ flex: 1, backgroundColor: '#FFFF00', justifyContent: 'center', alignItems: 'center', margin: 0 }}>
          <Button title="Save" onPress={this.storeData} />
        </View >
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  Setting: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingTop: 40,
    paddingBottom: 50,
    backgroundColor: '#FFFFFF'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
  },
})
