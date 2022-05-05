import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, Image, ActivityIndicator } from 'react-native';
import style from '../style/style';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import {Entypo} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import {useCameras} from '../components/GetCameras';

const INITIAL_LATITUDE = 65.0800;
const INITIAL_LONGITUDE = 25.4800;
const INITIAL_LATITUDE_DELTA = 0.0922;
const INITIAL_LONGITUDE_DELTA = 0.0421;

export default function Feed() {
  const [latitude, setLatitude] = useState(INITIAL_LATITUDE);
  const [longitude, setLongitude] = useState(INITIAL_LONGITUDE);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const {error, loading, data} = useCameras();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      try {
        if (status !== 'granted') {
          setIsLoading(false);
          alert("Geolocation failed.");
          return;
        }
        const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Lowest});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        setIsLoading(false);
      } catch (error) {
        alert(error);
        setIsLoading(false);
      }
    })();
  }, []);


  // console.log("Error: ", error)
  // console.log("data: ", data)

  if (isLoading) {
    return  <View style={style.loadingScreen}>
              <Image
                style={style.logo}
                source={require('../images/logo.png')}
              />
              <ActivityIndicator size="large" />
              <Text style={style.loadingText}>Haetaan sijaintia...</Text>
            </View>
  }
  if (loading) {
    return  <View style={style.loadingScreen}>
              <Image
                style={style.logo}
                source={require('../images/logo.png')}
              />
              <ActivityIndicator size="large" />
              <Text style={style.loadingText}>Ladataan...</Text>
            </View>
  }
  if (error) { return  <View style={style.loadingScreen}>
              <Image
                style={style.logo}
                source={require('../images/logo.png')}
                />
              <ActivityIndicator size="large" />
              <Text style={style.loadingText}>Virhe ladattaessa kameroita... </Text>
            </View>
  }
  else {
    return (
      <View style={style.container}>
        <MapView
          style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height - Constants.statusBarHeight,}}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: INITIAL_LATITUDE_DELTA,
            longitudeDelta: INITIAL_LONGITUDE_DELTA,
          }}>
          {data.weatherCameras.map(weatherCameras => (
            <Marker
              onPress={() => navigation.navigate('Camera',{weatherCamera: weatherCameras})}
              key={weatherCameras.cameraId}
              coordinate={{
                latitude: weatherCameras.lat,
                longitude: weatherCameras.lon,
              }}
            >
              <View>
                <Entypo
                  name="camera"
                  size={24}
                  color="#1252BA"
                />
              </View>
            </Marker>
          ))}
            <Marker
              title="Your location"
              coordinate={{latitude: latitude, longitude:longitude}}
            />
        </MapView>
      </View>
    )
  }
}
