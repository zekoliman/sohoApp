import {StyleSheet, View} from 'react-native';
import React from 'react';
import Fonts from '@/theme/Fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SohoText from './SohoText';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import {TouchableOpacity} from 'react-native-gesture-handler';

type ListEmptyComponentTypes = {
  descriptionText: string;
  buttonText: string;
  iconName: string;
  color: string;
  onPress: () => void;
};
const ListEmptyManagementSection = ({
  descriptionText,
  buttonText,
  iconName,
  color,
  onPress,
}: ListEmptyComponentTypes) => {
  return (
    <View style={styles.emptyStateContainer}>
      <Icon name={iconName} size={80} color={color} />
      <SohoText style={styles.emptyStateText}>{descriptionText}</SohoText>
      <TouchableOpacity
        style={[
          styles.addFirstBranchButton,
          {
            backgroundColor: color,
          },
        ]}
        onPress={onPress}>
        <SohoText
          fontFamily={Fonts.Semibold}
          style={styles.addFirstBranchButtonText}>
          {buttonText}
        </SohoText>
      </TouchableOpacity>
    </View>
  );
};

export default ListEmptyManagementSection;

const styles = StyleSheet.create({
  emptyStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaledWidth(30),
  },
  emptyStateText: {
    fontSize: scaledWidth(18),
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: scaledHeight(20),
    marginBottom: scaledHeight(30),
  },
  addFirstBranchButton: {
    borderRadius: scaledWidth(25),
    paddingVertical: scaledHeight(15),
    paddingHorizontal: scaledWidth(30),
  },
  addFirstBranchButtonText: {
    color: '#FFFFFF',
    fontSize: scaledWidth(16),
  },
});
