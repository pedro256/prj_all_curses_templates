import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  style,
  textStyle
}: ButtonProps) {
  const getButtonStyle = () => {
    if (disabled) return [styles.button, styles.disabled, style];
    
    switch (variant) {
      case 'primary':
        return [styles.button, styles.primaryButton, style];
      case 'secondary':
        return [styles.button, styles.secondaryButton, style];
      case 'outline':
        return [styles.button, styles.outlineButton, style];
      default:
        return [styles.button, styles.primaryButton, style];
    }
  };
  
  const getTextStyle = () => {
    if (disabled) return [styles.buttonText, styles.disabledText, textStyle];
    
    switch (variant) {
      case 'primary':
        return [styles.buttonText, styles.primaryText, textStyle];
      case 'secondary':
        return [styles.buttonText, styles.secondaryText, textStyle];
      case 'outline':
        return [styles.buttonText, styles.outlineText, textStyle];
      default:
        return [styles.buttonText, styles.primaryText, textStyle];
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? '#3E64FF' : '#FFFFFF'} 
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  primaryButton: {
    backgroundColor: '#3E64FF',
  },
  secondaryButton: {
    backgroundColor: '#5A31F4',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3E64FF',
  },
  disabled: {
    backgroundColor: '#E1E1E1',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#3E64FF',
  },
  disabledText: {
    color: '#A0A0A0',
  },
});