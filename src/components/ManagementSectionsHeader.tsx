import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import React from 'react';
import Fonts from '@/theme/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import SohoText from './SohoText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';

type ManagementSectionsHeaderTypes = {
  headerTitle: string;
  backgroundColor: [string, string];
  iconName: string;
  iconColor: string;
  iconBackgroundColor: string;
  onPress: () => void;
};

const ManagementSectionsHeader = ({
  headerTitle,
  backgroundColor,
  iconName,
  iconColor,
  iconBackgroundColor,
  onPress,
}: ManagementSectionsHeaderTypes) => {
  return (
    <LinearGradient colors={backgroundColor} style={styles.header}>
      <SohoText fontFamily={Fonts.Bold} style={styles.headerTitle}>
        {headerTitle}
      </SohoText>
      <TouchableOpacity
        style={[
          styles.addButton,
          {
            backgroundColor: iconBackgroundColor,
          },
        ]}
        onPress={onPress}>
        <Icon name={iconName} size={24} color={iconColor} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ManagementSectionsHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaledWidth(20),
    paddingVertical: scaledHeight(15),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: scaledWidth(24),
    color: 'white',
  },
  addButton: {
    borderRadius: scaledWidth(40),
    padding: scaledWidth(10),
  },
});
