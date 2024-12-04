import { View } from 'react-native';

import { LibraryType } from '@constants';

import ThemedStyles from './styles';

const PlaceholderCard = ({ type }: { type: LibraryType }) => {
  const styles = ThemedStyles();

  const imageStyles = [
    styles.thumbnail,
    type === LibraryType.artist ? styles.artistThumbnail : null,
  ];

  return (
    <View style={styles.card}>
      <View style={imageStyles} />
      <View style={styles.title} />
      <View style={styles.subtitle} />
    </View>
  );
};

export default PlaceholderCard;
