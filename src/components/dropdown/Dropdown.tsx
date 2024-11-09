import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Icon from '../icon';
import SettingsContext from '@config/SettingsContext';
import { IconFamily } from '@constants';
import ThemedStyles from './styles';

const Dropdown = ({
  data,
  value,
  onSelectIndex,
  placeholder,
  shouldScroll,
  dropdownStyle,
  style,
}: DropdownProps) => {
  const { theme } = useContext(SettingsContext);

  const styles = ThemedStyles(theme);

  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const touchEvent = DeviceEventEmitter.addListener('touch', () => {
      setIsFocus(false);
    });

    return () => {
      touchEvent.remove();
    };
  }, []);

  const handleSelect = (index: number, value: DropdownItem) => {
    setIsFocus(false);
    onSelectIndex?.(index, value.id);
  };

  return (
    <View>
      <TouchableWithoutFeedback
        style={style}
        onPress={() => setIsFocus(!isFocus)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      >
        <View style={[styles.dropdown, isFocus ? styles.focusDd : undefined]}>
          <Text style={[styles.ddValue, !value ? styles.placeholder : null]}>
            {value ? value.label : placeholder}
          </Text>
          <Icon
            family={IconFamily.Entypo}
            style={{ color: isFocus ? theme.primaryTextColor : theme.textColor }}
            name="chevron-small-down"
          />
        </View>
      </TouchableWithoutFeedback>
      {isFocus ? (
        <ScrollView
          style={[styles.dropdownList, dropdownStyle]}
          scrollEnabled={shouldScroll ?? false}
          showsVerticalScrollIndicator={false}
        >
          {data.map((item: DropdownItem, index: number) => (
            <TouchableOpacity
              key={item.id + index}
              style={styles.data}
              onPress={() => handleSelect(index, item)}
            >
              <Text style={styles.dataText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : undefined}
    </View>
  );
};

export default Dropdown;
