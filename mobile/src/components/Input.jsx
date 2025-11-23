import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

export const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  showPasswordIcon,
  onTogglePassword,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          secureTextEntry={secureTextEntry === true}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          style={[styles.input, showPasswordIcon && styles.inputWithIcon]}
        />
        {showPasswordIcon && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={onTogglePassword}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={secureTextEntry ? 'visibility' : 'visibility-off'}
              size={20}
              color={colors.textLight}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    minHeight: 48,
  },
  inputWithIcon: {
    paddingRight: 48,
  },
  iconContainer: {
    position: 'absolute',
    right: 12,
    top: 14,
    padding: 4,
  },
});
