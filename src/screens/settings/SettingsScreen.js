import React, { Component, Fragment } from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  FlatList,
  Modal,
  Dimensions
} from "react-native";
import { Button, DefaultTheme } from "react-native-paper";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import { logout } from "@redux/actions";
import PureChart from "react-native-pure-chart";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'

import getEnvVars from "me-me/environment";

class SettingsScreen extends Component {
  state = {
    loggingOut: false,
    stats: {},
    info: {},
    data: [],
    modalVisible: false,
    reactions: {}
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  makeRemoteRequest = () => {
    const { apiUrl } = getEnvVars;
    const url = apiUrl + "/user";
    const url2 = apiUrl + "/user/best_memes";
    const url3 = apiUrl + "/user/stats.json";
    const jwt = this.props.jwt;

    const options = {
      method: "GET",
      headers: {
        Authorization: jwt,
        Accept: "application/json"
      }
    };

    const fetchUserInfo = fetch(url, options);
    const fetchStats = fetch(url3, options);
    const fetchUserMemes = fetch(url2, options);

    Promise.all([fetchUserMemes, fetchUserInfo, fetchStats])
      .then(res => {
        Promise.all([res[0].json(), res[1].json(), res[2].json()])
          .then(data => {
            const images = data[0].map(elem => {
              return {
                image: elem.thumbnail,
                key: `${elem.id}`
              };
            });
            this.setState({
              data: images,
              info: data[1],
              stats: data[2].general_stats,
              reactions: data[2].reactions_stats
            });
          })
          .catch(e => console.error(e));
      })
      .catch(e => console.error(e));
  };

  componentDidMount() {
    this.makeRemoteRequest();
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
                uri: this.state.info.img
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
            <Text> Comments: {this.state.stats.comments_count} </Text>
            <Text> Own Memes: {this.state.stats.memes_count} </Text>
            <Text> Own Posts: {this.state.stats.posts_count} </Text>
            <Text> Reactions: {this.state.stats.reactions_count} </Text>
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
              size={20}
              onPress={() => this.setModalVisible(true)}
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
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <Icon
            reverse
            name="md-close"
            type="ionicon"
            color="#F6BD60"
            size={15}
            onPress={() => this.setModalVisible(false)}
          />
          {/* <Pdf
            source={this.state.pdf}
            onLoadComplete={(numberOfPages,filePath)=>{
            console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page,numberOfPages)=>{
            console.log(`current page: ${page}`);
            }}
            onError={(error)=>{
            console.log(error);
            }}
            style={styles.pdf}
          /> */}
          <View
            style={{
              flex: 10,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <BarChart
              data={{
                labels: ['Comments', 'Own Memes', 'Own Posts', 'Reactions'],
                datasets: [{
                  data: [
                    this.state.stats.comments_count,
                    this.state.stats.memes_count,
                    this.state.stats.posts_count,
                    this.state.stats.reactions_count,
                  ]
                }]
              }}
              width={Dimensions.get('window').width} // from react-native
              height={220}
              chartConfig={{
                backgroundGradientFrom: '#F6BD60',
                backgroundGradientTo: '#FDFFFC',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(39, 39, 39, ${opacity})`
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
            { this.state.stats.reactions_count == 0?
            <View>
              <Text>
                You haven't reacted yet. Is everything ok?
              </Text>
            </View>
            :
            <PieChart
              data={
                [
                  { name: 'Up', population: this.state.reactions.swipe_up > 0 ? this.state.reactions.swipe_up : 0, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                  { name: 'Down', population: this.state.reactions.swipe_down > 0 ? this.state.reactions.swipe_down : 0, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                  { name: 'Left', population: this.state.reactions.swipe_left > 0 ? this.state.reactions.swipe_left : 0, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                  { name: 'Right', population: this.state.reactions.swipe_right > 0 ? this.state.reactions.swipe_right : 1, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                ]
              }
              width={Dimensions.get('window').width}
              height={220}
              chartConfig={{
                backgroundGradientFrom: '#F6BD60',
                backgroundGradientTo: '#FDFFFC',
                color: (opacity = 1) => `rgba(39, 39, 39, ${opacity})`
              }}
              accessor="population"
              paddingLeft="15"
              absolute
            />}
          </View>
        </Modal>
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
  },
  modal: {
    justifyContent: "center",
    alignItems: "center"
  },

  modal2: {
    height: 230,
    backgroundColor: "#3B5998"
  },

  modal3: {
    height: 300,
    width: 300
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
