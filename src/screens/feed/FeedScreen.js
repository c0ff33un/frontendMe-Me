import React, { Fragment, Component } from "react";
import { Image, Text, StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

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
    const url = `https://meemperrapi.herokuapp.com/momazos/best?page=${page}&per_page=12`;
    //const url = 'https://meemperrapi.herokuapp.com/pictures';
    this.setState({ loading: true }); 
    setTimeout(() => {
      console.log('Loading Images');
      fetch(url)
      .then(res => res.json())
      .then(res => {
        images = res.map(elem => {
          ans = { 'image': elem.img, 'key': ''+elem.id};
          return ans;
        });
        this.setState({
          data: [...this.state.data, ...images],
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
    }, 1500);
    
  }

  handleRefresh = () => {
    this.setState(
      {
        data: [],
        page: 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  }

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
      loading: true,
    }, () => {
      this.makeRemoteRequest();
    })
  }

  renderImage = (image) => {
    return <Image style={{width: 150, height: 150, flex: 1, borderWidth: 1, borderColor: 'black', alignSelf: 'stretch'}}source={{uri: `data:image/gif;base64,${image}`}}/>
  }

  renderHeader = () => {
    return null;
  }

  renderFooter = () => {

    if (!this.state.loading) return null;

    return (
      <View
        style={{paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE"}}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  render() {
    return(
      <FlatList
        data={this.state.data}
        renderItem={(elem) => {
          return this.renderImage(elem.item.image)}
        }
        numColumns={2}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
        onEndReached={this.handleLoadMore}
        onEndTreshold={0}
        extraData={this.state.loading}
      />
    );
  }
}

function mapStateToProps(state) {
  return { jwt: state.session }
}

export default FeedScreen;
