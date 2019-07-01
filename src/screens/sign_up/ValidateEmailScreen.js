import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

class ValidateEmailScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={{width: 400, height: 450, alignSelf: "center"}}
                        resizeMode="contain" source={require('../../../assets/gifs/gif_validate_email.gif')} />

                <Text style={styles.text}>Our AI overlords have checked your application! {"\n\n"} Check it for advancing</Text>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    text: {
        fontSize: 30,
        textAlign: 'center'
    },
  });
  
export default ValidateEmailScreen;