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
import { useTheme, useSession } from "../theme";
import { styles } from "../styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation"; // Splash, Auth, App
import type { AuthStackParamList } from "../navigation/AuthNavigator";
import { AuthAPI } from "../api";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const { colors, spacing, typography } = useTheme();
  const { setLoggedIn } = useSession();

  // Navegação de nível ROOT para poder trocar a pilha inteira para "App"
  const rootNav =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (!email) next.email = "Informe seu e-mail";
    if (!password) next.password = "Informe sua senha";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      const res = await AuthAPI.login({ email: email.trim(), password });
      if (res?.data?.token) {
        // Armazene o token (ex.: AsyncStorage) — por ora, memória global simples:
        (global as any).__TOKEN__ = res.data.token;

        // Atualiza estado de sessão e troca a pilha para o App
        setLoggedIn(true);
        rootNav.replace("App");
      } else {
        Alert.alert("Falha no login", "Credenciais inválidas.");
      }
    } catch (e: any) {
      Alert.alert("Erro", e?.response?.data?.message || "Não foi possível entrar.");
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
          flex: 0.8,
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

        <MainButton label={loading ? "Entrando..." : "Entrar"} onPress={onSubmit} />
        {loading ? (
          <View style={{ marginTop: spacing.md }}>
            <ActivityIndicator color={colors.text} />
          </View>
        ) : null}

        <View style={{ flexDirection: "row", marginTop: spacing.lg }}>
          <Text style={{ color: colors.muted, fontSize: typography.body }}>
            Não possui conta?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: colors.primary, fontWeight: "700" }}>
              Registre-se
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
