import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import SohoText from '@/components/SohoText';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const ProfileDetailScreen = () => {
  const navigation = useNavigation();

  const profileData = {
    name: 'Ali SELEK',
    company: 'N/A',
    sector: 'N/A',
    city: 'N/A',
    website: 'test2@gmail.com',
    email: 'test2@gmail.com',
    createdAt: '2024-08-01T11:58:47.611Z',
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderProfileItem = (icon, label, value) => (
    <View style={styles.profileItem}>
      <MaterialIcons
        name={icon}
        size={24}
        color="#267c8d"
        style={styles.icon}
      />
      <View style={styles.profileItemContent}>
        <SohoText style={styles.label}>{label}</SohoText>
        <SohoText style={styles.value}>{value || 'N/A'}</SohoText>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <LinearGradient colors={['#141E30', '#243B55']} style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <SohoText style={styles.headerTitle}>Profil Bilgileri</SohoText>
          <TouchableOpacity style={styles.editButton}>
            <MaterialIcons name="edit" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="person" size={60} color="#267c8d" />
          </View>
          <SohoText style={styles.name}>{profileData.name}</SohoText>
          <SohoText style={styles.email}>{profileData.email}</SohoText>
        </View>

        <View style={styles.infoContainer}>
          {renderProfileItem('business', 'Şirket İsmi', profileData.company)}
          {renderProfileItem('category', 'Sektör', profileData.sector)}
          {renderProfileItem('location-city', 'Şehir', profileData.city)}
          {renderProfileItem('language', 'Website', profileData.website)}
          {renderProfileItem('email', 'Email', profileData.email)}
          {renderProfileItem(
            'event',
            'Oluşturulma Tarihi',
            formatDate(profileData.createdAt),
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: scaledHeight(60),
    paddingBottom: scaledHeight(16),
    paddingHorizontal: scaledWidth(16),
    backgroundColor: '#267c8d',
    borderBottomLeftRadius: scaledWidth(20),
    borderBottomRightRadius: scaledWidth(20),
    elevation: 5,
  },
  backButton: {
    marginRight: scaledWidth(16),
  },
  headerTitle: {
    fontSize: scaledHeight(20),
    color: '#FFFFFF',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  editButton: {
    marginLeft: scaledWidth(16),
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: scaledHeight(20),
  },
  avatarContainer: {
    width: scaledWidth(100),
    height: scaledWidth(100),
    borderRadius: scaledWidth(50),
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaledHeight(10),
    borderWidth: 2,
    borderColor: '#267c8d',
  },
  name: {
    fontSize: scaledHeight(22),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: scaledHeight(5),
  },
  email: {
    fontSize: scaledHeight(16),
    color: '#666',
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: scaledHeight(15),
    margin: scaledWidth(20),
    padding: scaledWidth(15),
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaledHeight(15),
  },
  icon: {
    marginRight: scaledWidth(15),
  },
  profileItemContent: {
    flex: 1,
  },
  label: {
    fontSize: scaledHeight(14),
    color: '#666',
    marginBottom: scaledHeight(2),
  },
  value: {
    fontSize: scaledHeight(16),
    color: '#333',
    fontWeight: '500',
  },
});

export default ProfileDetailScreen;
