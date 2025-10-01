import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../theme';
import { Moto } from '../types';

type Props = {
  moto: Moto;
};

const statusLabel: Record<Moto['status'], string> = {
  EM_MANUTENCAO: 'Em manutenção',
  AGUARDANDO_PECA: 'Aguardando peça',
  PRONTA: 'Pronta',
};

export default function MotoCard({ moto }: Props) {
  const { colors, spacing, radii, typography, elevation } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: radii.lg,
        padding: spacing.md,
        ...elevation.sm,
      }}
    >
      <Text style={{ color: colors.text, fontSize: typography.h3, fontWeight: '600' }}>
        {moto.plate} • {moto.model}
      </Text>
      <Text style={{ color: colors.muted, marginTop: spacing.xs }}>
        Status: {statusLabel[moto.status]}
      </Text>
      <Text style={{ color: colors.muted, marginTop: spacing.xs }}>
        Posição no pátio: {moto.yardSlot}
      </Text>
    </View>
  );
}
