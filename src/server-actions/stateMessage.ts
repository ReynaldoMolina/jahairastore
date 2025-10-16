import { ServerStatus } from '@/types/types';

export const stateDefault: ServerStatus = {
  success: undefined,
  message: '',
};

export const stateCreateSuccess: ServerStatus = {
  success: true,
  message: 'Se creó el registro.',
};

export const stateCreateError: ServerStatus = {
  success: false,
  message: 'Error al crear el registro.',
};

export const stateUpdateSuccess: ServerStatus = {
  success: true,
  message: 'Cambios guardados.',
};

export const stateUpdateError: ServerStatus = {
  success: false,
  message: 'Error al guardar los cambios.',
};
