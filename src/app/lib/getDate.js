export function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDate(isoDateStr, locale = 'es-NI') {
  const [year, month, day] = isoDateStr.split('-').map(Number);
  const input = new Date(year, month - 1, day);
  const dayStr = input.getDate();
  const monthStr = input.toLocaleString(locale, { month: 'long' });
  const yearStr = input.getFullYear();

  return `${dayStr} ${monthStr} ${yearStr}`;
}
