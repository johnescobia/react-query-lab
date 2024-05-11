import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

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

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      {isLoading || isFetching && <Text>Loading...</Text>}
      {posts?.map((post: Post) => (
        <View
          key={post.id}
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
            {post.title}
          </Text>
          <Text
            style={{
              fontSize: 12,
            }}
          >
            {post.body}
          </Text>
        </View>
      ))
      }
      {/* <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Home
      </Text>
      <View style={{
        marginVertical: 30,
        height: 1,
        width: '80%',
      }} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </ScrollView>
  );
}
