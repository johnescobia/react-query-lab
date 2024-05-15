import React from 'react';
import { AppState, Platform, AppStateStatus } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo'
import { onlineManager, focusManager } from '@tanstack/react-query'
import Toast from 'react-native-toast-message';

import { useColorScheme } from '@/components/useColorScheme';

// Set up the online status manager to use the NetInfo API.
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state: NetInfoState) => {
    setOnline(!!state.isConnected)
  })
})

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a new QueryClient instance.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,  // Never consider data as stale
      gcTime: Infinity,     // Disable garbage collection when a query's cache becomes unused or inactive
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError(error, query) {
      console.error('An error occurred while fetching the query:', query, error);
      Toast.show({ type: 'error', text1: error.message });
    },
  }),
});

// Refetch on App focus
const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange)

    return () => subscription.remove()
  }, [])

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  React.useEffect(() => {
    if (error) throw error;
  }, [error]);

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </ThemeProvider>
      </QueryClientProvider>
      <Toast />
    </>
  );
}
