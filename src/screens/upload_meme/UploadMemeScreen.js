import React, { Component } from 'react'
import { Button, Text, View, Image, Dimensions } from 'react-native'
//import { Button } from 'react-native-paper'
import { ImagePicker } from 'expo';
import { connect } from "react-redux";

class UploadMemeScreen extends Component {
    state = {
        image: null,
        loading: false
    };

    handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: false
        });


        if (!result.cancelled) {
          this.setState({ image : result.uri });
        }
      };

    uploadMeme = () => {
        this.setState({ loading: true });

        const uri = this.state.image
        let uriParts = uri.split('.')
        let fileType = uriParts[uriParts.length - 1]

        meme = new FormData();
        meme.append('meme[image]', {
          uri,
          name: `image.${fileType}`,
          type: `image/${fileType}`,
        })

        console.log(meme)

        let url = 'https://meemperrapi.herokuapp.com/user/memes'

        let options = {
          method: 'POST',
          body: meme,
          headers: {
            'Accept' : 'application/json',
            'Authorization': this.props.jwt,
            'Content-Type': 'multipart/form-data',
          }
        }
    
        fetch(url, options)
        .then(res => {
          this.setState({ loading: false });
          console.log('Sucess');
          return res.json();
        })
        .then(res => {
          console.log(res)
          return res
        })
        .catch(error => {
          this.setState({ loading: false });
          console.log('Error');
          return error;
        })
    };

    render() {
        let { image } = this.state;
        const win = Dimensions.get('window');

        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                {!image && <Button 
                    title="Choose photo"
                    onPress={this.handleChoosePhoto}
                />}
                {image &&
                  <Image 
                    source={{ uri: image }}
                    style={{width: 400, height: 450, alignSelf: "center", marginBottom: 5}}
                    resizeMode="contain"
                  />
                }
                {image && 
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Button
                      style={{flex: 1}}
                      title="Cambiar Me-Me"
                      onPress={this.handleChoosePhoto}
                    />
                    <Button
                      style={{flex: 1}}
                      title="Subir Me-Me"
                      onPress={this.uploadMeme}
                      disabled={this.state.loading}
                      loading={this.state.loading}
                    />   
                  </View>
                }
                
            </View>
      );
    }
}

function mapStateToProps(state) {
  return {
    jwt: state.session
  };
}

export default connect(mapStateToProps)(UploadMemeScreen)