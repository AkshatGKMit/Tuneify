import { View, Text, FlatList } from 'react-native';

import LibraryCard from '@components/libraryCard';
import PlaceholderCard from '@components/placeholderCard';

import ThemedStyles from './styles';

const HorizontalLibrariesView = ({
  libraryType,
  libraries,
  title,
}: HorizontalLibrariesListProps) => {
  const styles = ThemedStyles();

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
