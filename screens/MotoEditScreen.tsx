import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Alert, Pressable, ActivityIndicator } from 'react-native';
import FormField from '../components/FormField';
import MainButton from '../components/MainButton';
import { useTheme } from '../theme';
import { styles } from '../styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/navigation.types';
import { Moto, StatusMoto } from '../types';
import { MotoAPI } from '../api';

type Props = NativeStackScreenProps<AppStackParamList, 'EditMoto'>;

const STATUS_OPTIONS: StatusMoto[] = ['EM_MANUTENCAO', 'AGUARDANDO_PECA', 'PRONTA'];

export default function MotoEditScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const { colors, spacing, radii, typography } = useTheme();

  const [initial, setInitial] = useState<Moto | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [plate, setPlate] = useState('');
  const [model, setModel] = useState('');
  const [yardSlot, setYardSlot] = useState('');
  const [status, setStatus] = useState<StatusMoto>('EM_MANUTENCAO');
  const [errors, setErrors] = useState<{ plate?: string; model?: string; yardSlot?: string }>({});

  const load = async () => {
    try {
      setLoading(true);
      const res = await MotoAPI.getById(id);
      const m: Moto = res.data;
      setInitial(m);
      setPlate(m.plate);
      setModel(m.model);
      setYardSlot(m.yardSlot);
      setStatus(m.status);
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

  const validate = () => {
    const next: typeof errors = {};
    if (!plate) next.plate = 'Informe a placa';
    if (!model) next.model = 'Informe o modelo';
    if (!yardSlot) next.yardSlot = 'Informe o slot/posição no pátio';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    try {
      setSaving(true);
      await MotoAPI.update(id, {
        plate: plate.trim().toUpperCase(),
        model: model.trim(),
        status,
        yardSlot: yardSlot.trim().toUpperCase(),
      });
      Alert.alert('Salvo', 'Dados atualizados com sucesso!', [
        { text: 'OK', onPress: () => navigation.replace('MotoDetail', { id }) },
      ]);
    } catch (e: any) {
      Alert.alert('Erro', e?.response?.data?.message || 'Não foi possível salvar.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !initial) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator color={colors.text} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={{ flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xl }}>
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: '800', marginBottom: spacing.lg }}>
          Editar Moto
        </Text>

        <FormField
          label="Placa"
          value={plate}
          onChangeText={(t) => setPlate(t.toUpperCase())}
          autoCapitalize="characters"
          placeholder="ABC1D23"
          maxLength={7}
          error={errors.plate}
        />

        <FormField
          label="Modelo"
          value={model}
          onChangeText={setModel}
          placeholder="Honda CG 160"
          error={errors.model}
        />

        <FormField
          label="Posição no pátio (Slot)"
          value={yardSlot}
          onChangeText={(t) => setYardSlot(t.toUpperCase())}
          placeholder="A-12"
          error={errors.yardSlot}
        />

        <Text style={{ color: colors.muted, marginTop: spacing.md, marginBottom: spacing.sm }}>
          Status
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
          {STATUS_OPTIONS.map((opt) => {
            const active = status === opt;
            return (
              <Pressable
                key={opt}
                onPress={() => setStatus(opt)}
                style={{
                  paddingVertical: spacing.sm,
                  paddingHorizontal: spacing.md,
                  borderRadius: radii.pill,
                  borderWidth: 1,
                  borderColor: active ? colors.primary : colors.border,
                  backgroundColor: active ? colors.primary : 'transparent',
                }}
              >
                <Text
                  style={{
                    color: active ? (/** onPrimary */ '#0B0F14') : colors.text,
                    fontSize: typography.body,
                    fontWeight: '600',
                  }}
                >
                  {opt === 'EM_MANUTENCAO'
                    ? 'Em manutenção'
                    : opt === 'AGUARDANDO_PECA'
                    ? 'Aguardando peça'
                    : 'Pronta'}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{ marginTop: spacing.xl }}>
          <MainButton label={saving ? 'Salvando...' : 'Salvar alterações'} onPress={onSubmit} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
