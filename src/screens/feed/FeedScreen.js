import React, { Fragment, Component } from "react";
import { Image, Picker, Text, StyleSheet, View, FlatList, ActivityIndicator, Dimensions, TouchableHighlight } from "react-native";
import { batch, connect } from "react-redux";
import getEnvVars from 'me-me/environment'
import {
  invalidateMemes,
  setMemeFilter,
  fetchMemes
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

  // Old Start <--

  componentDidMount() {
    const { dispatch, selectedFilter } = this.props
    dispatch(fetchMemes(selectedFilter))
  }
  
  handleRefresh = () => {
   const { dispatch, selectedFilter } = this.props
    batch(() => {
      dispatch(invalidateMemes(selectedFilter))
      dispatch(fetchMemes(selectedFilter))
    }) 
  }

  renderFooter = () => {
    if (!this.props.isFetching) return null;

    return (
      <View
        style={{paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE"}}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  handleLoadMore = ({ distanceFromEnd }) => {
    // console.log('end was reached')
    const { dispatch, finished, selectedFilter } = this.props
    console.log('handle load more + finished:' + finished)
    if (!this.props.finished && !this.props.isFetching) {
      dispatch(fetchMemes(selectedFilter))
    }
  }

  handleChangeFilter = (filter) => {
    const { dispatch } = this.props
    batch(() => {
        dispatch(setMemeFilter(filter))
        dispatch(fetchMemes(filter))    
    })
  }

  renderItem = ({item, index}) => {
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
          data={this.props.memes}
          numColumns={numColumns}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          extraData={this.props.isFetching}
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

function mapStateToProps(state) {
  // 👌
  const { selectedFilter, memesByFilter, session } = state
  const { allIds, isFetching, page, finished } = memesByFilter[
    selectedFilter
  ] || {
    allIds: [],
    page: 1,
    isFetching: true,
    finished: false 
  }

  const memes = getMemesByIds(state, allIds)

  return {
    selectedFilter,
    memes,
    finished,
    isFetching
  }
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

export default connect(mapStateToProps)(FeedScreen)