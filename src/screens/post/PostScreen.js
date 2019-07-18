import React, { Fragment, Component } from "react";
import { Image, Picker, Text, StyleSheet, View, FlatList, ActivityIndicator, Dimensions, Button } from "react-native";
// import { connect } from "react-redux";
import getEnvVars from 'me-me/environment'
// import {
//   selectedFilter,
//   fetchMemesIfNeeded,
//   invalidateMemes,
//   setMemeFilter,
//   increaseMemesPageIfNeeded
// } from '@redux/actions'
// import { getMemesByFilter } from '@redux/selectors'
// import { MEME_FILTERS } from '@redux/actionTypes'
// import PropTypes from 'prop-types'
// import { TouchableHighlight } from "react-native-gesture-handler";

import { IconButton, Colors, TextInput, Avatar, DefaultTheme } from "react-native-paper";

class PostScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: null,
      index: -1,
      meme_id:null,
      handle:null,
      img:null,
      reactions:{},
      avatar:null,
    };
  }

  uploadComment = () => {
    
  }
  
  componentWillMount = () =>{
    const u = this.props.navigation.getParam('uri')
    const i = this.props.navigation.getParam('index')
    // console.log(u,i)
    this.setState({index:i,uri:u})
  }

  componentDidMount = () =>{
    const allIds = this.props.navigation.getParam('ids');
    
    const {apiUrl} =  getEnvVars
    const url = `${apiUrl}/memes/${allIds[this.state.index]}`

    fetch(url)
      .then(response => response.json())
      .then(json=>{
        console.log(json.id, json.creator.handle, json.img, json.reaction_counts )
        const meme_id = json.id, handle = json.creator.handle, img = json.img, reactions = json.reaction_counts, avatar = json.creator.avatar
        this.setState({
          meme_id,
          handle,
          img,
          reactions,
          avatar
        })
        return json
      })
      .catch(error => {
        console.log(error)
        return error
      })
  }

  render() {

    return(
      <Fragment>
        <View style={styles.userInfo}>
          <View style={styles.header}>
            <Avatar.Image 
              source={{uri:this.state.avatar}}
              theme={{
                ...DefaultTheme,
                roundness: 2,
                colors: {
                  ...DefaultTheme.colors,
                  primary: 'white',
                  accent: 'black',
                  background : 'black'
                  }
                }
              } 
              size={30}/>
          </View>
          <View>
            <Text style={styles.handleText}>
              {this.state.handle}
            </Text>
          </View>
        </View>
        <Image 
          style={styles.image}
          source={{uri: this.state.img}}
          resizeMode="contain"
        />

        <View style={styles.reactions}>
          <View style={styles.reaction}>
            <Text style={styles.headerText}>
              {this.state.reactions.up}
            </Text>
          </View>
          <View style={styles.reaction}>
            <Text style={styles.headerText}>
              {this.state.reactions.down}
            </Text>
          </View>
          <View style={styles.reaction}>
            <Text style={styles.headerText}>
              {this.state.reactions.left}
            </Text>
          </View>
          <View style={styles.reaction}>
            <Text style={styles.headerText}>
              {this.state.reactions.right}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: "row"}}>
          <TextInput
            mode="flat"
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
            color={Colors.red500}
            size={30}
            onPress={() => console.log('Pressed')}
          />
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  handleText:{
    fontSize: 40,
  },
  image:{
    marginTop:10,
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height*0.4, 
    // flex: 1, 
    backgroundColor: 'white',
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
  reactions:{
    flex:1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  },
  reaction: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
  comment: {
    margin: 8,
    borderColor: "gray",
    width: Dimensions.get('window').width*5/6
  }
})

export default PostScreen;
