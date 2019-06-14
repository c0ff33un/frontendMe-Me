import React, { Fragment, Component } from "react";
import { Image, Text, Button, StyleSheet, View, FlatList } from "react-native";
import { connect } from "react-redux";
import { setMemeFilter } from '@redux/actions'
import getEnvVars from 'me-me/environment'

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
    const { apiUrl } = getEnvVars
    const { filter } = this.props
    const url = apiUrl + '/memes/' + filter + `?page=${page}&per_page=6`;
    //const url = 'https://meemperrapi.herokuapp.com/pictures';
    setTimeout(() => {
      console.log('Loading Images');
      this.setState({ loading: true }); 
      fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log('res', res)
        images = res.map(elem => {
          ans = { 'image': elem.img };
          if( ans.image ) return ans;
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
        console.log(this.state.data);
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
    return <Image style={{width: 150, height: 150, flex: 1, borderWidth: 1, borderColor: 'black', alignSelf: 'stretch'}}
      source={{uri: image}}/>
  }

  handleFilterPress = (filter) => {
    this.props.setMemeFilter(filter)
  }

  render() {

    const noMeme = this.state.data.length === 0

    return(
      <Fragment>
        { noMeme ? (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>
                No hay me-mes :(
              </Text>
            </View>
          ) : (
            <Fragment>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <Button style={{flex: 1}} title='best' 
                  onPress={() => this.handleFilterPress('best')} 
                />
                <Button style={{flex: 1}} title='hot'  
                  onPress={() => this.handleFilterPress('hot')} 
                />
                <Button style={{flex: 1}} title='new'  
                  onPress={() => this.handleFilterPress('newest')} 
                />
              </View>
              <FlatList
                data={this.state.data}
                numColumns={2}
                renderItem={(elem) => {
                  return this.renderImage(elem.item.image)}
                }
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
                onEndReached={this.handleLoadMore}
                onEndTreshold={0}
                extraData={this.state.refreshing}
              />
            </Fragment>
          )
            
        }
        
      </Fragment>

    );
  }
}

function mapStateToProps(state) {
  return {
    filter: state.memeFilter,
    jwt: state.session
  };
}

export default connect(
  mapStateToProps, 
  { setMemeFilter }
)(FeedScreen);
