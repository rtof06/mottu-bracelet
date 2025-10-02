import React, { useEffect } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import { useTheme, useSession } from '../theme';
import { styles } from '../styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const { colors, spacing, typography } = useTheme();
  const { isLoggedIn } = useSession();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        navigation.replace('App');
      } else {
        navigation.replace('Auth');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isLoggedIn, navigation]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      <Image
        source={require('../assets/icon.png')}
        style={{ width: 120, height: 120, marginBottom: spacing.lg }}
        resizeMode="contain"
      />
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: '800' }}>Mottu Bracelet</Text>
      <View style={{ marginTop: spacing.lg }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </View>
  );
}
