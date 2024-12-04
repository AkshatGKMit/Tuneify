import React, { useContext, useMemo } from 'react';
import { View, Text, ImageBackground, useWindowDimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

import IconButton from '@components/iconButton';
import { AlbumCover, PlaylistCover } from '@assets/images';
import { IconFamily, LibraryType } from '@constants';

import ThemedStyles from './styles';

const InfoSection = ({
  type,
  image,
  title,
  subtitle,
  tracksCount,
}: {
  type: TrackOmittedLibrary;
  image: string;
  title: string;
  subtitle: string;
  tracksCount: number;
}) => {
  const navigation = useNavigation<DetailsScreenParamList>();

  const styles = ThemedStyles();

  const defaultImage = useMemo(() => {
    switch (type) {
      case LibraryType.album:
        return AlbumCover;
      case LibraryType.artist:
        return LibraryType.artist;
      default:
        return PlaylistCover;
    }
  }, [type]);

  return (
    <FastImage
      defaultSource={defaultImage}
      source={{ uri: image }}
      style={styles.imageBackground}
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        <IconButton
          family={IconFamily.FontAwesome}
          name="chevron-left"
          iconStyle={styles.backButtonIcon}
          containerStyle={styles.backButtonContainer}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <Text
          style={styles.title}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <View style={styles.details}>
          <Text
            style={styles.subtitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {subtitle}
          </Text>
          {tracksCount ? <Text style={styles.subtitle}>{tracksCount} Tracks</Text> : null}
        </View>
      </View>
    </FastImage>
  );
};

export default InfoSection;
