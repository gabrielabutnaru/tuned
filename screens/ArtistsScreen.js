import { gql, useQuery } from '@apollo/client';
import { Colors, Text } from 'react-native-ui-lib';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList } from 'react-native';
import { KSpacer } from '../components/KSpaces';
import { KArtistTile } from '../components/KArtistTile';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { KArtistInfo } from '../components/KArtistInfo';

const ALL_ARTISTS_QUERY = gql`
  query GetAllArtists {
    artists {
      data {
        id
        attributes {
          name
          avatar {
            data {
              attributes {
                url
              }
              id
            }
          }
          birth_name
          birth_place
          birthday
          albums {
            data {
              id
              attributes {
                title
                cover {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ArtistsScreen = () => {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['45%', '90%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [artistDataModal, setArtistDataModal] = useState(null);

  const { data, loading, error } = useQuery(ALL_ARTISTS_QUERY);

  if (error) console.log(error);

  if (loading) {
    return <Text>Fetching data...</Text>;
  }

  const openModal = item => {
    setArtistDataModal(item);
    bottomSheetRef.current.present();
  };

  return (
    <LinearGradient
      colors={[Colors.violet, '#6f04f1', Colors.violet]}
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <BottomSheetModalProvider>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.artists.data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <KArtistTile artist={item.attributes} onPress={() => openModal(item.attributes)} />
          )}
          ItemSeparatorComponent={KSpacer({ wid: 1000, hei: 1, bg: Colors.white })}
        />
        <BottomSheetModal
          handleStyle={{
            backgroundColor: Colors.violet,
            borderBottomWidth: 1,
            borderBottomColor: Colors.cerise,
          }}
          handleIndicatorStyle={{ backgroundColor: Colors.cerise }}
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <KArtistInfo {...artistDataModal} />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </LinearGradient>
  );
};
