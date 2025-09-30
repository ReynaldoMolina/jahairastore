import { ActionType, FormNounType } from '@/types/types';

export function getFormLabels(
  action: ActionType,
  noun: FormNounType,
  formName: string
) {
  const isNew = action === 'create';

  const cardTitle = `${
    isNew ? (noun === 'f' ? 'Nueva' : 'Nuevo') : 'Editar'
  } ${formName}`;

  const cardDescription = `${isNew ? 'Ingresa' : 'Edita'} la información ${
    noun === 'f' ? 'de la' : 'del'
  } ${formName}, haz click en ${
    isNew ? 'crear' : 'guardar'
  } cuando estés listo.`;

  return { cardTitle, cardDescription };
}
