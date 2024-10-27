import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Image, Text, View } from 'react-native-ui-lib';
import { KSpacer } from './KSpaces';
import { FlatList } from 'react-native';
import { BASE_URL } from '../constants/api';

export const KAlbumSongs = ({ title, cover, artist, songs }) => {
  return (
    <LinearGradient colors={[Colors.violet, '#6f04f1', Colors.violet]} style={{ flex: 1 }}>
      <View centerH>
        <KSpacer hei={20} />
        <Image
          width={200}
          height={200}
          source={{
            uri: `${BASE_URL}${cover.data.attributes.url}`,
          }}
          style={{ borderRadius: 100 }}
        />
        <KSpacer />
        <Text white montserratL l>
          {title}
        </Text>
        <Text white montserratM m>
          {artist.data.attributes.name}
        </Text>
        <KSpacer hei={30} />
        <View center>
          <Text cerise montserratL l>
            Songs
          </Text>
          <KSpacer />
          <FlatList
            data={songs.data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <View center>
                <Text white montserratM m>
                  {'\u25CF'}
                  {'  '}
                  {item.attributes.title}
                </Text>
              </View>
            )}
            ItemSeparatorComponent={KSpacer}
          />
        </View>
      </View>
    </LinearGradient>
  );
};
