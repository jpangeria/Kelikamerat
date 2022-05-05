import React, { useState,useLayoutEffect,useEffect,Component } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCameras } from '../components/GetCameras';
import { Dropdown } from 'react-native-element-dropdown';
import style from '../style/style';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { Esteban_400Regular } from '@expo-google-fonts/esteban';

export default function NewFavorite() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Esteban_400Regular,
  });
  const [name, setName] =  useState('');
  const [cameraId, setCameraId] =  useState('');
  const [nearestWeatherStationId, setNearestWeatherStationId] =  useState('');

  const {error, loading, data} = useCameras();

  const navigation = useNavigation();

  const [value, setValue] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#ffffff'
      },
      headerRight: () => (
        <AntDesign
          style={style.navButton}
          name="save"
          size={24}
          color="#1252BA"
          onPress={() => navigation.navigate('Favorites',{name: name, cameraId: cameraId, nearestWeatherStationId: nearestWeatherStationId})} />
      ),
    })
  }),[name];

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
    const dataDropdown = data.weatherCameras.map(({cameraId,name,lat,lon,nearestWeatherStationId,presets})=> {
      function isRightWeatherStation(selectedStation) {
        const nearestStation = nearestWeatherStationId + '';
        return selectedStation.weatherStationId === nearestStation;
      }
      return {name,cameraId,nearestWeatherStationId}
    });

    // console.log('dataDropdown: ',dataDropdown);
    // console.log('Favorite added:',name);

    return (
      <Dropdown
        style={style.dropdown}
        placeholderStyle={style.placeholderStyle}
        selectedTextStyle={style.selectedTextStyle}
        inputSearchStyle={style.inputSearchStyle}
        iconStyle={style.iconStyle}
        data={dataDropdown}
        search
        maxHeight={300}
        labelField="name"
        valueField="cameraId"
        placeholder="Valitse kamera"
        searchPlaceholder="Etsi..."
        value={value}
        onChange={item => {
          setValue(item.cameraId);
          setName(item.name);
          setCameraId(item.cameraId);
          setNearestWeatherStationId(item.nearestWeatherStationId);
        }}
        renderLeftIcon={() => (
          <AntDesign style={style.icon} color="#1252BA" name="Safety" size={20} />
        )}
      />
    );
  };
};