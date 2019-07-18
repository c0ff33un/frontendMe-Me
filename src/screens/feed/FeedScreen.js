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

const formatData = (data, numColumns) => {
  let numberOfElementsLastRow = data.length % numColumns;
  //console.log('numberOfELementsLastRow'+numberOfElementsLastRow);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    console.log('here')
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true});
    numberOfElementsRow = numberOfElementsLastRow + 1;
  }
  //console.log('formatDataEnd')
  return data;
}

class FeedScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      loading: false,
      refreshing: false
    };
  }

  componentDidMount() {
    const { dispatch, selectedFilter } = this.props
    dispatch(fetchMemes(selectedFilter, numColumns))
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedFilter !== prevProps.selectedFilter) {
      const { dispatch, selectedFilter } = this.props
      dispatch(fetchMemes(selectedFilter, numColumns))
    }
  }

  handleChange = (nextFilter) => {
    const { dispatch } = this.props
    dispatch(setMemeFilter(nextFilter))
    dispatch(fetchMemes(nextFilter, numColumns))
  }

  handleRefresh = () => {
    const { dispatch, selectedFilter } = this.props
    dispatch(invalidateMemes(selectedFilter))
    dispatch(fetchMemes(selectedFilter, numColumns))
  }

  handleLoadMore = () => {
    const { dispatch, selectedFilter } = this.props
    dispatch(fetchMemes(selectedFilter, numColumns)) 
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

  renderItem = ({item, index}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />
    }

    //console.log(item,index)
    return (
      <TouchableHighlight style={{flex: 1}} onPress={() => this.props.navigation.navigate('Post',{uri:item, index, memes:this.props.memes, ids:this.props.allIds})}>
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
          onValueChange={this.handleChange}
        >
          <Picker.Item label="best" value={MEME_FILTERS.BEST} />
          <Picker.Item label="hot" value={MEME_FILTERS.HOT} />
          <Picker.Item label="new" value={MEME_FILTERS.NEW} />
        </Picker>
        <FlatList
          style={styles.container}
          data={formatData(this.props.memes, numColumns)}
          numColumns={numColumns}
          renderItem={this.renderItem}
          keyExtractor={(item,index) => index}
          ListFooterComponent={this.renderFooter}
          refreshing={this.props.isRefreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleLoadMore}
          onEndTreshold={0.5}
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

function mapStateToProps(state) {
  // 👌
  const { selectedFilter, memesByFilter, session } = state
  const { isFetching, page, isRefreshing, lastUpdated, allIds } = memesByFilter[
    selectedFilter
  ] || {
    isFetching: true,
    isRefreshing: false,
    allIds: []
  }

  const memes = getMemesByIds(state, allIds)

  return { 
    page,
    selectedFilter,
    memes,
    allIds,
    isFetching,
    isRefreshing,
    lastUpdated  
  }
}

export default connect(mapStateToProps)(FeedScreen)