import {
  View,
  Text,
  ScrollView,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Linking,
} from 'react-native';

import GradientScreen from '@components/gradientScreen';
import { useContext, useEffect, useState } from 'react';
import { _get } from '@network/instanceMethods';
import ApiConstants from '@network/apiConstants';
import Toast from 'react-native-toast-message';
import { formatAlbums, formatPlaylists, formatTracksWithImages } from '@network/dataFormatters';
import { LibraryType, NavigationRoutes } from '@constants';
import ThemedStyles from './styles';
import SettingsContext from '@config/SettingsContext';
import HorizontalLibrariesView from '../../components/horizontalLibrariesView/HorizontalLibrariesView';
import TrackTile from '@components/trackTile';
import HomeHeader from '@config/homeHeader';
import { parseUrl } from '@utility/helpers';
import { useNavigation } from '@react-navigation/native';
import TokenContext from '@config/TokenContext';

const Home = () => {
  const navigation = useNavigation<StackNavigation>();

  const { theme } = useContext(SettingsContext);

  const styles = ThemedStyles(theme);

  const [showHeader, setShowHeader] = useState(true);

  const [userSavedTracks, setUserSavedTracks] = useState<Tracks>([]);
  const [savedPlaylists, setSavedPlaylists] = useState<Playlists>([]);
  const [newlyReleasedAlbums, setNewlyReleasedAlbums] = useState<Albums>([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState<Playlists>([]);

  const {
    albums: { getNewRelease: getNewReleaseEndpoint },
    tracks: { getUserSavedTracks: getUserSavedTracksEndpoint },
    playlists: {
      getFeaturedPlaylists: getFeaturedPlaylistsEndpoint,
      getUserSavedPlaylists: getUserSavedPlaylistsEndpoint,
    },
  } = ApiConstants.endpoints;

  async function fetchUserSavedTracks() {
    const savedUserTracksResponse = await _get<GetUserSavedTracks>(getUserSavedTracksEndpoint);

    if (!savedUserTracksResponse.success) {
      const { message } = savedUserTracksResponse.error;
      Toast.show({ text1: message });

      return;
    }

    const { items } = savedUserTracksResponse.responseData;
    const formattedTracks = await formatTracksWithImages(items.map(({ track }) => track));
    setUserSavedTracks(formattedTracks);
  }

  async function fetchNewReleasedAlbums() {
    const newReleasedAlbumsResponse = await _get<GetNewReleasedAlbumsResponseType>(
      getNewReleaseEndpoint,
    );

    if (!newReleasedAlbumsResponse.success) {
      const { message } = newReleasedAlbumsResponse.error;
      Toast.show({ text1: message });

      return;
    }

    const { items } = newReleasedAlbumsResponse.responseData.albums;
    const formattedAlbums = formatAlbums(items);
    setNewlyReleasedAlbums(formattedAlbums);
  }

  async function fetchPlaylists(isFeatured: boolean = false) {
    const url = isFeatured ? getFeaturedPlaylistsEndpoint : getUserSavedPlaylistsEndpoint;
    const getPlaylistsResponse = await _get<GetPlaylistsResponseType>(url);

    if (!getPlaylistsResponse.success) {
      const { message } = getPlaylistsResponse.error;
      Toast.show({ text1: message });

      return;
    }

    const { items, playlists } = getPlaylistsResponse.responseData;
    const formattedPlaylists = formatPlaylists(items ?? playlists?.items ?? []);

    if (isFeatured) setFeaturedPlaylists(formattedPlaylists);
    else setSavedPlaylists(formattedPlaylists);
  }

  const handleDeepLink = async () => {
    const initialUrl = await Linking.getInitialURL();
    if (initialUrl) {
      const parsedUrl = parseUrl(initialUrl);

      const [id, typeFromParams, ...rest] = parsedUrl.baseUrl.split('/').reverse();
      const libraryType: LibraryType =
        typeFromParams === 'playlists' ? LibraryType.playlist : LibraryType.album;

      console.log(id, '  ', typeFromParams, '  ', rest);

      navigation.navigate(NavigationRoutes.Details, { type: libraryType, id });
    }
  };

  useEffect(() => {
    // fetchUserSavedTracks();
    fetchPlaylists();
    // fetchNewReleasedAlbums();
    // fetchPlaylists(true);
  }, []);

  useEffect(() => {
    handleDeepLink();
  }, []);

  function _onScroll(event: NativeSyntheticEvent<NativeScrollEvent>): void {
    const currentOffset = event.nativeEvent.contentOffset.y;

    setShowHeader(currentOffset < 0);
  }

  return (
    <GradientScreen>
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={!showHeader}
        onScroll={_onScroll}
      >
        <HomeHeader />
        <HorizontalLibrariesView
          libraryType={LibraryType.track}
          libraries={userSavedTracks}
          title="Starred Tracks"
        />
        <HorizontalLibrariesView
          libraryType={LibraryType.playlist}
          libraries={savedPlaylists}
          title="Saved Playlists"
        />
        <HorizontalLibrariesView
          libraryType={LibraryType.album}
          libraries={newlyReleasedAlbums}
          title="Newly Released Albums"
        />
        <HorizontalLibrariesView
          libraryType={LibraryType.playlist}
          libraries={featuredPlaylists}
          title="Featured Playlists"
        />
      </ScrollView>
    </GradientScreen>
  );
};

export default Home;
