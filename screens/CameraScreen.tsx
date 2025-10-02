import React, { useRef, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useTheme } from '../theme';
import { styles } from '../styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/navigation.types';
import { CameraView, useCameraPermissions } from 'expo-camera';

type Props = NativeStackScreenProps<AppStackParamList, 'Camera'>;

export default function CameraScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isShooting, setIsShooting] = useState(false);

  const ensurePermission = useCallback(async () => {
    if (!permission || !permission.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert('Permissão necessária', 'Conceda acesso à câmera para tirar fotos.');
        return false;
      }
    }
    return true;
  }, [permission, requestPermission]);

  const onToggleFacing = () => setFacing((p) => (p === 'back' ? 'front' : 'back'));

  const onTakePhoto = async () => {
    const ok = await ensurePermission();
    if (!ok) return;
    if (!cameraRef.current) return;
    try {
      setIsShooting(true);
      // @ts-ignore - takePictureAsync existe no ref interno do CameraView
      const pic = await cameraRef.current.takePictureAsync?.({ quality: 0.7, skipProcessing: true });
      if (pic?.uri) setPhotoUri(pic.uri);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível capturar a foto.');
    } finally {
      setIsShooting(false);
    }
  };

  const onRetake = () => setPhotoUri(null);

  const goToList = () => navigation.navigate('MotoList');

  // Estado: sem permissão ainda solicitada
  if (!permission) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text, marginBottom: 12 }}>Verificando permissões da câmera…</Text>
      </View>
    );
  }

  // Estado: permissão negada
  if (!permission.granted && permission.canAskAgain === false) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background, padding: 24 }]}>
        <Text style={{ color: colors.text, textAlign: 'center', marginBottom: 16 }}>
          O acesso à câmera foi negado. Vá às configurações do sistema para permitir o uso da câmera.
        </Text>
        <Primary inline label="Exibir motos" onPress={goToList} />
      </View>
    );
  }

  // Pré-visualização após foto tirada
  if (photoUri) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Image source={{ uri: photoUri }} style={{ flex: 1 }} resizeMode="cover" />
        <View style={{ position: 'absolute', bottom: 24, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Primary label="Refazer" onPress={onRetake} />
          <Primary label="Exibir motos" onPress={goToList} />
        </View>
      </View>
    );
  }

  // Visualização da câmera
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing={facing}
        enableTorch={false}
        // barcodeScannerSettings opcional; mantido mínimo
      />

      {/* Controles sobrepostos */}
      <View style={{ position: 'absolute', bottom: 24, left: 0, right: 0, alignItems: 'center', gap: 12 }}>
        <Primary label={isShooting ? 'Capturando…' : 'Tirar foto'} onPress={onTakePhoto} />
        <Row>
          <Secondary label={facing === 'back' ? 'Frontal' : 'Traseira'} onPress={onToggleFacing} />
          <Secondary label="Exibir motos" onPress={goToList} />
        </Row>
      </View>
    </View>
  );
}

/** Botões simples, seguindo o tema */
import { Pressable } from 'react-native';
import { useTheme as useAppTheme } from '../theme';

function Primary({ label, onPress, inline = false }: { label: string; onPress: () => void; inline?: boolean }) {
  const { colors } = useAppTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? '#16A34A' : '#22C55E',
        paddingVertical: 12,
        paddingHorizontal: inline ? 16 : 24,
        borderRadius: 999,
        minWidth: inline ? undefined : 200,
        alignItems: 'center',
      })}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={{ color: '#0B0F14', fontWeight: '800' }}>{label}</Text>
    </Pressable>
  );
}

function Secondary({ label, onPress }: { label: string; onPress: () => void }) {
  const { colors } = useAppTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        borderColor: colors.border,
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 999,
        backgroundColor: 'rgba(0,0,0,0.25)',
      }}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>{label}</Text>
    </Pressable>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <View style={{ flexDirection: 'row', gap: 12 }}>{children}</View>;
}
