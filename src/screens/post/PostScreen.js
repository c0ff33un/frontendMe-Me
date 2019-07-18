import React, { Fragment, Component } from "react";
import { Image, Picker, Text, StyleSheet, View, FlatList, ActivityIndicator, Dimensions } from "react-native";
import { batch, connect } from "react-redux";
import {Button} from 'react-native-paper';

import { fetchMeme } from '@redux/actions'
import { getMemeById } from '@redux/selectors'
import { Avatar, DefaultTheme } from "react-native-paper";
import getEnvVars from 'me-me/environment'

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
      loading:false,
    };
  }
  
  reactMeme = (type) => {
    const {apiUrl} =  getEnvVars
    const url = `${apiUrl}/memes/${this.props.memePostId}`
    let reaction_type = null;

    switch(type){
      case "up":
        reaction_type = 0
        break;
      case "down":
        reaction_type = 1
        break;
      case "left":
        reaction_type = 2
        break;
      case "right":
        reaction_type = 3
        break;
    }

    const options = {
      method: 'POST',
      headers: {
        "Authorization": `${this.props.jwt}`,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
            "reaction": {
                "reaction_type": reaction_type
            }
        })
    }

    fetch(url,options)
      .then(response => response.json())
      .then(json=>{
        return json
      })
      .catch(error => {
        console.log(error)
        return error
      })
  }

  componentDidMount = () =>{
    const { dispatch } = this.props
    dispatch(fetchMeme());
  }

  render() {

    return(
      <Fragment style={{flex: 1}}>
        <View style={styles.userInfo}>
          <View style={styles.header}>
            <Avatar.Image 
              source={{uri:this.props.meme.avatar}}
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
              {this.props.meme.handle}
            </Text>
          </View>
        </View>

        <Image 
          style={styles.image}
          source={{uri: this.props.meme.img}}/>

        <View style={styles.reactions}>
          <View style={styles.reaction}>
            <Button  mode="outlined" style={styles.react_button} icon="favorite" theme={react_button_theme} onPress={()=>console.log("up")} >
              {this.props.meme.reactions ? this.props.meme.reactions.up : ""}
            </Button>
          </View>
          <View style={styles.reaction}>
            <Button   mode="outlined" style={styles.react_button} icon="mood-bad" theme={react_button_theme} onPress={()=>console.log("down")}>
              {this.props.meme.reactions ? this.props.meme.reactions.down : ""}
            </Button>
          </View>
          <View  style={styles.reaction} >
            <Button  mode="outlined"style={styles.react_button} icon="check-circle" theme={react_button_theme} onPress={()=>console.log("left")}>
              {this.props.meme.reactions ? this.props.meme.reactions.left : ""}
            </Button>
          </View>
          <View  style={styles.reaction} >
            <Button  mode="outlined"style={styles.react_button} icon="thumbs-up-down" theme={react_button_theme} onPress={()=>console.log("right")}>
              {this.props.meme.reactions ? this.props.meme.reactions.right : ""}
            </Button>
          </View>
        </View>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  // 👌
  const { session, memePostId } = state

  const meme = getMemeById(state, memePostId) 
  const jwt = session.jwt;

  console.log('meme', meme)
  return {
    meme,
    memePostId,
    jwt
  }
}

const react_button_theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#F6BD60",
    accent: "#F6BD60",
    background: "#000"
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
    // width: Dimensions.get('window').width, 
    // height: Dimensions.get('window').height*0.6, 
    flex: 4, 
    backgroundColor: 'white',
    borderWidth: 0, 
    borderColor: 'white', 
    alignSelf: 'stretch'
  },
  userInfo:{
    flex: 1,
    marginBottom:10,
    alignSelf:'center',
    alignContent: 'center',
    height: Dimensions.get('window').width/10,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  react_button:{
    fontWeight: 'bold',
    fontSize: 10,
  },
  reactions:{
    flex:1,
    marginTop: 20,
    // alignContent: 'center',
    justifyContent: 'space-around',
    flexDirection: "row",
  },
  reaction: {
    flex:1,
    marginTop: 20,
    // alignContent: 'center',
    justifyContent: 'space-around',
    flexDirection: "row",
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
  }
})

export default  connect(mapStateToProps)(PostScreen);
