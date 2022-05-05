import React from 'react';
import { View } from 'react-native';
import styles from '../style/style';
import NewFavorite from '../screens/NewFavorite';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

export default function NewFav() {

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
        <NewFavorite />
      </ApolloProvider>
    </View>
  )
}