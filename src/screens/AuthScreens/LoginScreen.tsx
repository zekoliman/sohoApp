import React from 'react';
import {
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFormik} from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import {setHeadersBearerCustomAxios} from '@/services/customAxios';
import {loginAuth} from '@/services/api/auth';
const GOOGLE_MAPS_API_KEY = 'AIzaSyCQRZ69FlpWWo_WXYd5G862l19ZJcLlfsY';

const LoginScreen: React.FC = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const LoginFormDefaultValues = {
    email: '',
    password: '',
  };

  const checkUserForm = async (values: typeof LoginFormDefaultValues) => {
    return navigation.navigate('LoggedUserNavigationWrapper');
    const response = await loginAuth({
      email: 'test@gmail.com',
      password: '123456789',
    });
    if (response?.token) {
      await setHeadersBearerCustomAxios(response.token);
      Toast.show({
        type: 'success',
        text1: 'Giriş Başarılı',
        text2: 'Yönlendiriliyorsunuz 👋',
        position: 'top',
      });
      await AsyncStorage.setItem(
        'user_session',
        JSON.stringify({token: response.token}),
      );
      return navigation.navigate('LoggedUserNavigationWrapper');
    }
    Toast.show({
      type: 'error',
      text1: 'Giriş Başarısız',
      text2: 'Tekrar deneyin',
      position: 'top',
    });
  };

  const loginUserForm = useFormik({
    initialValues: LoginFormDefaultValues,
    onSubmit: values => checkUserForm(values),
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email('Geçerli bir e-posta girin.')
        .required('E-posta alanı boş olamaz.'),
      password: yup.string().required('Şifre alanı boş olamaz.'),
    }),
  });

  return (
    <LinearGradient colors={['#141E30', '#243B55']} style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={styles.header}>
        <Image
          source={require('@/assets/images/home.jpg')}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>Hoşgeldiniz</Text>
        <Text style={styles.subtitle}>Hesabınıza giriş yapın</Text>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={loginUserForm.handleChange('email')}
            onBlur={loginUserForm.handleBlur('email')}
            value={loginUserForm.values.email}
            keyboardType="email-address"
            placeholder="E-posta adresinizi girin"
            placeholderTextColor="#C0C0C0"
            style={styles.textInput}
          />
          {loginUserForm.touched.email && loginUserForm.errors.email && (
            <Text style={styles.errorText}>{loginUserForm.errors.email}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry
            onChangeText={loginUserForm.handleChange('password')}
            onBlur={loginUserForm.handleBlur('password')}
            value={loginUserForm.values.password}
            placeholder="Şifrenizi girin"
            placeholderTextColor="#C0C0C0"
            style={styles.textInput}
          />
          {loginUserForm.touched.password && loginUserForm.errors.password && (
            <Text style={styles.errorText}>
              {loginUserForm.errors.password}
            </Text>
          )}
        </View>

        <TouchableOpacity
          onPress={() => checkUserForm('test', 'f')}
          style={styles.loginButton}
          activeOpacity={0.8}>
          <LinearGradient
            colors={['#1E3C72', '#2A5298']}
            style={styles.loginButtonGradient}>
            <Text style={styles.loginButtonText}>Giriş Yap</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Hesabınız yok mu?{' '}
            <Text style={styles.registerLinkText}>Kayıt Olun</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by Enerwise</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 48,
  },
  headerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 24,
  },
  subtitle: {
    fontSize: 18,
    color: '#C0C0C0',
    marginTop: 8,
    textAlign: 'center',
  },
  formContainer: {
    marginTop: 24,
  },
  inputContainer: {
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textInput: {
    fontSize: 16,
    color: '#fff',
  },
  errorText: {
    fontSize: 12,
    color: '#d9534f',
    marginTop: 8,
  },
  loginButton: {
    marginTop: 16,
  },
  loginButtonGradient: {
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  registerContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#C0C0C0',
  },
  registerLinkText: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  footerText: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default LoginScreen;
