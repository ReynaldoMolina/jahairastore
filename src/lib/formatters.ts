export function formatNumber(value: number, digits = 2) {
  const formatter = new Intl.NumberFormat('es-NI', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

  return formatter.format(Number(value));
}

export function roundToPointZeroOrFive(value: number): number {
  const integerPart = Math.floor(value);
  const decimalPart = value - integerPart;

  if (decimalPart < 0.5) {
    return integerPart;
  }

  if (decimalPart === 0.5) {
    return integerPart + 0.5;
  }

  return integerPart + 1;
}

export function roundToTwoDecimals(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function formatDate(isoDateStr: string) {
  const [year, month, day] = isoDateStr.split('-').map(Number);
  const input = new Date(year, month - 1, day);

  const dayStr = input.getDate();
  let monthStr = input.toLocaleString('es-NI', { month: 'long' });
  const yearStr = input.getFullYear();

  const currentYear = new Date().getFullYear();

  if (currentYear === yearStr) {
    return `${dayStr} ${monthStr}`;
  } else {
    monthStr = monthStr.substring(0, 3);
    return `${dayStr}/${monthStr}/${yearStr}`;
  }
}

export function formatDateShort(isoDateStr: string) {
  const [year, month, day] = isoDateStr.split('-').map(Number);
  const input = new Date(year, month - 1, day);

  const dayStr = input.getDate();
  let monthStr = input.toLocaleString('es-NI', { month: 'short' });
  const yearStr = input.getFullYear();

  monthStr = monthStr.substring(0, 3);
  return `${dayStr}/${monthStr}/${yearStr}`;
}

export function dateIsoToDate(date: string) {
  return date ? new Date(`${date}T00:00:00`) : undefined;
}

export function dateToIso(date?: Date) {
  return date ? date.toISOString().split('T')[0] : undefined;
}
