import React, {forwardRef} from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import Colors from '@/theme/Colors';
import SohoText from './SohoText';

type AutoCapitalizeTypes =
  | 'none'
  | 'sentences'
  | 'words'
  | 'characters'
  | undefined;

type SohoTextInputTypes = {
  autoFocus?: boolean;
  onChangeText: TextInputProps;
  onBlur?: TextInputProps;
  title?: string;
  editable?: boolean;
  disabledControllerSpecialCharacters?: boolean;
  justLetterCharacters?: boolean;
  justNumberCharacters?: boolean;
  multiline?: boolean;
  autoCorrect?: boolean;
  autoCapitalize?: AutoCapitalizeTypes;
  isSecureText?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  placeholderTextColor?: string;
  textContentType?: string;
  maxLength?: number;
  backgroundColor?: string;
  errorText?: string | false | null | undefined;
  isShowErrorBorder?: boolean;
  isNotShowErrorBorder?: boolean;
  textInputContainerStyle?: TextStyle;
  containerStyles?: ViewStyle;
  inputContainerStyles?: ViewStyle;
  leftComponent?: React.ReactNode | React.ReactNode[] | undefined;
  rightComponent?: React.ReactNode | React.ReactNode[] | undefined;
  hiddenTitle?: boolean;
  isSearchInput?: boolean;
} & TextInputProps;

const SohoTextInput = forwardRef((props: SohoTextInputTypes, ref: any) => {
  const {
    autoFocus = false,
    onBlur,
    title,
    multiline = false,
    editable = true,
    autoCapitalize = 'sentences',
    autoCorrect = false,
    isSecureText,
    keyboardType = 'default',
    placeholder,
    placeholderTextColor = Colors.placeholderTextColor,
    textContentType = 'none',
    maxLength,
    textInputContainerStyle,
    errorText,
    isShowErrorBorder,
    isNotShowErrorBorder = false,
    backgroundColor = Colors.background,
    inputContainerStyles,
    containerStyles,
    leftComponent,
    rightComponent,
    hiddenTitle = false,
    isSearchInput,
  } = props;
  return (
    <View style={containerStyles}>
      {!hiddenTitle && <SohoText style={styles.title}>{title}</SohoText>}
      <View
        style={[
          styles.inputContainer,
          !isSearchInput
            ? {
                backgroundColor,
                borderColor:
                  !isNotShowErrorBorder && (errorText || isShowErrorBorder)
                    ? 'red'
                    : 'black',
              }
            : {backgroundColor, borderWidth: 1, borderColor: Colors.gray3},
          inputContainerStyles,
        ]}>
        <View style={styles.leftComponentView}>
          {leftComponent && <View style={styles.center}>{leftComponent}</View>}
          <TextInput
            {...props}
            autoFocus={autoFocus}
            allowFontScaling={false}
            onBlur={onBlur}
            multiline={multiline}
            editable={editable}
            textContentType={textContentType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            secureTextEntry={isSecureText}
            keyboardType={keyboardType || 'default'}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            style={[
              styles.inputText,
              textInputContainerStyle,
              {
                marginHorizontal: scaledWidth(leftComponent ? 20 : 10),
                paddingBottom: scaledHeight(11),
                paddingTop: scaledHeight(11),
              },
            ]}
            ref={ref}
          />
        </View>
        {rightComponent && <View style={styles.center}>{rightComponent}</View>}
      </View>
      {errorText && <SohoText style={styles.errorText}>{errorText}</SohoText>}
    </View>
  );
});
export default SohoTextInput;
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: scaledWidth(15),
    borderRadius: scaledWidth(12),
    borderWidth: 1,
  },
  inputText: {
    flex: 1,
    color: Colors.black,
    fontSize: scaledWidth(18),
  },
  leftComponentView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: scaledWidth(14),
    color: Colors.black,
  },
  errorText: {
    color: 'red',
    fontSize: scaledWidth(14),
    marginTop: scaledHeight(5),
    alignSelf: 'flex-end',
  },
  center: {
    justifyContent: 'center',
  },
});
