import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SohoText from './SohoText';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';

const SohoCustomTopBar = ({state, descriptors, navigation, title, colors}) => {
  const mainNavigation = useNavigation();

  const handleGoBack = () => {
    mainNavigation.goBack();
  };

  const handleRefresh = () => {};

  const getTabIcon = routeName => {
    switch (routeName) {
      case 'EnergyMonitoring':
        return 'show-chart';
      case 'EnergyComparison':
        return 'compare-arrows';
      case 'CarbonFootprint':
        return 'eco';
      case 'EvStationMonitoring':
        return 'ev-station';
      default:
        return 'error';
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors ? colors : ['#2196F3', '#1976D2']}
        style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.iconButton}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <SohoText style={styles.headerTitle} numberOfLines={1}>
          {title ? title : 'Analytics'}
        </SohoText>
        <TouchableOpacity onPress={handleRefresh} style={styles.iconButton}>
          <Icon name="refresh" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={[styles.tab, isFocused ? styles.tabFocused : {}]}>
              <Icon
                name={getTabIcon(route.name)}
                size={24}
                color={isFocused ? '#267c8d' : '#666'}
                style={styles.tabIcon}
              />
              <SohoText
                style={[styles.tabText, isFocused ? styles.tabTextFocused : {}]}
                numberOfLines={2}
                ellipsizeMode="tail">
                {label}
              </SohoText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: scaledHeight(50),
    paddingBottom: scaledHeight(16),
    paddingHorizontal: scaledWidth(16),
  },
  iconButton: {
    padding: scaledWidth(8),
  },
  headerTitle: {
    fontSize: scaledWidth(18),
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaledHeight(8),
    paddingHorizontal: scaledWidth(4),
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabFocused: {
    borderBottomColor: '#267c8d',
  },
  tabIcon: {
    marginBottom: scaledHeight(4),
  },
  tabText: {
    fontSize: scaledHeight(12),
    color: '#666',
    textAlign: 'center',
    height: scaledHeight(32), // Fixed height for 2 lines
  },
  tabTextFocused: {
    color: '#267c8d',
    fontWeight: '600',
  },
});

export default SohoCustomTopBar;
