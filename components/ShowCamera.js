import React from 'react';
import { View } from 'react-native';
import styles from '../style/style';
import Camera from '../screens/Camera';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

export default function ShowCamera() {

  const uri = 'https://api.oulunliikenne.fi/proxy/graphql';

  const cache = new InMemoryCache();
  // Create a instance of Apollo Client
  const client = new ApolloClient({
    uri,
    cache
  });
  
  return (
    <View style={styles.container}>
      <ApolloProvider client={client}>
        <Camera />
      </ApolloProvider>
    </View>
  )
}