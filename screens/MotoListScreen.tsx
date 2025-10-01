import { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import Header from '../components/Header';
import MotoCard from '../components/MotoCard';
import MainButton from '../components/MainButton';
import { useTheme } from '../theme';
import { styles } from '../styles';
import { Moto } from '../types';
// import { api } from '../api'; // habilitar quando integrar com a API

const MOCK: Moto[] = [
  { id: '1', plate: 'ABC-1D23', model: 'Honda CG 160', status: 'EM_MANUTENCAO', yardSlot: 'A-12' },
  { id: '2', plate: 'EFG-4H56', model: 'Yamaha Fazer 250', status: 'AGUARDANDO_PECA', yardSlot: 'B-07' },
  { id: '3', plate: 'JKL-7M89', model: 'Honda Biz 125', status: 'PRONTA', yardSlot: 'C-03' },
];

export default function MotoListScreen({ navigation }: any) {
  const { colors, spacing } = useTheme();
  const [data, setData] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      // const res = await api.get<Motorcycle[]>('/motorcycles');
      // setData(res.data);
      await new Promise(r => setTimeout(r, 500));
      setData(MOCK);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Minhas Motos no Pátio"
        subtitle="Localize e gerencie facilmente"
        onAction={() => navigation.navigate('Camera')}
        actionLabel="Tirar foto"
      />

      <FlatList
        style={{ paddingHorizontal: spacing.md }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MotoCard moto={item} />}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchData} tintColor={colors.text} />
        }
        contentContainerStyle={{ paddingVertical: spacing.md }}
      />

      <View style={{ padding: spacing.md }}>
        <MainButton
          label="Cadastrar moto"
          onPress={() => {}}
          accessibilityLabel="Cadastrar nova moto"
        />
      </View>
    </View>
  );
}
