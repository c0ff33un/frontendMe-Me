import React, { Component } from 'react'
import { Text, View, SafeAreaView, Platform, StyleSheet, Image } from 'react-native'


function Header(props) {
  return (
    <View style={styles.container}>
        <Image style={styles.image}
          source={require('../../../../assets/logo/logo_black.png')}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    resizeMode: 'center',
    alignSelf: 'center'
  }
})
export default Header;