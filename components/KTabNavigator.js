import { SongsScreen } from '../screens/SongsScreen';
import { ArtistsScreen } from '../screens/ArtistsScreen';
import { AlbumsScreen } from '../screens/AlbumsScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { KSpacer } from './KSpaces';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <>
      <View row bg-violet>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          return (
            <TouchableOpacity paddingL-30 paddingV-16 centerH onPress={onPress} key={index}>
              <Text
                m
                montserratL={isFocused}
                montserratM={!isFocused}
                cerise={isFocused}
                white={!isFocused}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <KSpacer wid={1000} hei={2} bg={Colors.cerise} />
    </>
  );
}

export const KTabNavigator = () => (
  <>
    <View paddingT-30 paddingL-30 paddingB-10 bg-violet>
      <Text cerise xxl megan>
        Browse
      </Text>
    </View>
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="SongsScreen" component={SongsScreen} options={{ title: 'Songs' }} />
      <Tab.Screen name="ArtistsScreen" component={ArtistsScreen} options={{ title: 'Artists' }} />
      <Tab.Screen name="AlbumsScreen" component={AlbumsScreen} options={{ title: 'Albums' }} />
    </Tab.Navigator>
  </>
);
