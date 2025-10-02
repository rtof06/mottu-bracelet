import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import MainButton from '../components/MainButton';
import { useTheme } from '../theme';
import { styles } from '../styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/navigation.types';
import { Moto } from '../types';
import { MotoAPI } from '../api';

type Props = NativeStackScreenProps<AppStackParamList, 'MotoDetail'>;

export default function MotoDetailScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const { colors, spacing, typography } = useTheme();
  const [data, setData] = useState<Moto | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await MotoAPI.getById(id);
      setData(res.data);
    } catch (e: any) {
      Alert.alert('Erro', e?.response?.data?.message || 'Não foi possível carregar a moto.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const onDelete = async () => {
    Alert.alert('Excluir', 'Deseja realmente excluir esta moto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await MotoAPI.remove(id);
            Alert.alert('Excluída', 'A moto foi removida.');
            navigation.replace('MotoList');
          } catch (e: any) {
            Alert.alert('Erro', e?.response?.data?.message || 'Não foi possível excluir.');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator color={colors.text} />
      </View>
    );
  }

  if (!data) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      <Text style={{ color: colors.muted, fontSize: typography.body, marginBottom: spacing.xs }}>Placa</Text>
      <Text style={{ color: colors.text, fontSize: 24, fontWeight: '800' }}>{data.plate}</Text>

      <View style={{ height: spacing.lg }} />

      <Text style={{ color: colors.muted, fontSize: typography.body, marginBottom: spacing.xs }}>Modelo</Text>
      <Text style={{ color: colors.text, fontSize: 18 }}>{data.model}</Text>

      <View style={{ height: spacing.md }} />

      <Text style={{ color: colors.muted, fontSize: typography.body, marginBottom: spacing.xs }}>Status</Text>
      <Text style={{ color: colors.text }}>{data.status === 'EM_MANUTENCAO' ? 'Em manutenção' : data.status === 'AGUARDANDO_PECA' ? 'Aguardando peça' : 'Pronta'}</Text>

      <View style={{ height: spacing.md }} />

      <Text style={{ color: colors.muted, fontSize: typography.body, marginBottom: spacing.xs }}>Posição no pátio</Text>
      <Text style={{ color: colors.text }}>{data.yardSlot}</Text>

      <View style={{ height: spacing.xl }} />

      <MainButton label="Editar" onPress={() => navigation.navigate('EditMoto', { id })} />
      <View style={{ height: spacing.md }} />
      <MainButton label="Excluir" onPress={onDelete} accessibilityLabel="Excluir moto" />
    </View>
  );
}