import React, { Component, Fragment } from 'react'
import { Image, Text, Button, StyleSheet, View, FlatList } from 'react-native'
import { connect } from "react-redux";
import { logout } from '@redux/actions'

class SettingsScreen extends Component {
  
  state = {
    loggingOut: false,
    stats: {}
  }


  makeRemoteRequest = () => {
    const url = 'https://meemperrapi.herokuapp.com/user/stats'
    const url2 = 'https://meemperrapi.herokuapp.com/user/best_memes'
    const jwt = this.props.jwt;
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': jwt
      },
    })
    .then( res => res.json() )
    .then( res => {
      console.log('settings', res);
      this.setState({ stats: res })
      return res;
    })
    .catch(error => {
      console.log('settings error', error);
      return error;
    })
    fetch(url2, {
      method: 'GET',
      headers: {
        'Authorization': jwt
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
    return <Image style={{width: 150, height: 150, flex: 1, borderWidth: 1, borderColor: 'black', alignSelf: 'stretch'}}
      source={{uri: image}}/>
  }

  handleLogout = () => {
    this.setState({ loggingOut: true })
    this.props.logout()
  }

  render() {
    return (
      <Fragment>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text> Control </Text>
          <Button 
            title="Logout"
            disabled={this.state.loggingOut}
            loading={this.state.loggingOut}
            onPress={this.handleLogout}
          />
          <Text> Stats </Text>
          <Text> Comments: {this.state.stats.comments} </Text>
          <Text> Own Memes: {this.state.stats.own_memes} </Text>
          <Text> Own Posts: {this.state.stats.own_posts} </Text>
          <Text> Reactions: {this.state.stats.reactions} </Text>
        </View>
        <FlatList
          data={this.state.data}
          numColumns={3}
          renderItem={(elem) => {
            return this.renderImage(elem.item.image)}
          }
          refreshing={this.state.refreshing}
        />
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({})

function mapStateToProps(state) {
  return {
    jwt: state.session
  };
}

export default connect(mapStateToProps, {
  logout
})(SettingsScreen)