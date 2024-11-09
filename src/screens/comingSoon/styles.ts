import { Dimensions, StyleSheet } from 'react-native';

const imageSize = Dimensions.get('window').width / 1.5;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  comingSoonImage: {
    width: imageSize,
    height: imageSize,
    resizeMode: 'cover',
  },
});

export default styles;
