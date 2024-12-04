import { useContext } from 'react';
import { View } from 'react-native';

import SettingsContext from '@config/SettingsContext';
import { LibraryType } from '@constants';

import ThemedStyles from './styles';

const PlaceholderCard = ({ type }: { type: LibraryType }) => {
  const { theme, dimensions } = useContext(SettingsContext);

  const styles = ThemedStyles(theme, dimensions);

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
