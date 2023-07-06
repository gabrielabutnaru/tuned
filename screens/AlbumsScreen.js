import { gql, useQuery } from '@apollo/client';
import { Colors, Text } from 'react-native-ui-lib';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList } from 'react-native';
import { KSpacer } from '../components/KSpaces';
import { KAlbumTile } from '../components/KAlbumTile';
import { useCallback, useMemo, useRef, useState } from 'react';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { KAlbumSongs } from '../components/KAlbumSongs';

const ALL_ALBUMS_QUERY = gql`
  query GetAllAlbums {
    albums {
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
          artist {
            data {
              attributes {
                name
              }
            }
          }
          songs {
            data {
              id
              attributes {
                title
              }
            }
          }
        }
      }
    }
  }
`;
export const AlbumsScreen = () => {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['45%', '90%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [albumDataModal, setAlbumDataModal] = useState(null);

  const { data, loading, error } = useQuery(ALL_ALBUMS_QUERY);

  if (error) console.log(error);

  if (loading) {
    return <Text>Fetching data...</Text>;
  }

  const openModal = item => {
    setAlbumDataModal(item);
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
          data={data.albums.data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <KAlbumTile album={item.attributes} onPress={() => openModal(item.attributes)} />
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
          <KAlbumSongs {...albumDataModal} />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </LinearGradient>
  );
};
