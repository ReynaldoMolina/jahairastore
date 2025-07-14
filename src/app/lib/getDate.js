export function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateInput(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getCurrentMonth() {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const firstDay = formatDateInput(firstDayOfMonth);
  const lastDay = formatDateInput(lastDayOfMonth);

  return { firstDay, lastDay };
}

export function formatDate(isoDateStr, locale = 'es-NI') {
  const [year, month, day] = isoDateStr.split('-').map(Number);
  const input = new Date(year, month - 1, day);

  const dayStr = input.getDate();
  const monthStr = input
    .toLocaleString(locale, { month: 'long' })
    .substring(0, 3);
  const yearStr = input.getFullYear();

  return `${dayStr} ${monthStr} ${yearStr}`;
}
