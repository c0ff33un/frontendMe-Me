import React, { Component } from 'react'
import { Text, View, SafeAreaView, Platform, StyleSheet, Image } from 'react-native'


function Header(props) {
  return (
    <View>
      <SafeAreaView style={styles.safeArea}>
        <Image
          source={require('../../../../assets/logo/logo_black.png')}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  }
})
export default Header;