import React, { Component } from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import { Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import { connect } from "react-redux";
import getEnvVars from 'me-me/environment'
// const vision = require('@google-cloud/vision');
// Creates a client
// const client = new vision.ImageAnnotatorClient();


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

    uploadMeme = async () => {
        this.setState({ loading: true });

        const uri = this.state.image
        
        /**
         * TODO(developer): Uncomment the following line before running the sample.
         */
        // const fileName = 'Local image file, e.g. /path/to/image.png';

        // Performs safe search detection on the local file
        // const [result] = await client.safeSearchDetection(uri);
        // const detections = result.safeSearchAnnotation;
        // console.log('Safe search:');
        // console.log(`Adult: ${detections.adult}`);
        // console.log(`Medical: ${detections.medical}`);
        // console.log(`Spoof: ${detections.spoof}`);
        // console.log(`Violence: ${detections.violence}`);
        // console.log(`Racy: ${detections.racy}`);

        let uriParts = uri.split('.')
        let fileType = uriParts[uriParts.length - 1]

        meme = new FormData();
        meme.append('meme[image]', {
          uri,
          name: `image.${fileType}`,
          type: `image/${fileType}`,
        })

        const { apiUrl } = getEnvVars

        const url = `${apiUrl}/user/memes`

        const options = {
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
                {!image && 
                  <Button 
                    title="Choose photo"
                    onPress={this.handleChoosePhoto}
                  >
                    Choose photo
                  </Button>
                }
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
                      title="Cambiar Me-Me"
                      onPress={this.handleChoosePhoto}
                    >
                      Change meme
                    </Button>
                    <Button
                      title="Subir Me-Me"
                      onPress={this.uploadMeme}
                      disabled={this.state.loading}
                      loading={this.state.loading}
                    >
                      Upload meme
                    </Button>   
                  </View>
                }
                
            </View>
      );
    }
}

function mapStateToProps(state) {
  return {
    jwt: state.session.jwt
  };
}

export default connect(mapStateToProps)(UploadMemeScreen)