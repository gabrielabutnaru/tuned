import { Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { ActivityIndicator, FlatList } from 'react-native';
import { Audio } from 'expo-av';
import { KSpacer } from '../components/KSpaces';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../constants/api';

export const PlayerScreen = ({ route, navigation }) => {
  const { song } = route.params;
  const { title, album, artist, mp3, featurings } = song;
  const [isLoading, setIsLoading] = useState(true);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const s = new Audio.Sound();
    const loadSound = async () => {
      await s.loadAsync({ uri: `${BASE_URL}${mp3.data.attributes.url}` });
      setIsLoading(false);
      setSound(s);
    };

    loadSound();

    return () => {
      s.unloadAsync();
    };
  }, []);

  return (
    <LinearGradient
      colors={['#090215', '#6f04f1', '#090215']}
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <View flex>
        <View height={80} paddingL-20 paddingT-40>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SongsScreen');
            }}
            hitSlop={10}
          >
            <Image source={require('../../assets/angle-left.png')} />
          </TouchableOpacity>
        </View>
        <View flex centerH>
          <View flex center>
            <Image
              width={214}
              height={214}
              source={{
                uri: `${BASE_URL}${album.data.attributes.cover.data.attributes.url}`,
              }}
              style={{ borderRadius: 160 }}
            />
            <KSpacer hei={76} />
            <Text white l montserratL>
              {title}
            </Text>
            <View row>
              <Text center white s montserratM>
                {artist.data.attributes.name}
              </Text>
              {featurings.data.length > 0 ? (
                <>
                  <KSpacer />
                  <Text montserratM xs white>
                    {' '}
                    {'\u25CF'}{' '}
                  </Text>
                  <KSpacer />
                  <Text montserratM s white>
                    Featuring:{'  '}
                  </Text>
                  <View>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={featurings.data}
                      keyExtractor={({ id }) => id}
                      renderItem={({ item }) => (
                        <Text montserratM s white>
                          {item.attributes.name}
                        </Text>
                      )}
                    />
                  </View>
                </>
              ) : (
                []
              )}
            </View>
            <Text montserratM s white>
              Album - {album.data.attributes.title}
            </Text>
            <KSpacer />
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <View row>
                <TouchableOpacity
                  title="Play Sound"
                  onPress={() => {
                    sound.playAsync();
                    setIsPlaying(true);
                  }}
                >
                  {isPlaying ? (
                    <Image source={require('../../assets/playTrue.png')} />
                  ) : (
                    <Image source={require('../../assets/playFalse.png')} />
                  )}
                </TouchableOpacity>
                <KSpacer />
                <TouchableOpacity
                  title="Pause Sound"
                  onPress={() => {
                    sound.pauseAsync();
                    setIsPlaying(false);
                  }}
                >
                  <Image source={require('../../assets/pause.png')} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};
