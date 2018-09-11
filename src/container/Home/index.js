import React, { Component } from 'react';
import { View, Text, Dimensions, Animated, Image, ScrollView, Slider, PanResponder, StyleSheet } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

class HomeScreen extends Component {

  state = {
    age: 10,
    isScollEnabled: false,
  }

  componentWillMount() {

    this.scollOffset = 0;

    this.animation = new Animated.ValueXY({ x: 0, y: screenHeight - 90 });
    this.PanResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if ((this.state.isScollEnabled && this.scollOffset <= 0 && gestureState.dy > 0) || !this.state.isScollEnabled && gestureState.dy < 0) {
          return true;
        } else {
          return false;
        }
      },
      onPanResponderGrant: (evt, gestureState) => {
        this.animation.extractOffset()
      },

      onPanResponderMove: (evt, gestureState) => {
        this.animation.setValue({ x: 0, y: gestureState.dy })
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.moveY > screenHeight - 120) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1
          }).start()
        } else if (gestureState.moveY < 120) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1
          }).start()
        } else if (gestureState.dy < 0) {
          this.setState({ isScollEnabled: true })
          Animated.spring(this.animation.y, {
            toValue: - screenHeight + 120,
            tension: 1
          }).start()
        }
        else if (gestureState.dy > 0) {
          this.setState({ isScollEnabled: false })

          Animated.spring(this.animation.y, {
            toValue: screenHeight - 120,
            tension: 1
          }).start()
        }
      },
    })
  }
  render() {

    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    }

    const animatedImageHeight = this.animation.y.interpolate({
      inputRange: [0, screenHeight - 90],
      outputRange: [200, 32],
      extrapolate: 'clamp'
    })

    const animatedTitleOpacity = this.animation.y.interpolate({
      inputRange: [0, screenHeight - 400, screenHeight - 90],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })

    const animatedImageMarginLeft = this.animation.y.interpolate({
      inputRange: [0, screenHeight - 90],
      outputRange: [screenWidth / 2 - 100, 10],
      extrapolate: 'clamp'
    })

    const animatedHeaderHeight = this.animation.y.interpolate({
      inputRange: [0, screenHeight - 90],
      outputRange: [screenHeight / 2, 90],
      extrapolate: 'clamp'
    })

    const animatedSongDetailsOpacity = this.animation.y.interpolate({
      inputRange: [0, screenHeight - 400, screenHeight - 90],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    const animatedBackgroundColor = this.animation.y.interpolate({
      inputRange: [0, screenHeight - 90],
      outputRange: ['rgba(0, 0, 0, 0.5)', '#fff'],
      extrapolate: 'clamp'
    })

    const { content, leftSide, image, songTitleStyle } = styles;
    return (
      <Animated.View style={{ flex: 1, backgroundColor: animatedBackgroundColor }}>
        <Animated.View {...this.PanResponder.panHandlers} style={[animatedHeight, content]}>
          <ScrollView
            scrollEnabled={this.state.isScollEnabled}
            scrollEventThrottle={16}
            onScroll={ev => {
              this.scollOffset = ev.nativeEvent.contentOffset.y
            }}
          >

            <Animated.View style={[leftSide, { height: animatedHeaderHeight }]}>
              <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                <Animated.View style={{ height: animatedImageHeight, width: animatedImageHeight, marginLeft: animatedImageMarginLeft }}>
                  <Image style={image} source={require('../../../assets/ph.jpg')} />
                </Animated.View>
                <Animated.Text style={[songTitleStyle, { opacity: animatedTitleOpacity }]}>
                  song title
                </Animated.Text>
              </View>

              <Animated.View style={{ opacity: animatedTitleOpacity, flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                <Ionicons name="md-pause" size={32} />
                <Ionicons name="md-play" size={32} />
              </Animated.View>

            </Animated.View>


            <Animated.View style={{ height: animatedHeaderHeight, opacity: animatedSongDetailsOpacity }}>

              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}> song title </Text>
                <Text style={{ fontSize: 18, color: "#fa95ed" }}> band name song title </Text>
              </View>

              <View style={{ height: 40, alignItems: 'center', width: screenWidth }}>
                <Slider
                  step={1}
                  style={{ width: 300 }}
                  minimumValue={18}
                  maximumValue={71}
                  value={this.state.age}
                />
              </View>

              <View style={{ flex: 2, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
                <Ionicons name="md-rewind" size={40} />
                <Ionicons name="md-pause" size={50} />
                <Ionicons name="md-fastforward" size={40} />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 20 }}>
                <Ionicons name="md-add" size={32} style={{ color: "#fa95ed" }} />
                <Ionicons name="md-more" size={32} style={{ color: "#fa95ed" }} />
              </View>

            </Animated.View>
            <View style={{ height: 1000 }} />
          </ScrollView>
        </Animated.View>
      </Animated.View>
    )
  }
}


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    height: screenHeight,
    backgroundColor: '#fff'
  },
  leftSide: {
    borderTopWidth: 1,
    borderTopColor: '#ebe5e5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    height: null,
    width: null
  },
  songTitleStyle: {
    paddingLeft: 10,
    fontSize: 18
  }

})

export default HomeScreen;
