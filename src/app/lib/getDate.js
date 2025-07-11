export default function getDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// export function formatDate(isoDateStr, locale = 'es-NI') {
//   const input = new Date(isoDateStr);
//   const today = new Date();

//   // Strip time parts → YYYY‑MM‑DD only.
//   const inputMidnight = new Date(
//     input.getFullYear(),
//     input.getMonth(),
//     input.getDate()
//   );
//   const todayMidnight = new Date(
//     today.getFullYear(),
//     today.getMonth(),
//     today.getDate()
//   );

//   const msPerDay = 86_400_000;
//   const diffDays = Math.round((todayMidnight - inputMidnight) / msPerDay);

//   if (diffDays === 0) return 'Hoy';
//   if (diffDays === 1) return 'Ayer';

//   return inputMidnight.toLocaleDateString(locale ?? 'es-NI', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//   });
// }

export function formatDate(isoDateStr, locale = 'es-NI') {
  const [year, month, day] = isoDateStr.split('-').map(Number);
  const input = new Date(year, month - 1, day); // mes va de 0 a 11
  const now = new Date();

  const sameDay =
    input.getDate() === now.getDate() &&
    input.getMonth() === now.getMonth() &&
    input.getFullYear() === now.getFullYear();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    input.getDate() === yesterday.getDate() &&
    input.getMonth() === yesterday.getMonth() &&
    input.getFullYear() === yesterday.getFullYear();

  if (sameDay) return 'Hoy';
  if (isYesterday) return 'Ayer';

  const dayStr = input.getDate();
  const monthStr = input.toLocaleString(locale, { month: 'long' });
  const yearStr = input.getFullYear();

  return `${dayStr} ${monthStr} ${yearStr}`;
}
