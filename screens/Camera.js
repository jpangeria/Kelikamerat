import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, Text, View, Image, BackHandler, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import {useCameras} from '../components/GetCameras';
import style from '../style/style';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { Esteban_400Regular } from '@expo-google-fonts/esteban';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH*0.85);

export default function Camera() {
  const route = useRoute();
  const navigation = useNavigation();
  const {error, loading, data} = useCameras();
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Esteban_400Regular,
  });
  const [index, setIndex] = React.useState(0);
  const [name, setName] = useState('');
  const [nearestWeatherStationId, setNearestWeatherStationId] = useState('');
  const [cameraId, setCameraId] =  useState('');

  const _renderItem = ({ item, index }) => {
    return (
      <View style={style.container} key={index}>
        <Text style={style.cameraHeader}>{item.presentationName}</Text>
        <Image
          style={{
            width: ITEM_WIDTH,
            height: SLIDER_WIDTH / Math.round(16/9),
            marginBottom: 10,}}
          source={{
            uri: item.imageUrl,
          }}
        />
        <Text style={style.cameraInfo}>Kuvattu klo {(new Date(item.measuredTime)).toLocaleTimeString()}</Text>
      </View>
    );
  }

  useEffect(() => {
    if (route.params?.weatherCamera) {
      setName(route.params?.weatherCamera.name);
      setNearestWeatherStationId(route.params?.weatherCamera.nearestWeatherStationId);
      setCameraId(route.params?.weatherCamera.cameraId);
    }
    BackHandler.addEventListener('hardwareBackPress', close);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', close);
    }
  }, [route.params?.weatherCamera])

  function close() {
    navigation.goBack(null);
    return true;
  }

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerStyle: {
  //       backgroundColor: '#ffffff'
  //     },
  //     headerRight: () => (
  //       <AntDesign
  //         style={style.navButton}
  //         name="staro"
  //         size={24}
  //         onPress={() => navigation.navigate('Favorites',{name: name, cameraId: cameraId, nearestWeatherStationId: nearestWeatherStationId})} />
  //     ),
  //   })
  // }),[route.params?.weatherCamera.cameraId];

  if (!fontsLoaded) {
    return  <View style={style.loadingScreen}>
              <Image
                style={style.logo}
                source={require('../images/logo.png')}
              />
              <ActivityIndicator size="large" />
              <Text style={style.loadingText}>Ladataan...</Text>
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
    function isRightWeatherStation(selectedStation) {
      const nearestStation = nearestWeatherStationId + '';
      return selectedStation.weatherStationId === nearestStation;
    }
  
    const weatherData = data.weatherStations.find(isRightWeatherStation);
    // console.log('data: ', data);
    // console.log('weatherData: ', weatherData);

    function isRightWeatherCamera(selectedCamera) {
      const camId = cameraId + '';
      return selectedCamera.cameraId === camId;
    }
  
    const cameraPresets = data.weatherCameras.find(isRightWeatherCamera);
    // console.log('cameraPresets: ', cameraPresets); 


    return (
      <ScrollView style={style.container}>
        <Text style={style.cameraTitle}>{name}</Text>
        <Carousel
          renderItem={_renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          data={cameraPresets.presets}
          inactiveSlideShift={0}
          onSnapToItem={(index) => setIndex(index)}
          useScrollView={true} />
          <Pagination
          dotsLength={cameraPresets.presets.length}
          activeDotIndex={index}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.92)'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        { weatherData &&
        <View style={style.weatherData}>
            <Text style={style.weatherTitle}>Säätiedot</Text>
            {/* <Text style={style.weatherText}>Nearest WeatherStation id: {nearestWeatherStationId}</Text> */}
            {/* <Text style={style.weatherText}>Selected WeatherStation id: {weatherData.weatherStationId}</Text> */}
            <Text style={style.weatherText}>Mitattu klo {(new Date(weatherData.measuredTime)).toLocaleTimeString()}</Text>
            {weatherData.sensorValues.map(weather => (
            weather.name === "TIE_1" &&
              <View key={weather.name}>
                <Text style={style.weatherText}>Tien lämpötila: {weather.sensorValue} {weather.sensorUnit}</Text>
              </View>
            ))}
            {weatherData.sensorValues.map(weather => (
            weather.name === "KESKITUULI" &&
              <View key={weather.name}>
                <Text style={style.weatherText}>Tuulen nopeus: {weather.sensorValue} {weather.sensorUnit}</Text>
              </View>
            ))}
            {weatherData.sensorValues.map(weather => (
            weather.name === "ILMA"  &&
              <View key={weather.name} style={style.weatherFlex}>
                <MaterialCommunityIcons 
                  style={style.navButton}
                  name="weather-partly-cloudy"
                  size={24}
                  color="#1252BA"
                />
                <Text style={style.weatherAirText}> {weather.sensorValue} {weather.sensorUnit}</Text>
              </View>
            ))}
        </View>
      }
      </ScrollView>
    )
  }
}
