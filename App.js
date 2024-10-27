import { configTheme } from './theme';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { PlayerScreen } from './src/screens/PlayerScreen';
import { KTabNavigator } from './src/components/KTabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LandingScreen } from './src/screens/LandingScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { BASE_URL } from './src/constants/api';
import { LogBox } from 'react-native';

configTheme();

LogBox.ignoreAllLogs(); // old techs, would this app be in prod, warnings would be solved

const Stack = createNativeStackNavigator();

export const client = new ApolloClient({
  uri: `${BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default function App() {
  const [loaded] = useFonts({
    Megan: require('./assets/Megan.otf'),
    MontserratL: require('./assets/Montserrat-SemiBold.ttf'),
    MontserratM: require('./assets/Montserrat-Medium.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={'light'} />
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Home" component={KTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen
              name="PlayerScreen"
              component={PlayerScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}
