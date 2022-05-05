import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Footer from './components/Footer';
import Main from './components/Main';
import ShowCamera from './components/ShowCamera';
import Favorites from './screens/Favorites';
import NewFav from './components/NewFav';
import { View, Text, Image, ActivityIndicator } from 'react-native'
import styles from './style/style';
import { useFonts, Esteban_400Regular } from '@expo-google-fonts/esteban';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Esteban_400Regular,
  });

  if (!fontsLoaded) {
    return  <View style={styles.loadingScreen}>
              <Image
                style={styles.logo}
                source={require('./images/logo.png')}
              />
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>Ladataan...</Text>
            </View>
  }
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              title: 'KELIKAMERAT',
              headerTitle: (props) => (
                <Image
                  style={styles.tinyLogo}
                  source={require('./images/logo.png')}
                  resizeMode='contain'
                />
              ),
              headerTitleStyle: { flex: 1, textAlign: 'center' },
            }}
          />
          <Stack.Screen
            name="Camera"
            component={ShowCamera}
            options={{
              title: 'KELIKAMERA',
              headerTitle: (props) => (
                <Image
                  style={styles.tinyLogo}
                  source={require('./images/logo.png')}
                  resizeMode='contain'
                />
              ),
              headerTitleStyle: { flex: 1, textAlign: 'center' },
            }}
          />
          <Stack.Screen
            name="Favorites"
            component={Favorites}
            options={{
              title: "Favorites",
              headerTitle: "Suosikit",
              headerTitleStyle: { color: "#061a3b", fontFamily: 'Esteban_400Regular' },
            }}
          />
          <Stack.Screen
            name="NewFavorite"
            component={NewFav}
            options={{
              title: "NewFavorite",
              headerTitle: "Lisää uusi suosikki",
              headerTitleStyle: { color: "#061a3b", fontFamily: 'Esteban_400Regular' },
            }}
          />
        </Stack.Navigator>
        <Footer />
      </NavigationContainer>
    );
  }
}