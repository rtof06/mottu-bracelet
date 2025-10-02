import React, { useMemo } from 'react';
import { View, Text, Switch } from 'react-native';
import { useTheme } from '../theme';
import { styles } from '../styles';

export default function SettingsScreen() {
  const { colors, spacing, typography, scheme, setScheme } = useTheme() as any;

  const isDark = useMemo(() => scheme === 'dark', [scheme]);

  const onToggle = (value: boolean) => {
    setScheme(value ? 'dark' : 'light');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '800', marginBottom: spacing.xl }}>
        Configurações
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 1, paddingRight: spacing.lg }}>
          <Text style={{ color: colors.text, fontSize: typography.h3, fontWeight: '700' }}>
            Tema escuro
          </Text>
          <Text style={{ color: colors.muted, marginTop: spacing.xs }}>
            Altere o tema do aplicativo entre claro e escuro.
          </Text>
        </View>

        <Switch value={isDark} onValueChange={onToggle} />
      </View>
    </View>
  );
}
