import React, { Component } from 'react'
import { Button, Text, View, Image, Dimensions } from 'react-native'
//import { Button } from 'react-native-paper'
import { ImagePicker } from 'expo';

class UploadMemeScreen extends Component {
    state = {
        image: null,
        base64: null,
        loading: false
    };

    handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: false,
          base64: true
        });

        if (!result.cancelled) {
          this.setState({ image: result.uri });
          this.setState({ base64: result.base64.replace(/(?:\r\n|\r|\n)/g, '') });
        }
      };

    uploadMeme = () => {
        this.setState({ loading: true });
        fetch('https://meemperrapi.herokuapp.com/users/4/memes', { //Cambiar cuando se guarde la sesión en Redux
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            meme:{
                picture_image: this.state.base64
            }
            })
        })
        .then(res => {
          this.setState({ loading: false });
          console.log('Sucess');
          return res.json();
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

export default UploadMemeScreen