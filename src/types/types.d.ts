export interface SettingsFormType {
  nombreEmpresa: string;
  eslogan: string;
  mensaje: string | null;
  porHacer: string | null;
}

export interface ServerStatus {
  success: boolean | undefined;
  message: string;
}

export interface SearchParamsProps {
  query?: string;
  orderBy?: string;
  direction?: SortOrder;
}
