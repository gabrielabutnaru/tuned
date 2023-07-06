import { TouchableOpacity, View, Text } from 'react-native-ui-lib';
import { KSpacer } from '../components/KSpaces';
import { Image } from 'react-native-ui-lib';

export const LandingScreen = ({ navigation }) => {
  return (
    <View bg-violet flex center>
      <Image width={200} height={200} source={require('../assets/music.png')} />
      <KSpacer hei={30} />
      <View width={300}>
        <Text center white xxxl megan>
          Welcome to <Text cerise>Tuned</Text>
        </Text>
      </View>
      <KSpacer hei={60} />
      <View bg-cerise width={200} style={{ borderRadius: 18 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Text montserratL h center white>
            Listen to music
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
