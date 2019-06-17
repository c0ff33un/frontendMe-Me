import React, { Fragment, Component } from "react";
import { Image, Picker, Text, StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import getEnvVars from 'me-me/environment'
import {
  selectedFilter,
  fetchMemesIfNeeded,
  invalidateMemes,
  setMemeFilter,
  increaseMemesPageIfNeeded
} from '@redux/actions'
import { getMemesByFilter } from '@redux/selectors'
import { MEME_FILTERS } from '@redux/actionTypes'
import PropTypes from 'prop-types'

class FeedScreen extends Component {


  constructor(props) {
    super(props);

    this.state = {
      error: null,
      loading: false,
      refreshing: false,
      numColumns: 2
    };
  }

  componentDidMount() {
    const { dispatch, selectedFilter } = this.props
    dispatch(fetchMemesIfNeeded(selectedFilter))
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedFilter !== prevProps.selectedFilter) {
      const { dispatch, selectedFilter } = this.props
      dispatch(fetchMemesIfNeeded(selectedFilter))
    }
  }

  handleChange = (nextFilter) => {
    const { dispatch } = this.props
    dispatch(setMemeFilter(nextFilter))
    dispatch(fetchMemesIfNeeded(nextFilter))
  }

  handleRefresh = () => {
    const { dispatch, selectedFilter } = this.props
    dispatch(invalidateMemes(selectedFilter))
    dispatch(fetchMemesIfNeeded(selectedFilter))  
  }

  handleLoadMore = () => {
    this.setState({loading: true})
    const { dispatch, selectedFilter } = this.props
    dispatch(increaseMemesPageIfNeeded(selectedFilter))
    dispatch(fetchMemesIfNeeded(selectedFilter)) 
  }

  renderImage = (image) => {
    return <Image style={{width: 150, height: 150, flex: 1, borderWidth: 1, borderColor: 'black', alignSelf: 'stretch'}}
      source={{uri: image}}/>
  }

  renderFooter = () => {
    console.log("renderFooter")
    console.log(this.props.isFetching, this.state.loading)
    if (!this.props.isFetching) return null;

    return (
      <View
        style={{paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE"}}
      >
        <ActivityIndicator animating size="large" />
      </View>
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
          onValueChange={this.handleChange}
        >
          <Picker.Item label="best" value={MEME_FILTERS.BEST} />
          <Picker.Item label="hot" value={MEME_FILTERS.HOT} />
          <Picker.Item label="new" value={MEME_FILTERS.NEW} />
        </Picker>
        <FlatList
          data={this.props.memes}
          numColumns={this.state.numColumns}
          renderItem={(item) => { return this.renderImage(item.item) } }
          keyExtractor={(item,index) => index.toString()}
          ListFooterComponent={this.renderFooter}
          refreshing={this.props.isRefreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleLoadMore}
          onEndTreshold={0}
          extraData={this.props.isFetching}
        />
      </Fragment>
    );
  }
}

FeedScreen.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
  memes: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedFilter, memesByFilter, session } = state
  const { isFetching, isRefreshing, lastUpdated, items: memes } = memesByFilter[
    selectedFilter
  ] || {
    isFetching: true,
    isRefreshing: false,
    items: []
  }
  return { 
    selectedFilter,
    memes,
    isFetching,
    isRefreshing,
    lastUpdated  
  }
}

export default connect(mapStateToProps)(FeedScreen)
