import React from 'react';
import { StatusBar, Platform, View } from 'react-native';

const RenderStatusBar = () => {
  if (Platform.OS === 'ios') {
    return <StatusBar barStyle="default" />;
  } else {
    return <View style={{ height: 24, backgroundColor: 'rgba(0,0,0,0.2)' }} />;
  }
}

export default RenderStatusBar;