import React, { Fragment, Component } from "react";
import { Image, Picker, Text, StyleSheet, View, FlatList, ActivityIndicator, Dimensions } from "react-native";
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
import { TouchableHighlight } from "react-native-gesture-handler";
import { Avatar, DefaultTheme } from "react-native-paper";

class PostScreen extends Component {

  constructor(props) {
    super(props);

  }

  // componentWillMount = () => {
  //   const meme_id = 1
  //   const comment_page = 1

  //   const {apiUrl} = getEnvVars
  //   const options = {
  //     method: 'GET',
  //     url: `${apiUrl}/memes/1/comments?page=1`
  //   }

  // //   fetch(apiUrl,options)
  // //     .then(response => response.json())
  // //     .then(data => console.log(data))
  // //     .catch(e => console.error(e))
  // }

  render() {

    return(
      <Fragment>
        <View style={styles.userInfo}>
          <View style={{flex:1}}>
            <Avatar.Text theme={{
              ...DefaultTheme,
              roundness: 2,
              colors: {
                ...DefaultTheme.colors,
                primary: 'white',
                accent: 'black',
                background : 'black'
              }
            }
          } label="U" color={"transparent"} size={30}/>
            <Text style={styles.headerText}>
              Usuario
            </Text>
          </View>

        </View>
        <Image style={styles.image}
              source={require("assets/img/elon.jpg")}/>

      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  image:{
    marginTop:10,
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').width, 
    // flex: 1, 
    borderWidth: 0, 
    borderColor: 'white', 
    alignSelf: 'stretch'
  },
  userInfo:{
    marginBottom:10,
    alignSelf:'center',
    alignContent: 'center',
    height: Dimensions.get('window').width/10,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  headerText:{
    fontWeight: 'bold',
    fontSize: 10,
  }
})

export default PostScreen;
