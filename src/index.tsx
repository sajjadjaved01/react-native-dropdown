/* eslint-disable react-native/no-inline-styles */
import { MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import DashedLine from 'react-native-dashed-line';
import { RFValue } from 'react-native-responsive-fontsize';

var dropItem: DropdownItem[] = [
  { itemName: 'Pakistan' },
  { selected: false, itemName: 'United States' },
];

const handler = (item: DropdownItem) => {
  console.log('This is callback', item);
};

/**
 * This is a `Dropdown`. Designed to be used with the `DropdownList` component.
 * If you found this component useful, please star it on [Github](https://www.github.com/sajjadjaved01)
 */

function Dropdown({
  title = 'Select',
  clkHandler = handler,
  listItems = dropItem,
  selectedBoxColor = 'green',
  unselectedBoxColor = 'grey',
  multiSelect = false,
  selectedValue = '',
  borderColor = '#E0E0E0',
  showLeadingIcon = false,
  leadingIcon = require('../assets/latin.png'),
}: DropdownProps) {
  const [displayCheck, setDisplayCheck] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem>({
    selected: false,
    itemName: 'Google',
    leadingIcon: leadingIcon,
  });
  const [header, setTitle] = useState(title);

  const touched = useCallback(
    (index: number) => {
      var item = listItems[index];
      setSelectedItem(item);
      setTitle(item.itemName);
      clkHandler(item);
    },
    [clkHandler, listItems]
  );

  const toogleDropDown = () => {
    setDisplayCheck(!displayCheck);
  };

  useEffect(() => {
    if (typeof selectedValue === 'string' && selectedValue !== '') {
      var index = listItems.findIndex(
        (i) => i.itemName.toLowerCase() === selectedValue.toLowerCase()
      );
      if (index !== -1) {
        touched(index);
      }
    } else if (typeof selectedValue === 'number') {
      touched(selectedValue);
    }
  }, [listItems, selectedValue, touched]);

  return (
    <View style={styles.mainCont}>
      <Pressable
        style={{ ...styles.btnDropDown, borderColor: borderColor }}
        onPress={() => toogleDropDown()}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {showLeadingIcon && (
            <Image
              source={selectedItem.leadingIcon}
              style={{
                height: RFValue(30),
                width: RFValue(30),
                marginStart: 5,
              }}
              resizeMode="contain"
            />
          )}
          <Text style={styles.inputDropDown}>{header}</Text>
        </View>
        <MaterialIcons
          style={{ marginRight: 8 }}
          name={!displayCheck ? 'expand-more' : 'expand-less'}
          size={RFValue(30)}
        />
      </Pressable>
      {displayCheck && (
        <View style={styles.innerOptionsCont}>
          <View
            style={{ ...styles.innerOptionsTxt, width: '100%', height: 'auto' }}
          >
            <FlatList
              style={{ flexGrow: 0 }}
              data={listItems}
              ItemSeparatorComponent={() => (
                <DashedLine style={{ marginRight: 10 }} dashColor={''} />
              )}
              keyExtractor={(_t, i) => i.toString()}
              renderItem={(item) => (
                <TouchableOpacity
                  activeOpacity={0.2}
                  onPress={() => {
                    item.item.selected = item.item.selected ? false : true;
                    touched(item.index);
                    if (!multiSelect) {
                      toogleDropDown();
                    }
                    // setchangeTitle(listItems[index])
                  }}
                  key={item.index.toString()}
                  style={{ margin: 10, zIndex: 0 }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={styles.itemText}>{item.item.itemName}</Text>
                    {multiSelect && (
                      <MaterialIcons
                        color={
                          item.item.selected
                            ? selectedBoxColor
                              ? selectedBoxColor
                              : '#B3DBA1'
                            : unselectedBoxColor
                        }
                        name={
                          item.item.selected
                            ? 'check-box'
                            : 'check-box-outline-blank'
                        }
                        size={RFValue(25)}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
}

export class DropdownItem {
  itemName: string = '';
  selected?: boolean = false;
  itemValue?: string = '';
  leadingIcon?: any;
}

interface DropdownProps {
  title?: string;
  /**
   * @default dropItem
   * @type {DropdownItem[]}
   * @description This is the list of items that will be displayed in the dropdown.
   * @example
   * ```
   * const dropItem = [
   *  { selected: false, itemName: "Pakistan" },
   *  { selected: false, itemName: "United States" },
   * ];
   * ```
   */
  listItems?: DropdownItem[];
  borderColor?: string;
  /**
   * This is `callback` function will return selected item.
   */
  clkHandler?: (i: DropdownItem) => void;
  selectedBoxColor?: string;
  unselectedBoxColor?: string;
  multiSelect?: boolean;
  /**
   * This is `selectedValue` for default item selection.
   * You can pass `ItemName` or `index`
   * @type {string | number}
   */
  selectedValue?: string;
  leadingIcon?: any;
  showLeadingIcon?: boolean;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  mainCont: {
    marginVertical: 10,
  },
  btnDropDown: {
    marginTop: 0,
    borderRadius: 5,
    justifyContent: 'space-between',
    borderWidth: 1.5,
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
  inputDropDown: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: 'black',
    fontFamily: 'bold',
    fontSize: RFValue(16),
  },
  innerOptionsCont: {
    display: 'flex',
    position: 'absolute',
    borderWidth: 1,
    zIndex: 99,
    top: 46,
    backgroundColor: 'white',
    borderColor: '#BDBDBD',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    width: '100%',
  },
  innerOptionsTxt: {
    paddingStart: 10,
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: 4,
  },
  itemText: {
    fontSize: RFValue(16),
    color: '#828282',
    fontFamily: 'medium',
    width: '75%',
  },
});

export default Dropdown;
