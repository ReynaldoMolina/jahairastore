export function formatNumber(value: number, locale = 'es-NI') {
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(Number(value));
}
