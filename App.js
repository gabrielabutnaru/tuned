import { configTheme } from './theme';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';
import { PlayerScreen } from './screens/PlayerScreen';
import { client } from './screens/SongsScreen';
import { KTabNavigator } from './components/KTabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LandingScreen } from './screens/LandingScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

configTheme();

const Stack = createNativeStackNavigator();

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
