import React from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import API from '@/services/api';
import { useQuery } from '@tanstack/react-query';

interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export default function Screen(): React.ReactNode {
  const { data: posts, isLoading, isFetching } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: async (): Promise<Post[]> => {
      try {
        const response = await API.getPost();

        return response.data.map((post: any) => ({
          ...post,
          body: post.body.replace(/\n/g, '')  // Strip newlines right after fetching
        }));

      } catch (error: any) {
        console.error(error);
        throw new Error(error);
      }
    }
  });

  // console.log(posts);

  if (isLoading || isFetching) {
    return <Text>Loading...</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      }}
    >
      <FlatList
        data={posts}
        keyExtractor={(item: Post) => item.id.toString()}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              width: '100%',
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontVariant: ['small-caps'],
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 12,
              }}
            >
              {item.body}
            </Text>
          </View>
        )}
      />
    </View>

  );
}
