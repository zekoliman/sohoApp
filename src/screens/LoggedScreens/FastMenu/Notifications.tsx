import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import SohoText from '@/components/SohoText';

const Header = ({title}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const openList = () => {
    //bottomSheetRef.current?.expand();
  };

  return (
    <LinearGradient
      colors={['#FFB74D', '#FF6F61']}
      style={styles.headerContainer}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <SohoText style={styles.headerTitle}>{title}</SohoText>
      <TouchableOpacity onPress={openList} style={styles.listButton}>
        <Icon name="refresh" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const Notifications = () => {
  const data = [
    {
      id: '1',
      title: 'Önemli Duyuru',
      desc: 'Önemli duyuru açıklaması Önemli duyuru açıklaması Önemli duyuru açıklaması',
      date: '19 Temmuz 2024',
    },
    {
      id: '1',
      title: 'Önemli Duyuru',
      desc: 'Önemli duyuru açıklaması Önemli duyuru açıklaması Önemli duyuru açıklaması',
      date: '19 Temmuz 2024',
    },
    {
      id: '1',
      title: 'Önemli Duyuru',
      desc: 'Önemli duyuru açıklaması Önemli duyuru açıklaması Önemli duyuru açıklaması',
      date: '19 Temmuz 2024',
    },
    {
      id: '1',
      title: 'Önemli Duyuru',
      desc: 'Önemli duyuru açıklaması Önemli duyuru açıklaması Önemli duyuru açıklaması',
      date: '19 Temmuz 2024',
    },
    {
      id: '1',
      title: 'Önemli Duyuru',
      desc: 'Önemli duyuru açıklaması Önemli duyuru açıklaması Önemli duyuru açıklaması',
      date: '19 Temmuz 2024',
    },
    {
      id: '1',
      title: 'Önemli Duyuru',
      desc: 'Önemli duyuru açıklaması Önemli duyuru açıklaması Önemli duyuru açıklaması',
      date: '19 Temmuz 2024',
    },
    {
      id: '1',
      title: 'Önemli Duyuru',
      desc: 'Önemli duyuru açıklaması Önemli duyuru açıklaması Önemli duyuru açıklaması',
      date: '19 Temmuz 2024',
    },
    {
      id: '1',
      title: 'Önemli Duyuru',
      desc: 'Önemli duyuru açıklaması Önemli duyuru açıklaması Önemli duyuru açıklaması',
      date: '19 Temmuz 2024',
    },
  ];

  const renderItem = ({item, index}) => (
    <NotificationItem item={item} index={index} />
  );

  return (
    <View style={styles.container}>
      <Header title="Bildirimler" />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => Math.random() + item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const NotificationItem = ({item, index}) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      delay: index * 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, [slideAnim, opacityAnim, index]);

  return (
    <Animated.View
      style={[
        styles.notificationCard,
        {
          transform: [{translateY: slideAnim}],
          opacity: opacityAnim,
        },
      ]}>
      <View style={styles.notificationContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="notifications" size={24} color="#FFFFFF" />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  headerContainer: {
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scaledHeight(60),
    paddingBottom: scaledHeight(16),
    paddingHorizontal: scaledWidth(16),
    backgroundColor: '#267c8d',
  },
  backButton: {
    marginRight: scaledWidth(16),
  },
  headerTitle: {
    fontSize: scaledWidth(20),
    color: '#FFFFFF',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  listButton: {
    marginLeft: scaledWidth(16),
  },
  listContent: {
    paddingVertical: scaledHeight(16),
    paddingHorizontal: scaledWidth(16),
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: scaledWidth(16),
    marginBottom: scaledHeight(16),
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notificationContent: {
    flex: 1,
    padding: scaledWidth(16),
  },
  iconContainer: {
    width: scaledWidth(60),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6F61',
  },
  title: {
    fontSize: scaledWidth(16),
    color: '#333333',
    fontWeight: 'bold',
    marginBottom: scaledHeight(4),
  },
  desc: {
    fontSize: scaledWidth(14),
    color: '#666666',
    marginBottom: scaledHeight(8),
  },
  date: {
    fontSize: scaledWidth(12),
    color: '#999999',
  },
});

export default Notifications;
