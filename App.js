import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { database } from './src/config/firebase';

export default function App() {
  const [produtos, setProdutos] = useState ([]);

  useEffect(() => {
    database.collection('produtos').onSnapshot((query) => {
      const list = [];
      query.forEach((doc) => {
        list.push(doc.data());
      })

      setProdutos(list);
    })   
  }, [])

  return (
    <View style={styles.container}>
      {produtos.map((produto) => {
        return <Text key={produto.descricao}>{produto.descricao}</Text>
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
