import { gql, useQuery } from '@apollo/client';
import { Colors, Text } from 'react-native-ui-lib';
import { FlatList } from 'react-native';
import { KSongTile } from '../components/KSongTile';
import { KSpacer } from '../components/KSpaces';
import { LinearGradient } from 'expo-linear-gradient';

const ALL_SONGS_QUERY = gql`
  query GetAllSongs {
    songs {
      data {
        id
        attributes {
          title
          mp3 {
            data {
              id
              attributes {
                url
              }
            }
          }
          album {
            data {
              id
              attributes {
                title
                cover {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
          artist {
            data {
              id
              attributes {
                name
              }
            }
          }
          featurings {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const SongsScreen = () => {
  const { data, loading, error } = useQuery(ALL_SONGS_QUERY);

  if (error) console.log(error);

  if (loading) {
    return <Text>Fetching data...</Text>;
  }

  return (
    <>
      <LinearGradient
        colors={[Colors.violet, '#6f04f1', Colors.violet]}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.songs.data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => <KSongTile song={item.attributes} />}
          ItemSeparatorComponent={KSpacer({ wid: 1000, hei: 1, bg: Colors.white })}
        />
      </LinearGradient>
    </>
  );
};
