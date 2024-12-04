import { TouchableHighlight } from 'react-native';

import Icon from '@components/icon';
import { useAppSelector } from '@store';
import { Colors } from '@themes';
import { colorWithOpacity } from '@utility/helpers';

import styles from './styles';

const IconButton = ({
  family,
  name,
  onPress,
  containerStyle,
  iconStyle,
  underlayColor,
}: IconBtnProps) => {
  const isDark = useAppSelector(({ theme }) => theme.isDark);

  const highlightUnderlayColor =
    underlayColor ??
    colorWithOpacity(isDark ? Colors.greyShades.shade200 : Colors.greyShades.shade800, 0.25);

  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.button, containerStyle]}
      underlayColor={highlightUnderlayColor}
    >
      <Icon
        family={family}
        name={name}
        style={iconStyle}
      />
    </TouchableHighlight>
  );
};

export default IconButton;
