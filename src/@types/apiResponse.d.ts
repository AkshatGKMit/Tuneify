interface AuthCodeResponseUrlType {
  code: string;
  state: string;
}

interface AuthAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

interface ArtistResponseType {}

type ArtistResponseTypes = ArtistResponseType[];

interface AlbumResponseType {
  id: string;
  name: string;
  images: Images;
  total_tracks: number;
  external_urls: {
    spotify: string;
  };
  artist?: ArtistResponseTypes;
  tracks?: {
    total: number;
    items: TrackResponseTypes;
  };
  popularity: number;
}
type AlbumResponseTypes = AlbumResponseType[];

interface TrackImageResponseType {
  thumbnail_url: string;
}

interface TrackResponseType {
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
  id: string;
  is_playable: false;
  name: string;
  popularity: number;
  preview_url: string;
  uri: string;
}
type TrackResponseTypes = TrackResponseType[];

interface PlaylistResponseType {
  description: string;
  external_urls: {
    spotify: string;
  };
  id: string;
  images: Images;
  name: string;
  snapshot_id: string;
  followers?: {
    total: number;
  };
  tracks: {
    total: number;
    items?: { track: TrackResponseType }[];
  };
  uri: string;
}
type PlaylistResponseTypes = PlaylistResponseType[];

interface GetNewReleasedAlbumsResponseType {
  albums: {
    items: AlbumResponseTypes;
  };
}
interface UserSavedTrack {
  track: TrackResponseType;
}
type UserSavedTracks = UserSavedTrack[];

interface GetUserSavedTracks {
  items: UserSavedTracks;
}

interface GetPlaylistsResponseType {
  items?: PlaylistResponseTypes;
  message?: 'Popular Playlists';
  playlists?: {
    items: PlaylistResponseTypes;
  };
}
