import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';

type SpacerProps = {
  height: number;
};

const Spacer = React.memo(({ height }: SpacerProps) => <View style={{ height: height }} />);

const LoadingPost = () => (
  <MotiView
    style={styles.container}
    transition={{ type: 'timing' }}
    animate={styles.container}
  >
    <Spacer height={16} />
    <Skeleton colorMode='light' height={20} width='50%' />
    <Spacer height={8} />
    <Skeleton colorMode='light' height={20} width='80%' />
    <Spacer height={8} />
    <Skeleton colorMode='light' height={20} width='85%' />
  </MotiView>
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
});

export default LoadingPost;
