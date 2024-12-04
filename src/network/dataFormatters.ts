import ApiConstants from './apiConstants';
import { _get } from './instanceMethods';

export function formatAlbum(albumResponse: AlbumResponseType): Album {
  const {
    external_urls: { spotify },
    total_tracks,
    tracks,
  } = albumResponse;

  const album: Album = {
    ...albumResponse,
    spotifyUrl: spotify,
    tracksCount: total_tracks,
    tracks: {
      total: total_tracks,
      items: tracks ? formatTracks(tracks?.items) : [],
    },
  };

  return album;
}

export function formatAlbums(albumResponses: AlbumResponseTypes): Albums {
  return albumResponses.map(formatAlbum);
}

export function formatTrack(trackResponse: TrackResponseType): Track {
  const { duration_ms, external_urls, id, is_playable } = trackResponse;

  const track: Track = {
    ...trackResponse,
    duration: duration_ms,
    spotifyUrl: external_urls.spotify,
    isPlayable: is_playable,
  };

  return track;
}

export function formatTracks(trackResponses: TrackResponseTypes) {
  return trackResponses
    .map(formatTrack)
    .filter((track): track is Track => track.duration !== 0 || track !== undefined);
}

export async function formatTrackWithImage(
  trackResponse: TrackResponseType,
): Promise<Track | undefined> {
  const { duration_ms, external_urls, id, is_playable } = trackResponse;

  const url = ApiConstants.trackImageBaseUrl + id;

  const imageResponse = await _get<TrackImageResponseType>(url);

  let imageUrl = '';
  if (imageResponse.success) {
    imageUrl = imageResponse.responseData.thumbnail_url;
  }

  const track: Track = {
    ...trackResponse,
    duration: duration_ms,
    spotifyUrl: external_urls.spotify,
    image: {
      url: imageUrl,
    },
    isPlayable: is_playable,
  };

  return track;
}

export async function formatTracksWithImages(trackResponses: TrackResponseTypes): Promise<Tracks> {
  const formattedTracks = await Promise.all(trackResponses.map(formatTrackWithImage));

  return formattedTracks.filter((track): track is Track => track !== undefined);
}

export function formatPlaylist(playlistResponse: PlaylistResponseType): Playlist {
  const { external_urls, snapshot_id, followers, tracks } = playlistResponse;

  const trackItems: TrackResponseTypes = tracks.items?.map(({ track }) => track) ?? [];

  const playlist: Playlist = {
    ...playlistResponse,
    snapshotId: snapshot_id,
    spotifyUrl: external_urls.spotify,
    followers: followers?.total,
    tracks: {
      ...tracks,
      total: tracks.total,
      items: formatTracks(trackItems),
    },
  };

  return playlist;
}

export function formatPlaylists(playlistResponses: PlaylistResponseTypes) {
  return playlistResponses.map(formatPlaylist);
}
