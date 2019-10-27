import React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, Dimensions, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import { Time } from './components/Time.js';
import { SpotifyView } from './components/SpotifyView.js';
import { thisExpression } from '@babel/types';

const musicData =[];
const screen = Dimensions.get('window');

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
      id: null,
      coordinate: {latitude: "0", longitude: "0"},
      date: null,
      time: null,
      musicId: "your world is",
      title: "title",
      artist: "",
      imageUrl: "https://yt3.ggpht.com/a/AGF-l7-GzUSbLNsd66pJy2tnI6wMDBmu4rKgInMk8Q=s288-c-k-c0xffffffff-no-rj-mo",
      spotifyID: null
    }
    Object.assign(this.state, this.props.info);
  }

  settingLocation = (_lat, _lon) => { this.setState({ coordinate: {_lat, _lon} }) }

  settingDate = (_date) => { this.setState({ date: _date }); console.log('date set'); }

  settingTime = (_time) => { this.setState({ time: _time }) }

  settingMusicId = (_musicId) => { this.setState({ musicId: _musicId }) }

  settingSpotifyID = (_spotifyID) => { this.setState({ spotifyID: _spotifyID }) }

  settingTitle = (_title) => { this.setState({ title: _title }) }

  settingArtist = (_artist) => { this.setState({ artist: _artist }) }

  settingImageUrl = (_url) => { this.setState({ imageUrl: _url }) }

  async saveData() {
    if(this.state.id === null)  this.state.id = Date.now().toString();
    this.props.storeMarker(this.state);
    this.props.closeModal();
    Alert.alert("Success", "set the music in your world !!!")
  }

  setMusic = (num) => { 
    this.setState({musicId: musicData[num].title}); 
    this.refs.modal1.close();
  }

  render() {
    let trackJSX = [];
    for(let i=0; i < musicData.length; i++){
      trackJSX.push(
        <Button title={"title: "+ musicData[i].title + " artist: "+ musicData[i].artist} onPress={this.setMusic.bind(this,i)}/>
      );
    }
    return (
      <View style={styles.Setting}>
        <View style={{ flex: 1, backgroundColor: '#FF00FF', justifyContent: 'center', alignItems: 'center', margin: 0 }}>
        <Button title={this.state.musicId} onPress={() => this.refs.modal1.open()} />
        <Modal style={styles.modal} position={"center"} backdrop={true} ref={"modal1"} swipeArea={20} coverScreen={true}>
          <ScrollView width={screen.width}>
            <View>
            { trackJSX }
            </View>
          </ScrollView>
        </Modal>
        </View >
        <View style={{ flex: 1.3, backgroundColor: '#00FF00', justifyContent: 'space-evenly', alignItems: 'center', margin: 0 }}>
          <Time settingDate={this.settingDate} settingTime={this.settingTime}></Time>
        </View >
        <View style={{ flex: 1, backgroundColor: '#FFFF00', justifyContent: 'center', alignItems: 'center', margin: 0 }}>
          <Button title="Save" onPress={() => {this.saveData();}} />
        </View >
        <View style={{ flex: 1, backgroundColor: '#FF0000', margin: 10}}>
          <SpotifyView settingSpotifyID={this.settingSpotifyID} settingTitle={this.settingTitle}></SpotifyView>
        </View>
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

  jacket: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
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