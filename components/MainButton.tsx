// src/components/PrimaryButton.tsx
import React from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from '../theme';

type Props = {
  label: string;
  onPress: () => void;
  accessibilityLabel?: string;
};

export default function Button({ label, onPress, accessibilityLabel }: Props) {
  const { colors, spacing, radii, typography } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      style={({ pressed }) => ({
        backgroundColor: pressed ? colors.primaryAlt : colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: radii.lg,
      })}
    >
      <Text style={{ color: colors.onPrimary, textAlign: 'center', fontSize: typography.button, fontWeight: '700' }}>
        {label}
      </Text>
    </Pressable>
  );
}
