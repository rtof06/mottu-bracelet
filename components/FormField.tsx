import { View, TextInput, Text, TextInputProps } from 'react-native';
import { useTheme } from '../theme';

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

export default function FormField({ label, error, style, ...rest }: Props) {
  const { colors, spacing, radii, typography, borderWidth = 1 as number } = useTheme() as any;

  return (
    <View style={{ marginBottom: spacing.md }}>
      {label ? (
        <Text style={{ marginBottom: spacing.xs, color: colors.muted, fontSize: typography.body }}>
          {label}
        </Text>
      ) : null}
      <TextInput
        placeholderTextColor={colors.muted}
        style={[
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderWidth,
            borderColor: error ? '#ef4444' : colors.border,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            borderRadius: radii.md,
            fontSize: typography.body,
          },
          style,
        ]}
        {...rest}
      />
      {error ? (
        <Text style={{ marginTop: spacing.xs, color: '#ef4444', fontSize: typography.body }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}