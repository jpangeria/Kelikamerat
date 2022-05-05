import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, View, Text, Pressable, Image, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-uuid';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { Esteban_400Regular } from '@expo-google-fonts/esteban';

const STORAGE_KEY = '@favorite_Key';

export default function Favorites() {
  const route = useRoute();
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Esteban_400Regular,
  });
  const [favorites, setFavorites] = useState([]);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEY,jsonValue);
    } catch (e) {
      console.log(e);
    }
  }

  const getData = async() => {
    try {
      return AsyncStorage.getItem(STORAGE_KEY)
      .then (req => JSON.parse(req))
      .then (json => {
        if (json === null) {
          json = [];
        }
        setFavorites(json);
      })
      .catch (error => console.log(error));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (route.params?.name) {
      const newKey = uuid();
      const newFavorite = {key: newKey.toString(),name: route.params?.name, cameraId: route.params?.cameraId, nearestWeatherStationId: route.params?.nearestWeatherStationId};
      // console.log("key: ",newKey);
      const newFavorites = [...favorites, newFavorite];
      storeData(newFavorites);
    }
    getData();
  },[route.params?.name])

  function deleteItem(value) {
    const indx = favorites.findIndex(v => v.key === value);
    favorites.splice(indx, indx >= 0 ? 1 : 0);
    const newFavorites = [...favorites];
    storeData(newFavorites);
    getData();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#ffffff'
      },
      headerRight: () => (
        <AntDesign 
          style={styles.navButton}
          name="plus"
          size={24}
          color="#1252BA"
          onPress={() => navigation.navigate('NewFavorite')} />
      ),
    })
  }),[];

  const removeData = async (key) => {
    try {
      const jsonValue = JSON.stringify(key);
      await AsyncStorage.removeItem(jsonValue);
      console.log('Favorite', jsonValue, 'removed.');
      deleteItem(key);
      // console.log(favorites);
    } catch(e) {
      console.log(e);
    }
    getData();
  }

  const clearAsyncData = async function() {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared.');
    } catch (error) {
      console.error('Error clearing AsyncStorage data.');
    }
    setFavorites([]);
    // console.log(favorites);
    console.log('Favorites cleared.');
  }

  console.log('Favorites array:',favorites);


  if (!fontsLoaded) {
    return  <View style={styles.loadingScreen}>
              <Image
                style={styles.logo}
                source={require('../images/logo.png')}
              />
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>Ladataan...</Text>
            </View>
  }
  else {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.favContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.rowHeader}>Poista kaikki suosikit
              <Pressable onPress={() => clearAsyncData()}>
                <AntDesign
                  style={styles.deleteButton}
                  name="delete"
                  size={24}
                  color="#1252BA"
                  />
              </Pressable>
            </Text>
          </View>
          <View style={styles.hrLine}/>
          {
            favorites.map((favorite) => (
              <View style={styles.rowContainer} key={favorite.key}>
                <Pressable onPress={() => navigation.navigate('Camera',{weatherCamera: favorite})}>
                  <Text style={styles.rowText}>{favorite.name}</Text>
                </Pressable>
                <Pressable onPress={() => removeData(favorite.key)}>
                  <AntDesign
                    style={styles.deleteButton}
                    name="delete"
                    size={24}
                    color="#1252BA"
                    />
                </Pressable>
              </View>
            ))
          }
        </ScrollView>
      </View>
    )
  }
}