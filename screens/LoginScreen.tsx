import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import FormField from '../components/FormField';
import MainButton from '../components/MainButton';
import { useTheme, useSession } from '../theme';
import { styles } from '../styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { api } from '../api';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { colors, spacing, typography } = useTheme();
  const { setLoggedIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (!email) next.email = 'Informe seu e-mail';
    if (!password) next.password = 'Informe sua senha';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      // Ajuste as rotas conforme sua API Java
      // Exemplo de payload: { email, password }
      const res = await api.post('/auth/login', { email, password });
      // Exemplo: res.data = { token, user }
      if (res?.data?.token) {
        // Armazene o token conforme estratégia (AsyncStorage, etc.)
        setLoggedIn(true);
      } else {
        Alert.alert('Falha no login', 'Credenciais inválidas.');
      }
    } catch (e: any) {
      Alert.alert('Erro', e?.response?.data?.message || 'Não foi possível entrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={{ flex: 1, paddingHorizontal: spacing.lg, justifyContent: 'center' }}>
        <Text style={{ color: colors.text, fontSize: 28, fontWeight: '800', marginBottom: spacing.sm }}>
          Mottu Bracelet
        </Text>
        <Text style={{ color: colors.muted, marginBottom: spacing.xl }}>
          Entre para gerenciar as motos do pátio.
        </Text>

        <FormField
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="seu@email.com"
          error={errors.email}
        />
        <FormField
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="••••••••"
          error={errors.password}
          onSubmitEditing={onSubmit}
          returnKeyType="go"
        />

        <MainButton label={loading ? 'Entrando...' : 'Entrar'} onPress={onSubmit} />
        {loading ? (
          <View style={{ marginTop: spacing.md }}>
            <ActivityIndicator color={colors.text} />
          </View>
        ) : null}

        <View style={{ flexDirection: 'row', marginTop: spacing.lg }}>
          <Text style={{ color: colors.muted, fontSize: typography.body }}>Não possui conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: colors.primary, fontWeight: '700' }}>Registre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}