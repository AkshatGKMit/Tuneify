import { View, Text, FlatList } from 'react-native';
import React, { useContext } from 'react';
import ThemedStyles from './styles';
import SettingsContext from '@config/SettingsContext';
import LibraryCard from '@components/libraryCard';
import LoadingView from '@components/loadingView';
import PlaceholderCard from '@components/placeholderCard';

const HorizontalLibrariesView = ({
  libraryType,
  libraries,
  title,
}: HorizontalLibrariesListProps) => {
  const {
    theme,
    dimensions: { width },
  } = useContext(SettingsContext);
  const styles = ThemedStyles(theme);

  const keyExtractor = (item: Library) => item.id;

  const EmptyListView = () => (
    <>
      {Array.from({ length: 4 }, (_, index) => (
        <PlaceholderCard
          key={index}
          type={libraryType}
        />
      ))}
    </>
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={libraries}
        keyExtractor={keyExtractor}
        renderItem={({ item: album }) => (
          <LibraryCard
            type={libraryType}
            library={album}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparatorView} />}
        ListEmptyComponent={<EmptyListView />}
      />
    </View>
  );
};

export default HorizontalLibrariesView;
