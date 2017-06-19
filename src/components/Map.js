import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Easing,
  Image
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { decode, encode } from 'rn-maps-polyline';

const descriptionViewHeight = Dimensions.get('window').height / 5;
const descriptionViewWidth = Dimensions.get('window').width;
const descriptionViewAspectRatio = (1.0 * descriptionViewHeight) / descriptionViewWidth;
const descriptionPictureHeightRatio = 75;
const descriptionPictureWidthRatio = Math.floor(descriptionPictureHeightRatio * descriptionViewAspectRatio);
const descriptionViewMaxOpacity = 0.8;

const extendedDescriptionViewPictureHeight = Dimensions.get('window').height / 3;
const extendedDescriptionViewPictureWidth = Dimensions.get('window').width * 0.8;
const extendedDescriptionViewButtonHeight = Dimensions.get('window').height / 20;


class Map extends Component
{

  constructor(props)
  {
      super(props);

      this.state = {
        markers: this.props.markers,
        selectedMarkerIndex: 0,
        descriptionContentOpacity: new Animated.Value(1),
        descriptionViewHeight: new Animated.Value(descriptionViewHeight),
        extendedDescriptionViewPictureOpacity: new Animated.Value(0),
        extendedDescriptionViewTitleOpacity: new Animated.Value(0),
        extendedDescriptionViewDescOpacity: new Animated.Value(0),
        bIsDescriptionExtended: false
      };

      this._onExpandingFinished = this._onExpandingFinished.bind(this);
      this._onClosingFinished = this._onClosingFinished.bind(this);
      this._onDescriptionViewPress = this._onDescriptionViewPress.bind(this);
      this._onDescriptionViewPressedWhileExtended = this._onDescriptionViewPressedWhileExtended.bind(this);
      this._getRouteAsPolyline = this._getRouteAsPolyline.bind(this);
      this._getRouteAsPolyline();

      this._bIsDescriptionPressable = true;
  }

  // Uses the Google API to retrieve the path between the markers and returns a Polyline
  _getRouteAsPolyline()
  {
      console.log("INSIDE");
      // Google API - needed to retrieve the path between markers
      const mode = 'walking';
      const origin = this.state.markers[0].position.latitude + '%2C' + this.state.markers[0].position.longitude;
      const lastInd = this.state.markers.length - 1;
      const destination = this.state.markers[lastInd].position.latitude + '%2C' + this.state.markers[lastInd].position.longitude;
      //const destination = this.state.markers[1].position.latitude + '%2C' + this.state.markers[1].position.longitude;
      const APIKEY = 'AIzaSyC-LhTLVisfVQkekK5I-fmvulM_ttyJU5A';
      var waypoints = '';

      for (var i = 1; i < lastInd; ++i)
      {
        const lat = this.state.markers[i].position.latitude;
        const long = this.state.markers[i].position.longitude;
        waypoints += 'via:' + lat + '%2C' + long;
        if (i != lastInd - 1)
        {
          waypoints += '%7C';
        }
      }
      console.log(waypoints);
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${APIKEY}&mode=${mode}`;

      fetch(url)
      .then(response => response.json())
      .then(responseJson => {
          console.log(responseJson);
          if (responseJson.routes.length)
          {
              this.setState({
                  polylineCoords: decode(responseJson.routes[0].overview_polyline.points)
              });
          }
      }).catch(e => {console.warn(e)});
      console.log("ENDED " + this.state.polylineCoords);
  }

  _onExpandingFinished()
  {
    this.setState({
      bIsDescriptionExtended: true
    });

    this.state.extendedDescriptionViewPictureOpacity.setValue(0);
    this.state.extendedDescriptionViewTitleOpacity.setValue(0);
    this.state.extendedDescriptionViewDescOpacity.setValue(0);

    const pictureAnim = Animated.timing(
      this.state.extendedDescriptionViewPictureOpacity,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.linear
      }
    );

    const titleAnim = Animated.timing(
      this.state.extendedDescriptionViewTitleOpacity,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.linear
      }
    );

    const descAnim = Animated.timing(
      this.state.extendedDescriptionViewDescOpacity,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.linear
      }
    );

    Animated.stagger(
      100,
      [pictureAnim, titleAnim, descAnim]
    ).start();

    this._bIsDescriptionPressable = true;
  }

  _onClosingFinished()
  {
    this.setState({
      bIsDescriptionExtended: false
    });

    this._bIsDescriptionPressable = true;
    this.state.descriptionContentOpacity.setValue(0);

    Animated.timing(
      this.state.descriptionContentOpacity,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.linear
      }
    ).start();
  }

  _onDescriptionViewPressedWhileExtended()
  {
    if (this._bIsDescriptionPressable === false)
    {
      return ;
    }

    this._bIsDescriptionPressable = false;

    this.state.extendedDescriptionViewPictureOpacity.setValue(1);
    this.state.extendedDescriptionViewTitleOpacity.setValue(1);
    this.state.extendedDescriptionViewDescOpacity.setValue(1);

    const pictureAnim = Animated.timing(
      this.state.extendedDescriptionViewPictureOpacity,
      {
        toValue: 0,
        duration: 300,
        easing: Easing.linear
      }
    );

    const titleAnim = Animated.timing(
      this.state.extendedDescriptionViewTitleOpacity,
      {
        toValue: 0,
        duration: 300,
        easing: Easing.linear
      }
    );

    const descAnim = Animated.timing(
      this.state.extendedDescriptionViewDescOpacity,
      {
        toValue: 0,
        duration: 300,
        easing: Easing.linear
      }
    );

    Animated.stagger(
      100,
      [descAnim, titleAnim, pictureAnim]
    ).start();

    Animated.timing(
      this.state.descriptionViewHeight,
      {
        toValue: descriptionViewHeight,
        duration: 500,
        easing: Easing.quad
      }
    ).start(() => {this._onClosingFinished()});
  }

  _onDescriptionViewPress()
  {
    if (this._bIsDescriptionPressable === false)
    {
      return ;
    }

    this._bIsDescriptionPressable = false;
    this.state.descriptionContentOpacity.setValue(1);

    Animated.timing(
      this.state.descriptionContentOpacity,
      {
        toValue: 0,
        duration: 100,
        easing: Easing.linear
      }
    ).start();

    Animated.timing(
      this.state.descriptionViewHeight,
      {
        toValue: Dimensions.get("window").height,
        duration: 500,
        easing: Easing.quad
      }
    ).start(() => {this._onExpandingFinished()});

  }

  _getDescriptionView()
  {
    const marker = this.state.markers[this.state.selectedMarkerIndex]
    console.log(marker.pictures);
    const description = marker.description;
    const title = marker.title;

    const descriptionViewOpacity = this.state.descriptionViewHeight.interpolate({
      inputRange: [descriptionViewHeight, Dimensions.get("window").height],
      outputRange: [descriptionViewMaxOpacity, 1]
    });

    if (this.state.bIsDescriptionExtended == false)
    {
      return (
        <TouchableWithoutFeedback onPress={this._onDescriptionViewPress}>
          <Animated.View style={[styles.descriptionView, {height: this.state.descriptionViewHeight, opacity: descriptionViewOpacity}]}>
            <Animated.Image
              source={ {uri: marker.pictures[0]} }
              style={[styles.descriptionPicture, {opacity: this.state.descriptionContentOpacity}]}
            />
            <Animated.Text style={[styles.descriptionTitle, {opacity: this.state.descriptionContentOpacity}]}>{title}</Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      );
    }

    const buttonHeight = this.state.extendedDescriptionViewPictureOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, extendedDescriptionViewButtonHeight]
    });

    return (
      <Animated.View style={{height: this.state.descriptionViewHeight, opacity: descriptionViewOpacity}}>
        <ScrollView style={styles.extendedDescriptionView} contentContainerStyle={{alignItems: 'center'}}>
          <Animated.View style={{height: 100}}/>
          <Animated.Image
            source={ {uri: marker.pictures[0]} }
            style={[styles.extendedDescriptionViewPicture, {opacity: this.state.extendedDescriptionViewPictureOpacity}]}
          />
          <Animated.Text style={[styles.extendedDescriptionViewTitle, {opacity: this.state.extendedDescriptionViewTitleOpacity}]}>{this.state.markers[this.state.selectedMarkerIndex].title}</Animated.Text>
          <Animated.Text style={[styles.extendedDescriptionViewDesc, {opacity: this.state.extendedDescriptionViewDescOpacity}]}>{this.state.markers[this.state.selectedMarkerIndex].description}</Animated.Text>
        </ScrollView>
        <Animated.View style={{height: buttonHeight}}>
          <Button
            onPress={this._onDescriptionViewPressedWhileExtended}
            title="Fermer"
            color="#000000"
            accessibilityLabel="Fermer la fenêtre"
          />
        </Animated.View>
      </Animated.View>
    );
  }

  _updateSelectedMarker(i)
  {
    this.setState({selectedMarkerIndex: i});
  }

  render() {

    if (this.state.polylineCoords === undefined)
    {
      return (<Text style={{marginTop: 64}}>Loading</Text>);
    }

    const descriptionView = this._getDescriptionView();

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.markers[0].position.latitude,
            longitude: this.state.markers[0].position.longitude,
            latitudeDelta: 0.0043,//0.0922,
            longitudeDelta: 0.0034,//0.0421,
          }}>
          {this.state.markers.map((marker, i) => (
             <MapView.Marker
               coordinate={marker.position}
               onPress={e => {
                 this._updateSelectedMarker(i);
               }}
             />
           ))}
           <MapView.Polyline
               coordinates={[
                   ...this.state.polylineCoords
               ]}
               strokeWidth={4}
           />
        </MapView>
        {descriptionView}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  descriptionView: {
    height: descriptionViewHeight,
    width: descriptionViewWidth,
    backgroundColor: 'lightgrey',
    position: 'absolute',
    bottom: 0,
    opacity: descriptionViewMaxOpacity,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  descriptionPicture: {
    height: descriptionPictureHeightRatio + '%',
    width: descriptionPictureWidthRatio + '%',
    backgroundColor: 'black'
  },
  descriptionTitle: {
    height: '100%',
    width: '60%',
    textAlign: 'center',
    textAlignVertical: 'center',
    textDecorationLine: 'underline',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  extendedDescriptionView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'lightgrey',
  },
  extendedDescriptionViewPicture: {
    height: extendedDescriptionViewPictureHeight,
    width: extendedDescriptionViewPictureWidth,
    backgroundColor: 'grey'
  },
  extendedDescriptionViewTitle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    textDecorationLine: 'underline',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 22,
  },
  extendedDescriptionViewDesc: {
    textAlign: 'left',
    justifyContent: 'center',
    fontSize: 16,
  }
});

export default Map;
