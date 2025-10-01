export type StatusMoto = 'EM_MANUTENCAO' | 'AGUARDANDO_PECA' | 'PRONTA';

export type Moto = {
  id: string;
  plate: string;
  model: string;
  status: StatusMoto;
  yardSlot: string; // posição/slot físico no pátio
};
