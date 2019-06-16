import React, { Component, Fragment } from 'react'
import { Image, Text, StyleSheet, View, FlatList } from 'react-native'
import { Button } from 'react-native-paper'
import { connect } from "react-redux";
import { logout } from '@redux/actions'
import getEnvVars from 'me-me/environment'

class SettingsScreen extends Component {
  
  state = {
    loggingOut: false,
    stats: {},
    info: {},
    data: []
  }

  makeRemoteRequest = () => {
    const { apiUrl } = getEnvVars
    const url = `${apiUrl}/user/stats`
    const url2 = `${apiUrl}/user/best_memes`
    const url3 = `${apiUrl}/user/`
    const jwt = this.props.jwt;

    const options = {
      method: 'GET',
      headers: {
        'Authorization': jwt
      },
    }

    const fetchStats = fetch(url, options)
    const fetchUserMemes = fetch(url2,options)
    const fetchUserInfo = fetch(url3,options)

    Promise.all([fetchStats, fetchUserMemes, fetchUserInfo])
      .then( res => {
        Promise.all([res[0].json(),res[1].json(),res[2].json()])
        .then(data => {
          
          // console.log(data)
          const images = data[1].map( elem => {
            return { 
              "image": elem.img,
              "key": `${elem.id}`
            }
          })
          console.log(images)
          this.setState({
            stats: data[0],
            data: images,
            info: data[3]
          })
          // this.setStatñ{e({stats:data})
        }) 

      })
      .catch(e => console.error(e))
  }

  componentDidMount() {
    this.makeRemoteRequest()
    console.log(this.state.stats)
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
          {/* <ImageBackground source={this.state.stats.} style={{width: '100%', height: '100%'}}>
            <Text>Inside</Text>
          </ImageBackground> */}

          <Text> Control </Text>
          <Button 
            title="Logout"
            disabled={this.state.loggingOut}
            loading={this.state.loggingOut}
            onPress={this.handleLogout}
          >
            Logout
          </Button>
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

const styles = StyleSheet.create({
  image: {
    width: 150, 
    height: 150, 
    borderWidth: 1, 
    borderColor: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function mapStateToProps(state) {
  return {
    jwt: state.session.jwt
  };
}

export default connect(mapStateToProps, {
  logout
})(SettingsScreen)