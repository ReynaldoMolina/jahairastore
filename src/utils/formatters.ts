export function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDate(isoDateStr: string, locale = 'es-NI') {
  const [year, month, day] = isoDateStr.split('-').map(Number);
  const input = new Date(year, month - 1, day);

  const dayStr = input.getDate();
  let monthStr = input.toLocaleString(locale, { month: 'long' });
  const yearStr = input.getFullYear();

  const currentYear = new Date().getFullYear();

  if (currentYear === yearStr) {
    return `${dayStr} ${monthStr}`;
  } else {
    monthStr = monthStr.substring(0, 3);
    return `${dayStr} ${monthStr} ${yearStr}`;
  }
}