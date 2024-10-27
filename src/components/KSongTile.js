import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { KSpacer } from './KSpaces';
import { BASE_URL } from '../constants/api';

export const KSongTile = ({ song }) => {
  const navigation = useNavigation();
  const navigateToPlayerScreen = () => {
    navigation.navigate('PlayerScreen', { song });
  };

  const { title, album, artist, featurings } = song;

  return (
    <>
      <KSpacer hei={4} />
      <TouchableOpacity center onPress={navigateToPlayerScreen}>
        <View paddingH-16 paddingV-10 row width={350} height={100} flex>
          <View paddingR-20>
            <Image
              width={80}
              height={80}
              source={{
                uri: `${BASE_URL}${album.data.attributes.cover.data.attributes.url}`,
              }}
              style={{ borderRadius: 100 }}
            />
          </View>
          <View flex padding-20 centerV>
            <Text montserratL m white>
              {title}
            </Text>
            <View row>
              <Text montserratM xs white>
                {artist.data.attributes.name}
              </Text>

              {featurings.data.length > 0 ? (
                <>
                  <KSpacer />
                  <Text montserratM xs white>
                    {' '}
                    {'\u25CF'}
                  </Text>
                  <KSpacer />
                  <Text montserratM xs white>
                    Featuring:{'  '} {featurings.data[0].attributes.name}
                  </Text>
                  {featurings.data.length > 1 ? (
                    <Text montserratM xs white>
                      , ...
                    </Text>
                  ) : (
                    []
                  )}
                </>
              ) : (
                []
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <KSpacer hei={4} />
    </>
  );
};
