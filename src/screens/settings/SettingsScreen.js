import React, { Component, Fragment } from "react";
import { Image, Text, StyleSheet, View, FlatList } from "react-native";
import { Button, DefaultTheme } from "react-native-paper";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import { logout } from "@redux/actions";
import getEnvVars from "me-me/environment";

class SettingsScreen extends Component {
  state = {
    loggingOut: false,
    stats: {},
    info: {},
    data: []
  };

  makeRemoteRequest = () => {
    const { apiUrl } = getEnvVars;
    const url = apiUrl + "/user";
    const url2 = apiUrl + "/user/best_memes";
    const url3 = apiUrl + "/user/stats/";
    const jwt = this.props.jwt;

    const options = {
      method: "GET",
      headers: {
        Authorization: jwt
      }
    };

    const fetchUserInfo = fetch(url, options);
    const fetchStats = fetch(url3, options);
    const fetchUserMemes = fetch(url2, options);

    Promise.all([fetchUserMemes, fetchUserInfo])
      .then(res => {
        Promise.all([res[0].json(), res[1].json() /*,res[2].json()*/])
          .then(data => {
            const images = data[0].map(elem => {
              return {
                image: elem.img,
                key: `${elem.id}`
              };
            });
            this.setState({
              data: images,
              info: data[1]
            });
          })
          .catch(e => console.error(e));
      })
      .catch(e => console.error(e));
  };

  componentDidMount() {
    this.makeRemoteRequest();
    // console.log(this.state.stats)
  }

  renderImage = image => {
    return (
      <Image
        style={{
          width: 150,
          height: 150,
          flex: 1,
          borderWidth: 1,
          borderColor: "black",
          alignSelf: "stretch"
        }}
        source={{ uri: image }}
      />
    );
  };

  handleLogout = () => {
    this.setState({ loggingOut: true });
    this.props.logout();
  };

  render() {
    return (
      <Fragment>
        <View style={{ flex: 2, flexDirection: "row" }}>
          <View
            style={{
              flex: 0.5,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={{
                uri:
                  "http://www.sclance.com/pngs/avatar-icon-png/avatar_icon_png_70850.png"
              }}
              style={{
                width: 90,
                height: 90
                //alignSelf: "center",
              }}
              resizeMode="contain"
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: 3
            }}
          >
            <Text> Comments: {this.state.stats.comments} </Text>
            <Text> Own Memes: {this.state.stats.own_memes} </Text>
            <Text> Own Posts: {this.state.stats.own_posts} </Text>
            <Text> Reactions: {this.state.stats.reactions} </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingRight: 10
            }}
          >
            <Icon
              reverse
              name="md-stats"
              type="ionicon"
              color="#F6BD60"
              size={30}
            />
          </View>
        </View>
        <Button
          title="Logout"
          disabled={this.state.loggingOut}
          loading={this.state.loggingOut}
          onPress={this.handleLogout}
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              primary: "#F6BD60",
              accent: "#F6BD60",
              background: "#272727"
            }
          }}
        >
          Logout
        </Button>
        <View style={{ flex: 10 }}>
          <FlatList
            data={this.state.data}
            numColumns={3}
            renderItem={elem => {
              return this.renderImage(elem.item.image);
            }}
            refreshing={this.state.refreshing}
          />
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  hoc: {
    justifyContent: "space-between",
    flexDirection: "column",
    flex: 1
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  image: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: "black"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    flexDirection: "row"
  },
  text: {
    fontSize: 22
  },
  memes: {
    flex: 4
  },
  avatar: {
    flex: 1
  }
});

function mapStateToProps(state) {
  return {
    jwt: state.session.jwt
  };
}

export default connect(
  mapStateToProps,
  {
    logout
  }
)(SettingsScreen);
