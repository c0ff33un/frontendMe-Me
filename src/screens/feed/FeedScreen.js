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
    const url = `https://meemperrapi.herokuapp.com/momazos/best?page=${page}&per_page=12`;
    //const url = 'https://meemperrapi.herokuapp.com/pictures';
    setTimeout(() => {
      console.log('Loading Images');
      this.setState({ loading: true }); 
      fetch(url)
      .then(res => res.json())
      .then(res => {
        images = res.map(elem => {
          ans = { 'image': elem.img, 'key': ''+elem.id};
          return ans;
        });
        if(this.state.page != 1){
          images = [...this.state.data, ...images]
        }
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
    }, 1500);
    
  }

  handleRefresh = () => {
    this.setState(
      {
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
      rereshing: true,
    }, () => {
      this.makeRemoteRequest();
    })
  }

  renderImage = (image) => {
    return <Image style={{width: 150, height: 150, flex: 1, borderWidth: 1, borderColor: 'black', alignSelf: 'stretch'}}source={{uri: `data:image/gif;base64,${image}`}}/>
  }

  render() {
    return(
      <FlatList
        data={this.state.data}
        numColumns={3}
        renderItem={(elem) => {
          return this.renderImage(elem.item.image)}
        }
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
        onEndReached={this.handleLoadMore}
        onEndTreshold={100}
      />
    );
  }
}

export default connect(mapStateToProps)(FeedScreen);
