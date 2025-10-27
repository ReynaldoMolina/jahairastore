import { ServerStatus } from '@/types/types';

export const stateDefault: ServerStatus = {
  success: undefined,
  title: '',
};

export const stateCreateSuccess: ServerStatus = {
  success: true,
  title: 'Se creó el registro.',
};

export const stateCreateError: ServerStatus = {
  success: false,
  title: 'Error al crear el registro.',
};

export const stateUpdateSuccess: ServerStatus = {
  success: true,
  title: 'Cambios guardados.',
};

export const stateUpdateError: ServerStatus = {
  success: false,
  title: 'Error al guardar los cambios.',
};
