import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, } from 'react-native';
import Page from '../Page';



 const CameraPage = ({navigation}) => {
  return (
    <Page>
      <Text>Camera</Text>
      <StatusBar style="auto" />
	</Page>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CameraPage;