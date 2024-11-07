interface Image {
  url: string;
  height?: number | null;
  width?: number | null;
}
type Images = Image[];

interface Album {
  id: string;
  name: string;
  images: Images;
  spotifyUrl: string;
  popularity: number;
  label: string;
  artists?: Artists;
  genres?: StringList;
  tracksCount?: number;
  tracks?: {
    href: string;
    limit: number;
    nextPage: string;
    offset: number;
    previousPage: string;
    total: number;
    items: Tracks;
  };
}
type Albums = Album[];

interface Artist {
  id: string;
  name: string;
  images: Images;
  spotifyUrl: string;
  uri: string;
  popularity: number;
  followers?: number;
  genres?: StringList;
  href?: string;
  albums?: {
    href: string;
    limit: number;
    nextPage: string;
    offset: number;
    previousPage: string;
    total: number;
    items: Album[];
  };
  tracks?: Tracks;
  relatedArtists?: Artists;
}
type Artists = Artist[];

interface Playlist {
  id: string;
  name: string;
  images: Images;
  public: boolean;
  description?: string | null;
  spotifyUrl?: string;
  followers?: number;
  snapshotId?: string;
  tracks?: {
    href: string;
    limit: number;
    nextPage: string;
    offset: number;
    previousPage: string;
    total: number;
    items: Tracks;
  };
  uri?: string;
}
type Playlists = Playlist[];

interface Track {
  id: string;
  name: string;
  duration: number;
  spotifyUrl: string;
  isPlayable: boolean;
  popularity: number;
  previewUrl?: string;
  uri: string;
  image: Image;
  album?: Album;
  artists?: Artists;
}
type Tracks = Track[];
