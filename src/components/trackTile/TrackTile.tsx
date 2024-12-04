import { useEffect, useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import FastImage from 'react-native-fast-image';

import { formatDuration } from '@utility/helpers';
import { NavigationRoutes } from '@constants';
import ThemedStyles from './styles';
import ApiConstants from '@network/apiConstants';
import { TrackCover } from '@assets/images';
import { _get } from '@network/instanceMethods';
import { useNavigation } from '@react-navigation/native';

const TrackTile = ({ track }: { track: Track }) => {
  const navigation = useNavigation<StackNavigation>();

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const styles = ThemedStyles();

  const fetchImage = async () => {
    const url = ApiConstants.trackImageBaseUrl + id;

    const imageResponse = await _get<TrackImageResponseType>(url);

    if (imageResponse.success) {
      setImageUrl(imageResponse.responseData.thumbnail_url);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const { name, duration, id, isPlayable, previewUrl } = track;

  async function playTrack() {
    navigation.navigate(NavigationRoutes.ComingSoon);
  }

  return (
    <TouchableHighlight
      disabled={!isPlayable}
      onPress={playTrack}
    >
      <View style={styles.tile}>
        {/* <Icon
          family={IconFamily.MaterialIcons}
          name="play-arrow"
          style={styles.icon}
        /> */}

        <FastImage
          defaultSource={TrackCover}
          style={styles.thumbnail}
          source={{ uri: imageUrl }}
        />

        <View style={styles.info}>
          <Text
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {name}
          </Text>
          <Text
            style={styles.duration}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {formatDuration(duration)}
          </Text>
        </View>

        {/* <Icon
          family={IconFamily.MaterialIcons}
          name="star"
          style={[styles.icon, styles.favoriteIcon]}
        /> */}
      </View>
    </TouchableHighlight>
  );
};

export default TrackTile;
