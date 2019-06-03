import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

class SettingsScreen extends Component {
  
  state = {
    jwt: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0Iiwic2NwIjoidXNlciIsImlhdCI6MTU1OTUzOTkwOCwiZXhwIjoxNTU5NjI2MzA4LCJqdGkiOiI4ZjlhODZlNi01Mzk0LTQ5ODEtYTgxYy00ZDA0ZTg5YWEyNGMifQ.hXA402tl5lNqtvBuSAB6j5spiM5F6nD5P9WBg3WQ38E',
    stats: {}
  }


  makeRemoteRequest = () => {
    const url = 'https://meemperrapi.herokuapp.com/user_stats/stats'
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
  }

  componentDidMount() {
    this.makeRemoteRequest()
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> Settings.js </Text>
        <Text> Comments: {this.state.stats.comments} </Text>
        <Text> Own Memes: {this.state.stats.own_memes} </Text>
        <Text> Own Posts: {this.state.stats.own_posts} </Text>
        <Text> Reactions: {this.state.stats.reactions} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})

export default SettingsScreen