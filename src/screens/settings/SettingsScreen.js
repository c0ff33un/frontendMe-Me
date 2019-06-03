import React, { Component } from 'react'
import { Image, Text, StyleSheet, View, FlatList } from 'react-native'

class SettingsScreen extends Component {
  
  state = {
    jwt: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0Iiwic2NwIjoidXNlciIsImlhdCI6MTU1OTU0MDQ0MSwiZXhwIjoxNTU5NjI2ODQxLCJqdGkiOiI3OTAzZDZlNi0xOGMxLTQzMmItODY4Zi1iMDcxNzNmNDRiMmYifQ._e51p5y2si6U1UTnRyr5nK08oj-ibRvefpvZBI8WLhw',
    stats: {}
  }


  makeRemoteRequest = () => {
    const url = 'https://meemperrapi.herokuapp.com/user_stats/stats'
    const url2 = 'https://meemperrapi.herokuapp.com/user_stats/best_memes'
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': this.state.jwt
      },
    })
    .then( res => res.json() )
    .then( res => {
      console.log(res);
      this.setState({ stats: res })
      return res;
    })
    .catch(error => {
      console.log(error);
      return error;
    })
    fetch(url2, {
      method: 'GET',
      headers: {
        'Authorization': this.state.jwt
      }
    })
    .then(res => res.json())
    .then(res => {
      images = res.map(elem => {
        ans = { 'image': elem.img, 'key': ''+elem.id};
        return ans;
      });
      this.setState({
        data: images,
        error: res.error || null,
        loading: false,
        refreshing: false
      });
      console.log('Finished loading images');
    })
    .catch( error => {
      console.log('Infinite Scroll error', error)
      this.setState({ error, loading: false, refreshing: false});
      return error;
    });
  }

  componentDidMount() {
    this.makeRemoteRequest()
  }

  renderImage = (image) => {
    return <Image style={{width: 150, height: 150, flex: 1, borderWidth: 1, borderColor: 'black', alignSelf: 'stretch'}}source={{uri: `data:image/gif;base64,${image}`}}/>
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> Settings.js </Text>
        <Text> Comments: {this.state.stats.comments} </Text>
        <Text> Own Memes: {this.state.stats.own_memes} </Text>
        <Text> Own Posts: {this.state.stats.own_posts} </Text>
        <Text> Reactions: {this.state.stats.reactions} </Text>
        <FlatList
          data={this.state.data}
          numColumns={3}
          renderItem={(elem) => {
            return this.renderImage(elem.item.image)}
          }
          refreshing={this.state.refreshing}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({})

export default SettingsScreen