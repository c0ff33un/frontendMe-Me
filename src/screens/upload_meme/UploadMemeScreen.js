import React, { Component } from 'react'
import { Text, View, Button, Image, Dimensions } from 'react-native'
import { ImagePicker } from 'expo';
 
class UploadMemeScreen extends Component {
    state = {
        image: null,
        base64: null
    };

    handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: false,
          base64: true
        });

        console.log(result);

        if (!result.cancelled) {
          this.setState({ image: result.uri });
          this.setState({ base64: result.base64.replace(/(?:\r\n|\r|\n)/g, '') });
        }
      };

    uploadMeme = async () => {
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
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response))
    };

    render() {
        let { image } = this.state;
        const win = Dimensions.get('window');
        return (
            <View>
                {!image && <Button 
                    title="Choose photo"
                    onPress={this.handleChoosePhoto}
                />}
                {image &&
                    <Image 
                        source={{ uri: image }}
                        style={{width: 400, height: 450, alignSelf: "center", marginBottom: 20}}
                        resizeMode="contain"
                    />
                }
                {image && <Button 
                    title="Subir Me-Me"
                    onPress={this.uploadMeme}
                />}
            </View>
        )
    }
}

export default UploadMemeScreen