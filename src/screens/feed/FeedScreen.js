import React, { Fragment, Component } from "react";
import { Image, Picker, Text, StyleSheet, View, FlatList, ActivityIndicator, Dimensions, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import getEnvVars from 'me-me/environment'
import {
  fetchMemes,
  invalidateMemes,
  setMemeFilter,
  increaseMemesPageIfNeeded
} from '@redux/actions'
import { getMemesByIds } from '@redux/selectors'
import { MEME_FILTERS } from '@redux/actionTypes'
import PropTypes from 'prop-types'


const numColumns = 3;

function emptyElements(size) {
  return Array(size).fill({empty: true});
}


class FeedScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      refreshing: false,
      finished: false,
      page: 1,
      data: emptyElements(18),
      filter: MEME_FILTERS.BEST
    };
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

  // Old Start <--

  componentDidMount() {
    this.setState({ 
      loading: true 
      }, 
      () => {
        this.makeRemoteRequest()
      })
  }

  makeRemoteRequest = () => {
    const { page, filter } = this.state;
    const url = `https://meemperrapi.herokuapp.com/memes/${filter}?page=${page}&per_page=18`;
    console.log('Loading Images page:' + page ); 
    fetch(url)
    .then(response => response.json())
    .then(json => {
      images = json.map(elem =>  elem.thumbnail)
      finished = images.length === 0

      if(this.state.page != 1) {
        images = [...this.state.data, ...images]
      } 

      if(finished) {
        this.setState({
          data: images,
          error: json.error || null,
          loading: false,
          refreshing: false,
          finished: true
        });
      } else {
        this.setState({
          data: images,
          error: json.error || null,
          loading: false,
          refreshing: false
        });        
      }
      
      console.log('Finished loading images');
    })
    .catch( error => {
      console.log('Infinite Scroll error', error)
      this.setState({ error, loading: false, refreshing: false});
      return error;
    });
  }
  
  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
        finished: false,
        data: []
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  }

  handleLoadMore = ({ distanceFromEnd }) => {
    // console.log('end was reached')
    if (!this.state.finished && !this.state.loading) {
      this.setState({
        page: this.state.page + 1,
        loading: true,
      }, 
      () => {
        this.makeRemoteRequest();
      })  
    }
  }

  handleChangeFilter = (filter) => {
    this.setState({ filter })
  }

  // <--- Old

  /*renderItem = ({item, index}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />
    }
    return (
      <TouchableHighlight style={{flex: 1}}onPress={(e)=>this.props.navigation.navigate('Post')}>
        <Image 
          style={styles.item}
          source={{uri: item}}
        />
      </TouchableHighlight>
    );
  }*/

  renderItem = ({item, index}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />
    }
    return (
      <Image 
        style={styles.item}
        source={{uri: item}}
      />
    );
  }


  render() {

    const { selectedFilter, isFetching, lastUpdated } = this.props

    return(
      <Fragment>
        <Picker
          selectedValue={selectedFilter}
          style={{height: 50, width: 100}}
          mode='dropdown'
          onValueChange={this.handleChangeFilter}
        >
          <Picker.Item label="best" value={MEME_FILTERS.BEST} />
          <Picker.Item label="hot" value={MEME_FILTERS.HOT} />
          <Picker.Item label="new" value={MEME_FILTERS.NEW} />
        </Picker>
        <FlatList
          style={styles.container}
          data={this.state.data}
          numColumns={numColumns}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          extraData={this.state}
          onEndReached={this.handleLoadMore.bind(this)}
          onEndTreshold={0}
          initialNumToRender={18}
        />
      </Fragment>
    );
  }
}


FeedScreen.propTypes = {
  //selectedFilter: PropTypes.string.isRequired,
  //memes: PropTypes.array.isRequired,
  //isFetching: PropTypes.bool.isRequired,
  //lastUpdated: PropTypes.number,
  //dispatch: PropTypes.func.isRequired
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },  
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  }
})

export default FeedScreen