import { View, Text } from 'react-native';
import { styles } from '../styles';
import { useTheme } from '../theme';

export function CameraScreenPlaceholder() {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>Tela de câmera (placeholder)</Text>
    </View>
  );
}