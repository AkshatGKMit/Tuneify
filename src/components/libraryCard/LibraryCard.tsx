import { useMemo } from 'react';
import { Text, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { AlbumCover, ArtistCover, PlaylistCover, TrackCover } from '@assets/images';
import { countFollowers, formatDuration } from '@utility/helpers';
import { LibraryType, NavigationRoutes } from '@constants';

import ThemedStyles from './styles';

const LibraryCard = ({ type, library }: LibraryCardProps) => {
  const navigation = useNavigation<StackNavigation>();

  const styles = ThemedStyles();

  const [title, subtitle, image, defaultImage, onPress] = useMemo(() => {
    const onPress = () => {
      navigation.push(NavigationRoutes.Details, { type, id: library.id });
    };

    switch (type) {
      case LibraryType.album: {
        const { name, images, label, tracksCount } = library as Album;
        const imageUrl = images[0]?.url || '';
        const subtitle = tracksCount ? `${tracksCount} Tracks` : label;
        return [name, subtitle, imageUrl, AlbumCover, onPress];
      }
      case LibraryType.artist: {
        const { name, images, followers } = library as Artist;
        const imageUrl = images[0]?.url || '';
        const followerCount = countFollowers(followers);
        return [name, followerCount, imageUrl, ArtistCover, onPress];
      }
      case LibraryType.playlist: {
        const { name, images, tracks, followers } = library as Playlist;
        const imageUrl = images[0]?.url || '';
        const followersCount = countFollowers(followers);
        const trackCount = tracks?.total || 0;
        const subtitle = trackCount > 0 ? `${trackCount} Tracks` : `${followersCount}`;
        return [name, subtitle, imageUrl, PlaylistCover, onPress];
      }
      case LibraryType.track: {
        const { name, duration, image } = library as Track;
        const imageUrl = image?.url || '';
        const subtitle = formatDuration(duration);
        return [
          name,
          subtitle,
          imageUrl,
          TrackCover,
          () => {
            navigation.navigate(NavigationRoutes.ComingSoon);
          },
        ];
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
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      <FastImage
        defaultSource={defaultImage}
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
    </Pressable>
  );
};

export default LibraryCard;
