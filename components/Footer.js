import React from 'react';
import { View, Pressable } from "react-native";
import {AntDesign, Entypo} from '@expo/vector-icons';
import styles from '../style/style';
import { useNavigation } from '@react-navigation/native';

export default function Footer() {

  const navigation = useNavigation();

  return (
    <View style={styles.footerFlex}>
      <Pressable onPress={() => navigation.navigate('Main')}>
        <Entypo 
            style={styles.footerButton}
            name="map"
            size={24}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Favorites')}>
        <AntDesign 
            style={styles.footerButton}
            name="staro"
            size={24}
        />
      </Pressable>
    </View>
  )
}
