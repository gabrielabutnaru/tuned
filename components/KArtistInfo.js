import { Colors, Text, View } from 'react-native-ui-lib';
import { Image } from 'react-native-ui-lib';
import { LinearGradient } from 'expo-linear-gradient';
import { KSpacer } from './KSpaces';
export const KArtistInfo = ({ name, avatar, birth_name, birth_place, birthday, albums }) => {
  const calculate_age = dob1 => {
    let today = new Date();
    let birthDate = new Date(dob1);
    let age_now = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    return age_now;
  };

  const numberOfAlbums = albums.data.length;

  return (
    <LinearGradient colors={[Colors.violet, '#6f04f1', Colors.violet]} style={{ flex: 1 }}>
      <View centerH>
        <KSpacer hei={20} />
        <Image
          width={200}
          height={200}
          source={{
            uri: `http://10.0.2.2:1337${avatar.data.attributes.url}`,
          }}
          style={{ borderRadius: 100 }}
        />
        <KSpacer />
        <Text white montserratL l>
          {name}
        </Text>
        <KSpacer hei={30} />
        <View row>
          <Text white montserratL s>
            Birth name:{' '}
          </Text>
          <Text white montserratm s>
            {birth_name}
          </Text>
        </View>
        <View row>
          <Text white montserratL s>
            Birth place:{' '}
          </Text>
          <Text white montserratm s>
            {birth_place}
          </Text>
        </View>
        <View row>
          <Text white montserratL s>
            Age:{' '}
          </Text>
          <Text white montserratm s>
            {calculate_age(birthday)} years
          </Text>
        </View>
        <View row>
          <Text white montserratL s>
            No. of albums:{' '}
          </Text>
          <Text white montserratm s>
            {numberOfAlbums}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};
