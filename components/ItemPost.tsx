import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import { Post } from '@/types';

const ItemPost = ({ item }: { item: Post }) => (
  <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}>
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  }
});

export default React.memo(ItemPost);