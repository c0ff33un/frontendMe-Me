import React, { Fragment, Component } from "react";
import { Image, Picker, Text, StyleSheet, View, FlatList, ActivityIndicator, Dimensions, TouchableHighlight } from "react-native";
import { batch, connect } from "react-redux";
import { Button, DefaultTheme } from "react-native-paper";
import getEnvVars from 'me-me/environment'
import {
  invalidateMemes,
  setMemeFilter,
  fetchMemes,
  setMeme,
  fetchMeme
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
      <TouchableHighlight 
        style={{flex: 1}} 
        onPress={ () => {
          this.props.navigation.navigate('Post'); 
          
          batch(() =>{
            dispatch(setMeme(this.props.allIds[index]));
            dispatch(fetchMeme());
          })
        }
      }>
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
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button
            onPress={() => this.handleChangeFilter(MEME_FILTERS.HOT)}
            theme={(selectedFilter ==  MEME_FILTERS.HOT)?(selectedFilterTheme):(unselectedFilterTheme)}
          >
            HOT
          </Button>
          <Button
            onPress={() => this.handleChangeFilter(MEME_FILTERS.BEST)}
            theme={(selectedFilter ==  MEME_FILTERS.BEST)?(selectedFilterTheme):(unselectedFilterTheme)}
          >
            BEST
          </Button>
          <Button
            onPress={() => this.handleChangeFilter(MEME_FILTERS.NEW)}
            theme={(selectedFilter ==  MEME_FILTERS.NEW)?(selectedFilterTheme):(unselectedFilterTheme)}
          >
            NEW
          </Button>
        </View>
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
    isFetching,
    allIds
  }
}

const selectedFilterTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#F6BD60",
    accent: "#F6BD60",
    background: "#000"
  }
}

const unselectedFilterTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#272727",
    accent: "#F6BD60",
    background: "#B7B7B7"
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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