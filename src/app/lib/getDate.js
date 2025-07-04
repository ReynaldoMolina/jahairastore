export default function getDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDate(isoDateStr, locale = undefined) {
  // Force midnight so comparisons are date‑only, not time‑of‑day.
  const input = new Date(`${isoDateStr}T00:00:00`);
  const today = new Date();

  // Strip time parts → YYYY‑MM‑DD only.
  const inputMidnight = new Date(
    input.getFullYear(),
    input.getMonth(),
    input.getDate()
  );
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const msPerDay = 86_400_000;
  const diffDays = Math.round((todayMidnight - inputMidnight) / msPerDay);

  if (diffDays === 0) return 'Hoy';
  if (diffDays === 1) return 'Ayer';

  // dd/mm/yyyy in the chosen locale (defaults to system locale).
  return inputMidnight.toLocaleDateString(locale ?? 'es-NI', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
