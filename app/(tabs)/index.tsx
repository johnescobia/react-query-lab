import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useQuery } from '@tanstack/react-query';
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
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
      />
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item: Post) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.postContainer}>
          <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
          <Text numberOfLines={4} style={styles.body}>{item.body}</Text>
        </View>
      )}
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f9f9f9'
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20
  },
  postContainer: {
    padding: 20,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    textTransform: 'capitalize'
  },
  body: {
    fontSize: 14,
    color: '#666'
  }
});
