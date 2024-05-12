import React from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Text, View } from '@/components/Themed';
import LoadingPost from '@/components/LoadingPost';
import API from '@/services/api';

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

  if (isLoading || isFetching) {
    return (
      <FlatList
        data={new Array(10).fill(0)}
        keyExtractor={(_, index) => index.toString()}
        renderItem={LoadingPost}
        style={{
          flex: 1,
          backgroundColor: '#fff'
        }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: 20,
          backgroundColor: '#fff'
        }}
      />
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item: Post) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{
          width: '100%',
          marginVertical: 10,
        }}>
          <Text style={{
            fontSize: 16,
            fontVariant: ['small-caps'],
          }}>{item.title}</Text>
          <Text style={{
            fontSize: 12,
          }}>{item.body}</Text>
        </View>
      )}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
      }}
    />

  );
}
