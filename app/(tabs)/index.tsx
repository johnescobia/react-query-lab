import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useQuery } from '@tanstack/react-query';
import API from '@/services/api';
import LoadingPost from '@/components/LoadingPost';

interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}

const wait = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));

export default function Screen(): React.ReactNode {
  const [refreshing, setRefreshing] = React.useState(false);

  const { data: posts, isLoading, isFetching, refetch } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: async (): Promise<Post[]> => {
      try {
        const response = await API.getPost();
        return response.data.map((post: Post) => ({
          ...post,
          body: post.body.replace(/\n/g, '') // Strip newlines right after fetching
        }));
      } catch (error: any) {
        console.error(error);
        throw new Error(error);
      } finally {
        await wait(2000); // Simulate a 2 second delay
        setRefreshing(false);
      }
    }
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
  }, [refetch]);

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
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </View>
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#c0c0c0', '#d3d3d3', '#e6e6e6']}
          tintColor="#e6e6e6"
          progressBackgroundColor="#f0f0f0"
        />

      }
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
    padding: 20,
    backgroundColor: '#f9f9f9'
  },
  postContainer: {
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
  },
});
