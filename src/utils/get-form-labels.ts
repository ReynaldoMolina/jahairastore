import { ActionType, FormNounType } from '@/types/types';

export function getFormLabels(action: ActionType, noun: FormNounType) {
  const cardTitle =
    action === 'create' ? (noun === 'f' ? 'Nueva' : 'Nuevo') : 'Editar';
  const cardAction = action === 'create' ? 'Ingresa' : 'Edita';
  const cardButton = action === 'create' ? 'crear' : 'guardar';

  return { cardTitle, cardAction, cardButton };
}
