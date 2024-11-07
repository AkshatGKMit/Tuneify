import { useCallback, useContext } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import Icon from '@components/icon';

import SettingsContext from '@config/SettingsContext';

import { IconFamily } from '@constants';

import ThemedStyles from './styles';

const TrackTile = ({ track }: { track: Track }) => {
  const { theme, dimensions } = useContext(SettingsContext);

  const styles = ThemedStyles(theme, dimensions);

  const { image, name, duration } = track;

  const formattedDuration = useCallback(() => {
    const minutes = String(Math.round(duration / (60 * 1000))).padStart(2, '0');
    const secs = String(duration % (60 * 1000))
      .padStart(2, '0')
      .substring(0, 2);

    return `${minutes}:${secs}`;
  }, [duration]);

  return (
    <View style={styles.tile}>
      <Icon
        family={IconFamily.MaterialIcons}
        name="play-arrow"
        style={styles.icon}
      />

      <FastImage
        source={{ uri: image.url }}
        style={styles.thumbnail}
      />

      <View style={[styles.info]}>
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
          {formattedDuration()}
        </Text>
      </View>

      <Icon
        family={IconFamily.MaterialIcons}
        name="star"
        style={[styles.icon, styles.favoriteIcon]}
      />
    </View>
  );
};

export default TrackTile;
