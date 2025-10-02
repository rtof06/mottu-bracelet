import React from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function HeaderGearButton() {
  const { colors, spacing, typography } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <Pressable
      onPress={() => navigation.navigate('Settings')}
      hitSlop={12}
      style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}
      accessibilityRole="button"
      accessibilityLabel="Abrir configurações"
    >
      <Text style={{ color: colors.text, fontSize: typography.h3 }}>⚙️</Text>
    </Pressable>
  );
}
