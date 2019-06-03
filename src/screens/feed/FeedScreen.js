import React, { Fragment, Component } from "react";
import { Image, Text, StyleSheet, View, FlatList } from "react-native";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    jwt: state.jwt
  };
}
class FeedScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page } = this.state;
    const url = "https://meemperrapi.herokuapp.com/pictures";
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        images = res.map(elem => {
          ans = { image: elem.image, key: "" + elem.id };
          return ans;
        });
        this.setState({
          data: [...this.state.data, ...images],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false });
      });
  };

  handleRefresh = () => {
    //this.setState(
    //);
  };

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
        source={{ uri: `data:image/gif;base64,${image}` }}
      />
    );
  };

  render() {
    console.log("Feed", this.props.jwt);
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          numColumns={3}
          renderItem={elem => {
            return this.renderImage(elem.item.image);
          }}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps)(FeedScreen);
