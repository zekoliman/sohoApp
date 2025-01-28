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

const Header = ({title}: any) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={['#FFA726', '#FB8C00']}
      style={styles.headerContainer}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </LinearGradient>
  );
};

const EnergyTips = () => {
  const data = [
    {
      id: '1',
      title: 'Ampul Değişimi',
      desc: 'Eski ampulleri LED ampullerle değiştirerek %50 enerji tasarrufu.',
      date: '19 Temmuz 2024',
    },
    {
      id: '2',
      title: 'Isı Yalıtımı',
      desc: 'Evinizin ısı yalıtımını artırarak %30 enerji tasarrufu.',
      date: '20 Temmuz 2024',
    },
    {
      id: '3',
      title: 'Enerji Verimli Cihazlar',
      desc: 'Enerji verimli cihazlar kullanarak %20 enerji tasarrufu.',
      date: '21 Temmuz 2024',
    },
  ];

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <EnergySavingItem item={item} index={index} />
  );

  return (
    <View style={styles.container}>
      <Header title="Enerji Tasarrufları" />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const EnergySavingItem = ({item, index}: {item: any; index: number}) => {
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
        styles.savingCard,
        {
          transform: [{translateY: slideAnim}],
          opacity: opacityAnim,
        },
      ]}>
      <View style={styles.savingContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="eco" size={24} color="#FFFFFF" />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FB8C00',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  listContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  savingCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  savingContent: {
    flex: 1,
    padding: 16,
  },
  iconContainer: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FB8C00',
  },
  title: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  desc: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#999999',
  },
});

export default EnergyTips;
