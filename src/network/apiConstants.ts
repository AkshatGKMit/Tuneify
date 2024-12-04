import { API_ACCOUNT_BASE_URL, API_BASE_URL, API_CLIENT_ID, API_CLIENT_SECRET } from '@env';

const ApiConstants = {
  CLIENT_ID: API_CLIENT_ID,
  CLIENT_SECRET: API_CLIENT_SECRET,
  BASE_URL: API_BASE_URL,
  ACCOUNT_BASE_URL: API_ACCOUNT_BASE_URL,
  tokenType: {
    bearer: 'Bearer',
    basic: 'Basic',
  },
  contentType: {
    form: 'application/x-www-form-urlencoded',
    json: 'application/json',
  } as const,
  trackImageBaseUrl: 'https://embed.spotify.com/oembed/?url=spotify:track:',
  data: {
    account: {
      authorizationScope:
        'user-read-private user-read-recently-played user-top-read playlist-read-private user-library-read user-follow-read user-modify-playback-state user-read-playback-state user-read-currently-playing user-library-modify user-follow-modify playlist-modify-public playlist-modify-private',
      redirectUrl: 'tuneify://login',
      authResponseType: 'code',
      grantType: {
        code: 'authorization_code',
        token: 'refresh_token',
      } as const,
    },
    playlists: {},
  },
  endpoints: {
    account: {
      requestAuthorization: 'authorize',
      requestAccessToken: 'api/token',
    },
    albums: {
      getDetails: (id: string) => `albums/${id}`,
      getNewRelease: 'browse/new-releases',
    },
    tracks: {
      getDetails: (id: string) => `tracks/${id}`,
      getUserSavedTracks: 'me/tracks',
    },
    playlists: {
      getDetails: (id: string) => `playlists/${id}`,
      getFeaturedPlaylists: 'browse/featured-playlists',
      getUserSavedPlaylists: 'me/playlists',
    },
  },
};

export default ApiConstants;
