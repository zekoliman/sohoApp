import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SohoText from '@/components/SohoText';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import Fonts from '@/theme/Fonts';

const DraggableCard = ({item, onPress, drag, isActive}) => {
  return (
    <TouchableOpacity
      onLongPress={drag}
      onPress={onPress}
      style={[styles.sectionContainer, isActive && styles.activeItem]}>
      <LinearGradient colors={item.colors} style={styles.sectionGradient}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Icon name={item.icon} size={40} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <SohoText style={styles.title}>{item.title}</SohoText>
            <SohoText style={styles.subtitle}>{item.subtitle}</SohoText>
          </View>
          <Icon name="chevron-right" size={30} color="#fff" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginHorizontal: scaledWidth(16),
    marginVertical: scaledHeight(8),
  },
  activeItem: {
    opacity: 0.7,
    elevation: 10,
  },
  sectionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaledHeight(16),
    borderRadius: scaledHeight(12),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: scaledHeight(30),
    padding: scaledHeight(10),
  },
  textContainer: {
    flex: 1,
    marginLeft: scaledWidth(16),
  },
  title: {
    color: '#fff',
    fontSize: scaledHeight(18),
    fontFamily: Fonts.Semibold,
  },
  subtitle: {
    color: '#fff',
    fontSize: scaledHeight(14),
    fontFamily: Fonts.Regular,
    marginTop: scaledHeight(4),
  },
});

export default DraggableCard;
