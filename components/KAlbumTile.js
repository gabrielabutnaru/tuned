import { KSpacer } from './KSpaces';
import { Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';

export const KAlbumTile = ({ album, onPress }) => {
  const { title, cover, artist } = album;

  return (
    <>
      <KSpacer hei={4} />
      <TouchableOpacity center onPress={onPress}>
        <View paddingH-16 paddingV-10 flex row width={350} height={100}>
          <View paddingR-20>
            <Image
              width={80}
              height={80}
              source={{
                uri: `http://10.0.2.2:1337${cover.data.attributes.url}`,
              }}
              style={{ borderRadius: 100 }}
            />
          </View>
          <View flex padding-20 centerV>
            <Text montserratL m white>
              {title}
            </Text>
            <Text montserratM xs white>
              {artist.data.attributes.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <KSpacer hei={4} />
    </>
  );
};
