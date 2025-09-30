import { View, Text } from 'react-native';
import MainButton from './MainButton';
import { useTheme } from '../theme';

type Props = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function Header({ title, subtitle, actionLabel, onAction }: Props) {
  const { colors, spacing, typography } = useTheme();
  return (
    <View style={{ paddingHorizontal: spacing.md, paddingTop: spacing.lg, paddingBottom: spacing.md }}>
      <Text style={{ color: colors.text, fontSize: typography.h1, fontWeight: '700' }}>{title}</Text>
      {!!subtitle && (
        <Text style={{ color: colors.muted, marginTop: spacing.xs, fontSize: typography.body }}>
          {subtitle}
        </Text>
      )}
      {!!actionLabel && onAction && (
        <View style={{ marginTop: spacing.md, alignSelf: 'flex-start' }}>
          <MainButton label={actionLabel} onPress={onAction} />
        </View>
      )}
    </View>
  );
}
