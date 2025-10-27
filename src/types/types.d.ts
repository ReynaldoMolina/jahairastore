export interface SettingsFormType {
  nombreEmpresa: string;
  eslogan: string;
  mensaje: string | null;
  porHacer: string | null;
}

export interface ServerStatus {
  success: boolean | undefined;
  title: string;
  description?: string;
  returningId?: string | number;
}

export interface SearchParamsProps {
  query?: string;
  orderBy?: string;
  limit?: string;
  state?: string;
  direction?: SortOrder;
}

export interface LoginFormType {
  username: string;
  password: string;
}
