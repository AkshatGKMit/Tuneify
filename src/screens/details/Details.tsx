import { View, Text, FlatList, ScrollView, LogBox } from 'react-native';

import GradientScreen from '@components/gradientScreen';
import { useRoute } from '@react-navigation/native';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import ApiConstants from '@network/apiConstants';
import { IconFamily, LibraryType } from '@constants';
import { _get } from '@network/instanceMethods';
import Toast from 'react-native-toast-message';
import {
  formatAlbum,
  formatPlaylist,
  formatTrackWithImage,
  formatTracksWithImages,
} from '@network/dataFormatters';
import InfoSection from './InfoSection';
import LoadingView from '@components/loadingView';
import { AlbumCover, ArtistCover, PlaylistCover, TrackCover } from '@assets/images';
import HorizontalLibrariesView from '@components/horizontalLibrariesView/HorizontalLibrariesView';
import { GlobalThemedStyles } from '@themes';
import SettingsContext from '@config/SettingsContext';
import TrackTile from '@components/trackTile';
import ThemedStyles from './styles';
import Icon from '@components/icon';
import { countFollowers } from '@utility/helpers';

const Details = () => {
  const route = useRoute<DetailsScreenRoute>();

  const { theme, dimensions } = useContext(SettingsContext);

  const [type, setType] = useState<TrackOmittedLibrary | null>(LibraryType.playlist);
  const [library, setLibrary] = useState<Library | null>(null);

  const globalStyles = GlobalThemedStyles(theme);
  const styles = ThemedStyles(theme, dimensions);

  const {
    albums: { getDetails: albumDetailsEndpoint },
    playlists: { getDetails: playlistDetailsEndpoint },
    tracks: { getDetails: trackDetailsEndpoint },
  } = ApiConstants.endpoints;

  const fetchAlbumDetails = async (id: string) => {
    const albumDetailsResponse = await _get<AlbumResponseType>(albumDetailsEndpoint(id));

    if (!albumDetailsResponse.success) {
      const { message } = albumDetailsResponse.error;
      Toast.show({ text1: message, type: 'error' });
      return;
    }

    const { responseData } = albumDetailsResponse;
    const formattedAlbum = formatAlbum(responseData);

    setLibrary(formattedAlbum);
  };

  const fetchPlaylistDetails = async (id: string) => {
    const playlistDetailsResponse = await _get<PlaylistResponseType>(playlistDetailsEndpoint(id));

    if (!playlistDetailsResponse.success) {
      const { message } = playlistDetailsResponse.error;
      Toast.show({ text1: message, type: 'error' });
      return;
    }

    const { responseData } = playlistDetailsResponse;
    const formattedPlaylist = formatPlaylist(responseData);

    setLibrary(formattedPlaylist);
  };

  useEffect(() => {
    // LogBox.ignoreAllLogs();

    const { id, type } = route.params;
    setType(type);
    if (type === LibraryType.album) fetchAlbumDetails(id);
    if (type === LibraryType.playlist) fetchPlaylistDetails(id);
  }, [route.params]);

  if (library === null || type === null)
    return (
      <View style={globalStyles.screen}>
        <GradientScreen>
          <LoadingView />
        </GradientScreen>
      </View>
    );

  const getDetails = (library: Library, type: TrackOmittedLibrary): GetDetails => {
    if (type === LibraryType.album) {
      const { name, images, artists, tracksCount, tracks } = library as Album;
      const imageUrl = images[0]?.url || '';
      const subtitle = artists!.map(({ name }) => name).join(' | ');
      const trackCount = tracksCount!;
      return [name, subtitle, imageUrl, trackCount, tracks!.items];
    }

    if (type === LibraryType.playlist) {
      const { name, images, followers, tracks } = library as Playlist;
      const imageUrl = images[0]?.url || '';
      const subtitle = countFollowers(followers);
      const trackCount = tracksCount!;
      return [name, subtitle, imageUrl, trackCount, tracks!.items!];
    }
    return ['', '', '', 0, []];
  };

  const [title, subtitle, image, tracksCount, tracks] = getDetails(library, type);

  const ListHeader = () => {
    return (
      <>
        <View style={styles.listHeader}>
          <Icon
            family={IconFamily.MaterialIcons}
            name="audiotrack"
            style={styles.headerTitle}
          />
          <Text style={styles.headerTitle}>Tracks</Text>
        </View>
      </>
    );
  };

  return (
    <ScrollView
      style={globalStyles.screen}
      stickyHeaderIndices={[1]}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
    >
      <InfoSection
        type={type}
        image={image}
        title={title}
        subtitle={subtitle}
        tracksCount={tracksCount!}
      />
      <ListHeader />
      <GradientScreen>
        <FlatList
          nestedScrollEnabled
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          initialNumToRender={10}
          data={tracks}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          renderItem={({ item: track }) => (
            <TrackTile
              key={track.id}
              track={track}
            />
          )}
        />
      </GradientScreen>
    </ScrollView>
  );
};

export default Details;
