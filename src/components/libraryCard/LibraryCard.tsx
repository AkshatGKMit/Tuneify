import { useContext, useMemo } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import SettingsContext from '@config/SettingsContext';

import { countFollowers, formatDuration } from '@utility/helpers';

import { LibraryType } from '@constants';

import ThemedStyles from './styles';

const LibraryCard = ({ type, library }: LibraryCardProps) => {
  const { theme, dimensions } = useContext(SettingsContext);

  const styles = ThemedStyles(theme, dimensions);

  const [title, subtitle, image] = useMemo(() => {
    switch (type) {
      case LibraryType.album: {
        const { name, images, label } = library as Album;
        const imageUrl = images[0]?.url || '';
        return [name, label, imageUrl];
      }
      case LibraryType.artist: {
        const { name, images, followers } = library as Artist;
        const imageUrl = images[0]?.url || '';
        const followerCount = countFollowers(followers);
        return [name, followerCount, imageUrl];
      }
      case LibraryType.playlist: {
        const { name, images, tracks, followers } = library as Playlist;
        const imageUrl = images[0]?.url || '';
        const followersCount = countFollowers(followers);
        const trackCount = tracks?.items.length || 0;
        const subtitle = trackCount > 0 ? `${trackCount} Tracks` : `${followersCount}`;
        return [name, subtitle, imageUrl];
      }
      case LibraryType.track: {
        const { name, duration, image } = library as Track;
        const imageUrl = image.url || '';
        const subtitle = formatDuration(duration);
        return [name, subtitle, imageUrl];
      }
      default:
        return ['', '', ''];
    }
  }, [type, library]);

  const imageStyles = [
    styles.thumbnail,
    type === LibraryType.artist ? styles.artistThumbnail : null,
  ];

  return (
    <View style={styles.card}>
      <FastImage
        source={{ uri: image }}
        style={imageStyles}
      />
      <Text
        style={styles.title}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
      <Text
        style={styles.subtitle}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default LibraryCard;
