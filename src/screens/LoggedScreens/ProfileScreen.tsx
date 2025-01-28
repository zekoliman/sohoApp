import React, {useRef, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import SohoText from '@/components/SohoText';
import Fonts from '@/theme/Fonts';
import {useTranslation} from 'react-i18next';

const ProfilePage = ({navigation}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationPermission, setLocationPermission] = useState(false);
  const bottomSheetRef = useRef(null);
  const snapPoints = ['30%'];
  const {t, i18n} = useTranslation();

  const handleLogout = () => {
    bottomSheetRef.current?.expand();
  };

  const handleConfirmLogout = () => {
    bottomSheetRef.current?.close();
  };

  const handleCancelLogout = () => {
    bottomSheetRef.current?.close();
  };

  const changeLanguage = lang => {
    i18n.changeLanguage(lang);
  };

  const MenuOption = ({
    icon,
    title,
    onPress,
    hasToggle,
    toggleValue,
    onToggle,
  }) => (
    <TouchableOpacity
      style={styles.menuOption}
      activeOpacity={0.75}
      onPress={onPress}>
      <LinearGradient
        colors={['#5d7bd5', '#56d1dc']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.menuOptionGradient}>
        <Icon name={icon} size={24} color="#fff" />
        <SohoText style={styles.menuOptionText}>{title}</SohoText>
        {hasToggle && (
          <Switch
            value={toggleValue}
            onValueChange={onToggle}
            trackColor={{false: '#767577', true: '#93c9cc'}}
            thumbColor={toggleValue ? '#fff' : '#f4f3f4'}
          />
        )}
        {!hasToggle && <Icon name="chevron-right" size={24} color="#fff" />}
      </LinearGradient>
    </TouchableOpacity>
  );

  const SectionHeader = ({title}) => (
    <LinearGradient
      colors={['#5C6BC0', '#3F51B5']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.sectionHeader}>
      <SohoText style={styles.sectionHeaderText}>{title}</SohoText>
    </LinearGradient>
  );

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView style={styles.container}>
        <LinearGradient colors={['#2196F3', '#1976D2']} style={styles.header}>
          <SohoText style={styles.username}>Ali SELEK</SohoText>
        </LinearGradient>

        <View style={styles.menuContainer}>
          <SectionHeader title="Genel Ayarlar" />
          <MenuOption
            icon="notifications"
            title="Bildirim Ayarları"
            hasToggle
            toggleValue={notificationsEnabled}
            onToggle={() => setNotificationsEnabled(!notificationsEnabled)}
          />
          <MenuOption
            icon="location-on"
            title="Konum İzni"
            hasToggle
            toggleValue={locationPermission}
            onToggle={() => setLocationPermission(!locationPermission)}
          />
          <MenuOption
            icon="language"
            title="Dil Değiştir"
            onPress={() =>
              navigation.navigate('LanguageSelectionScreen', 'ProfilePage')
            }
          />

          <SectionHeader title="Hesap Yönetimi" />
          <MenuOption
            icon="business"
            title="Şube Yönetimi"
            onPress={() => {}}
          />

          <MenuOption
            icon="security"
            title="Gizlilik Ayarları"
            onPress={() => {}}
          />
          <MenuOption
            icon="person"
            title="Hesap Bilgileri"
            onPress={() => navigation.navigate('ProfileDetailScreen')}
          />

          <SectionHeader title="Destek" />
          <MenuOption icon="help" title="Yardım ve Destek" onPress={() => {}} />
          <MenuOption icon="logout" title="Çıkış Yap" onPress={handleLogout} />
        </View>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backgroundStyle={{backgroundColor: '#fff'}}
        handleIndicatorStyle={{backgroundColor: '#ccc'}}>
        <BottomSheetView style={styles.bottomSheetContent}>
          <SohoText style={styles.bottomSheetTitle}>
            Çıkış Yapmak İstediğinize Emin Misiniz?
          </SohoText>
          <View style={styles.bottomSheetButtonContainer}>
            <TouchableOpacity
              style={styles.bottomSheetButton}
              onPress={handleCancelLogout}>
              <SohoText style={styles.bottomSheetButtonText}>İptal</SohoText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.bottomSheetButton,
                styles.bottomSheetButtonConfirm,
              ]}
              onPress={handleConfirmLogout}>
              <SohoText
                style={[
                  styles.bottomSheetButtonText,
                  styles.bottomSheetButtonTextConfirm,
                ]}>
                Evet, Çıkış Yap
              </SohoText>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: scaledHeight(120),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: scaledWidth(120),
    height: scaledWidth(120),
    borderRadius: scaledWidth(60),
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaledHeight(10),
  },
  username: {
    fontSize: scaledHeight(24),
    fontWeight: 'bold',
    color: '#fff',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: scaledHeight(20),
    borderTopRightRadius: scaledHeight(20),
    marginTop: -scaledHeight(20),
    paddingTop: scaledHeight(20),
    paddingHorizontal: scaledWidth(16),
  },
  sectionHeader: {
    paddingVertical: scaledHeight(10),
    paddingHorizontal: scaledWidth(20),
    borderRadius: scaledHeight(10),
    marginTop: scaledHeight(20),
    marginBottom: scaledHeight(10),
  },
  sectionHeaderText: {
    color: '#fff',
    fontSize: scaledHeight(18),
    fontFamily: Fonts.Bold,
  },
  menuOption: {
    marginBottom: scaledHeight(10),
  },
  menuOptionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaledHeight(15),
    paddingHorizontal: scaledWidth(20),
    borderRadius: scaledHeight(10),
  },
  menuOptionText: {
    fontSize: scaledHeight(16),
    marginLeft: scaledWidth(15),
    flex: 1,
    color: '#fff',
    fontFamily: Fonts.Regular,
  },
  bottomSheetContent: {
    padding: scaledHeight(20),
    alignItems: 'center',
  },
  bottomSheetTitle: {
    fontSize: scaledHeight(18),
    fontWeight: 'bold',
    marginBottom: scaledHeight(20),
    textAlign: 'center',
  },
  bottomSheetButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  bottomSheetButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: scaledHeight(12),
    borderRadius: scaledHeight(8),
    marginHorizontal: scaledWidth(8),
    alignItems: 'center',
  },
  bottomSheetButtonConfirm: {
    backgroundColor: '#FF4C4C',
  },
  bottomSheetButtonText: {
    color: '#333',
    fontSize: scaledHeight(16),
    fontFamily: Fonts.Regular,
  },
  bottomSheetButtonTextConfirm: {
    color: '#fff',
  },
});

export default ProfilePage;
