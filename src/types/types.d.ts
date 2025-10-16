export interface SettingsFormType {
  nombreEmpresa: string;
  eslogan: string;
  mensaje: string | null;
}

export interface ServerStatus {
  success: boolean | undefined;
  message: string;
}
