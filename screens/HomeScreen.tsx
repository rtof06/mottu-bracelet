import { View, Text, Image } from 'react-native';
import MainButton from '../components/MainButton';
import { useTheme } from '../theme';
import { styles } from '../styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/navigation.types';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ alignItems: 'center', paddingTop: spacing.xl, paddingBottom: spacing.lg }}>
        <Image
          source={require('../assets/icon.png')}
          style={{ width: 96, height: 96, marginBottom: spacing.md }}
          resizeMode="contain"
        />
        <Text style={{ color: colors.text, fontSize: 26, fontWeight: '800' }}>Mottu Bracelet</Text>
        <Text style={{ color: colors.muted, marginTop: spacing.xs, fontSize: typography.body }}>
          Localize e gerencie as motos do pátio
        </Text>
      </View>

      <View style={{ paddingHorizontal: spacing.lg, gap: spacing.md }}>
        <MainButton
          label="Minhas Motos"
          onPress={() => navigation.navigate('MotoList')}
          accessibilityLabel="Ir para a lista de motos"
        />
        <MainButton
          label="Tirar Foto"
          onPress={() => navigation.navigate('Camera')}
          accessibilityLabel="Abrir câmera para tirar foto"
        />
        {/* Descomente assim que as telas existirem */}
        {/* <PrimaryButton label="Cadastrar Moto" onPress={() => navigation.navigate('MotorcycleCreate')} />
        <PrimaryButton label="Perfil" onPress={() => navigation.navigate('Profile')} /> */}
      </View>
    </View>
  );
}