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
import { IconButton, Colors, TextInput, Avatar, DefaultTheme } from "react-native-paper";

class PostScreen extends Component {

  state = {
    comment: ""
  };

  constructor(props) {
    super(props);

  }

  renderItem = ({item, index}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />
    }

    //console.log(item,index)
    return (
      <View style={{marginLeft: 8, marginRight: 8, marginBottom: 4, borderTopStartRadius: 10, borderTopEndRadius: 10, borderBottomEndRadius: 10, backgroundColor: "#ECF0F0"}}>
        <Text style={{paddingLeft: 4}}>{item.handle}</Text>
        <Text style={{fontSize: 20, paddingLeft: 8}}>{item.comment}</Text>
      </View>
    );
  }

  uploadComment = () => {

    const {apiUrl} =  getEnvVars
    const url = `${apiUrl}memes/74/comments`

    console.log(url)

    const options = {   
      method: 'POST',
      headers: {
        'Authorization': this.props.jwt,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment:{
          body: this.state.comment 
        } 
      }),
    }

    console.log(options)
    fetch(url, options)
        .then(res => {
          console.log('Sucess');
          //console.log(res);
          return res.json();
        })
        .then(res => {
          console.log(res)
          return res
        })
        .catch(error => {
          console.log(error);
          return error;
        })

     this.setState({ comment: "" })
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
        <Image 
            style={styles.image}
            source={require("assets/img/elon.jpg")}
            resizeMode="contain"
        />

        <View style={{flexDirection: "row"}}>
          <TextInput
            mode="outlined"
            placeholder="Hey! Put your comment here"
            style={styles.comment}
            value={this.state.comment}
            onChangeText={comment => this.setState({ comment })}
            theme={{
              ...DefaultTheme,
              colors: {
                ...DefaultTheme.colors,
                primary: '#6290C3',
                accent: '#272727',
                background: '#FDFFFC',
                text: '#272727',
                disabled: '#FDFFFC',
                placeholder: '#272727',
              }
            }}
          />
          <IconButton
            icon="send"
            color="#F6BD60"
            size={30}
            onPress = {this.uploadComment}
            style = {{
                      paddingTop: 27}}
          />
        </View>
        <FlatList
          data={[{handle: "ialemusm", comment: "Hola"}, {handle: "ialemusm", comment: "Buenas"}]}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          onEndTreshold={0}
          initialNumToRender={18}
        />

      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  image:{
    marginTop:10,
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height*0.4, 
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
  },
  comment: {
    margin: 8,
    borderColor: "gray",
    width: Dimensions.get('window').width*5/6
  }
})

function mapStateToProps(state) {
  return {
    jwt: state.session.jwt
  };
}

export default connect(mapStateToProps)(PostScreen)