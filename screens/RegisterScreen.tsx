import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import FormField from "../components/FormField";
import MainButton from "../components/MainButton";
import { useTheme } from "../theme";
import { styles } from "../styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthNavigator";
import { api } from "../api";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const { colors, spacing, typography } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (!name) next.name = "Informe seu nome";
    if (!email) next.email = "Informe seu e-mail";
    if (!password || password.length < 6)
      next.password = "Senha deve possuir ao menos 6 caracteres";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      // Ajuste as rotas conforme sua API Java
      const res = await api.post("/auth/register", { name, email, password });
      if (res.status >= 200 && res.status < 300) {
        Alert.alert("Sucesso", "Conta criada! Faça login para continuar.", [
          {
            text: "Ir para Login",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      } else {
        Alert.alert(
          "Falha no cadastro",
          "Verifique os dados e tente novamente."
        );
      }
    } catch (e: any) {
      Alert.alert(
        "Erro",
        e?.response?.data?.message || "Não foi possível cadastrar."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View
        style={{
          flex: 0.9,
          paddingHorizontal: spacing.lg,
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/icon.png")}
          style={{
            width: 132,
            height: 132,
            alignSelf: "center",
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            color: colors.text,
            fontSize: 28,
            fontWeight: "800",
            marginBottom: spacing.sm,
            alignSelf: "center",
          }}
        >
          Mottu Bracelet
        </Text>
        <Text
          style={{
            color: colors.muted,
            marginBottom: spacing.xl,
            alignSelf: "center",
          }}
        >
          Entre para gerenciar as motos do pátio.
        </Text>
        <Text
          style={{
            color: colors.text,
            fontSize: 24,
            fontWeight: "800",
            marginBottom: spacing.sm,
          }}
        >
          Criar conta
        </Text>
        <Text style={{ color: colors.muted, marginBottom: spacing.xl }}>
          Registre-se para gerenciar o pátio.
        </Text>

        <FormField
          label="Nome"
          value={name}
          onChangeText={setName}
          placeholder="Seu nome"
          error={errors.name}
        />
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

        <MainButton
          label={loading ? "Criando..." : "Criar conta"}
          onPress={onSubmit}
        />
        {loading ? (
          <View style={{ marginTop: spacing.md }}>
            <ActivityIndicator color={colors.text} />
          </View>
        ) : null}

        <View style={{ flexDirection: "row", marginTop: spacing.lg }}>
          <Text style={{ color: colors.muted, fontSize: typography.body }}>
            Já possui conta?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: colors.primary, fontWeight: "700" }}>
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
