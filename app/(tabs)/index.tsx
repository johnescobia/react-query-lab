import React from 'react';
import { FlatList, ListRenderItem, RefreshControl, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { View } from '@/components/Themed';
import LoadingPost from '@/components/LoadingPost';
import ItemPost from '@/components/ItemPost';

import API from '@/services/api';
import { Post } from '@/types';

const wait = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));

const renderItemPost: ListRenderItem<Post> = ({ item }) => <ItemPost item={item} />;
const renderLoadingPost: ListRenderItem<unknown> = () => <LoadingPost />;

export default function Screen(): React.ReactNode {
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const { data: posts, isLoading, isFetching, refetch } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: async (): Promise<Post[]> => {
      try {
        const response = await API.getPost();
        return response.data.map((post: Post) => ({
          ...post,
          body: post.body.replace(/\n/g, '') // Strip newlines right after fetching
        }));
      } catch (error: unknown) {
        console.log(error);
        throw new Error('There was an error while fetching the posts. Please try again.');
      }
    }
  });

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
  }, []);

  const simulateDelay = React.useCallback(async () => {
    await wait(2000); // Simulate a 2 second delay
    setRefreshing(false);
  }, []);

  React.useEffect(() => {
    if (!refreshing) return;
    simulateDelay();
  }, [refreshing]);

  if (isLoading || isFetching) {
    return (
      <FlatList
        data={new Array(10).fill(0)}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderLoadingPost}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
      />
    );
  }

  return (
    <View style={styles.list}>
      <FlatList
        data={posts}
        keyExtractor={(item: Post) => item.id.toString()}
        renderItem={renderItemPost}
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
    </View>
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
});
