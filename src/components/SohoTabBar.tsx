import React, {useCallback, useRef, useState} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {map} from 'lodash';
import Colors from '@/theme/Colors';
import {scaledHeight} from '@/theme/Responsive';
import AddPlaceIcon from '@/assets/icons/AddPlace.svg';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheet from '@gorhom/bottom-sheet';
import ManagementSections from './BottomSheets/ManagementSections';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type RenderIconTypes = {
  isFocused: boolean;
  title: string;
};

type TabScreensInfoTypes = {
  [screenName: string]: {
    key: string;
    title: string;
  };
};

const TabScreensInfo: TabScreensInfoTypes = {
  HomeScreen: {
    key: 'HomeScreen',
    title: 'HomeScreen',
  },
  EnergyScreen: {
    key: 'EnergyScreen',
    title: 'EnergyScreen',
  },
  AnalyticsScreen: {
    key: 'AnalyticsScreen',
    title: 'AnalyticsScreen',
  },
  ProfileScreen: {
    key: 'ProfileScreen',
    title: 'ProfileScreen',
  },
  AddMyPlaceScreen: {
    key: 'AddMyPlaceScreen',
    title: 'AddMyPlaceScreen',
  },
};

const RenderIcon = ({isFocused, title}: RenderIconTypes) => {
  const iconColor = isFocused
    ? Colors.bottomTabActiveColor
    : Colors.bottomTabInActiveColor;

  let iconName = '';

  switch (title) {
    case TabScreensInfo.HomeScreen.key:
      iconName = 'home';
      break;
    case TabScreensInfo.EnergyScreen.key:
      iconName = 'bolt';
      break;
    case TabScreensInfo.AnalyticsScreen.key:
      iconName = 'analytics';
      break;
    case TabScreensInfo.ProfileScreen.key:
      iconName = 'person';
      break;
    default:
      iconName = 'error';
  }

  return (
    <View
      style={{
        backgroundColor: isFocused ? '#1976D2' : 'white',
        padding: scaledHeight(10),
        borderRadius: 12,
      }}>
      <MaterialIcons
        name={iconName}
        size={24}
        color={isFocused ? iconColor : '#1976D2'}
      />
    </View>
  );
};
const snapOrderPoints = [1, '%30', '95%'];

const SohoTabBar = ({state, navigation}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const [expandManagementBottomSheet, setExpandManagementBottomSheet] =
    useState<boolean>(false);
  const managementSectionsRef = useRef<BottomSheet>(null);

  const changeManagementSectionsStatus = useCallback(() => {
    if (expandManagementBottomSheet) {
      managementSectionsRef.current?.close();
    } else {
      managementSectionsRef.current?.expand();
    }
    setExpandManagementBottomSheet(prev => !prev);
  }, [expandManagementBottomSheet]);

  return (
    <>
      <ManagementSections ref={managementSectionsRef} />
      {/* <BottomSheet
        snapPoints={snapOrderPoints}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}>
        <BottomSheetView style={{height: '100%', backgroundColor: 'red'}}>
          <MyPlaces />
        </BottomSheetView>
      </BottomSheet> */}
      <View style={[styles.container, {bottom: insets.bottom + 20}]}>
        <TouchableOpacity
          onPress={changeManagementSectionsStatus}
          style={{
            position: 'absolute',
            zIndex: 9999,
            alignContent: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: Dimensions.get('screen').width,
            bottom: insets.bottom + scaledHeight(60),
          }}>
          <LinearGradient
            colors={['#2196F3', '#1976D2']}
            style={{
              backgroundColor: '#1976D2',
              padding: scaledHeight(12),
              borderWidth: 1,
              borderRadius: 100,
              borderColor: '#93c9cc',
            }}>
            <AddPlaceIcon color={'white'} />
          </LinearGradient>
        </TouchableOpacity>

        {map(state.routes, (route, index) => {
          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              key={`key_${index}`}
              style={styles.contentView}
              activeOpacity={0.75}
              onPress={() => navigation.navigate(route.name)}>
              <RenderIcon isFocused={isFocused} title={route.name} />
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};
export default SohoTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#93c9cc',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'absolute',
  },
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scaledHeight(22),
  },
});
