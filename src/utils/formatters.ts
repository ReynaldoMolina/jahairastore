import { format, getYear, parse } from 'date-fns';
import { es } from 'date-fns/locale';

export function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDate(date: string | null | undefined) {
  if (!date || date === null) return 'Sin fecha';

  const parsed = parse(date, 'yyyy-MM-dd', new Date());
  const currentYear = new Date().getFullYear();
  const dateYear = getYear(parsed);
  const formatString = dateYear === currentYear ? 'dd/MMM' : 'dd/MMM/yyyy';

  return format(parsed, formatString, { locale: es });
}

export function formatNumber(value: number, locale = 'es-NI') {
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
}
