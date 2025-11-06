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
    return `${dayStr} ${monthStr} ${yearStr}`;
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
